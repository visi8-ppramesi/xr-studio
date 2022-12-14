import { defineStore } from "pinia";
import emitter from "../utils/emitter";
import Processor from "./utils/processCart";
import { ref } from "vue";
import isNil from "lodash/isNil";
import {
  DEFAULT_STATUS,
  ITEM_IN_CART,
  ITEM_NEW,
  ITEM_INVALID,
} from "./utils/cartStatus";

const items = JSON.parse(localStorage.getItem("cart") || "[]");
const res = [];

export const useCartStore = defineStore("cart", () => {
  const cart = ref(items);
  const submissionResult = ref(res);
  const count = items.reduce((acc, v) => {
    acc += v?.count ?? 0;
    return acc;
  }, 0);
  const itemCount = ref(count);

  let processor;

  function clearCart() {
    this.cart = [];
    localStorage.removeItem("cart");
    this.itemCount = 0;
    emitter.emit("cartUpdated", { cart: this.cart, count: this.itemCount });
  }

  function removeItem(id) {
    this.cart = this.cart.filter(function (obj) {
      return obj.id !== id;
    });
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.itemCount = this.cart.reduce((acc, v) => {
      acc += v.count;
      return acc;
    }, 0);
    emitter.emit("cartUpdated", { cart: this.cart, count: this.itemCount });
  }

  function decreaseItemQty(id) {
    const item = this.cart.find((v) => v.id === id);
    if (item.count === 1) {
      this.removeItem(id);
    } else {
      item.count -= 1;
      this.itemCount -= 1;
      emitter.emit("cartUpdated", { cart: this.cart, count: this.itemCount });
    }
  }

  function addItem(item) {
    //{ image_url, type, name, description, id, price }) {
    let itemStatus = DEFAULT_STATUS;
    if (!isNil(processor)) {
      const pipeline = processor.getProcessorPipeline();
      item = pipeline(item);
      const filter = processor.getProcessorFilter();
      itemStatus = filter(item);
    }

    const { image_url, type, name, description, id, price, extra_data } = item;
    if (itemStatus === ITEM_NEW || itemStatus === DEFAULT_STATUS) {
      this.cart.push({
        name,
        description,
        id,
        price,
        type,
        image_url,
        count: 1,
        created_date: new Date().getTime(),
        extra_data,
      });
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.itemCount = this.cart.reduce((acc, v) => {
        acc += v.count;
        return acc;
      }, 0);
      emitter.emit("cartUpdated", { cart: this.cart, count: this.itemCount });
    } else if (itemStatus === ITEM_IN_CART) {
      const tempItem = this.cart.find((v) => v.id === id);
      tempItem.count = tempItem.count + 1;
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.itemCount = this.cart.reduce((acc, v) => {
        acc += v.count;
        return acc;
      }, 0);
      emitter.emit("cartUpdated", { cart: this.cart, count: this.itemCount });
    } else if (itemStatus === ITEM_INVALID) {
      console.error("invalid item");
    }
  }

  function getShootings() {
    return this.cart.filter((v) => v.type == "studio");
  }
  function getEquipments() {
    return this.cart.filter((v) => v.type == "equipment");
  }
  function getAssets() {
    return this.cart.filter((v) => v.type == "asset");
  }

  function clearShootings() {
    this.cart
      .filter((v) => v.type == "studio")
      .map((v) => v.id)
      .map(this.removeItem);
  }

  const cartObj = {
    cart,
    submissionResult,
    itemCount,
    clearCart,
    removeItem,
    addItem,
    decreaseItemQty,
    getShootings,
    getEquipments,
    getAssets,
    clearShootings,
  };

  processor = new Processor(cartObj);

  return cartObj;
});
