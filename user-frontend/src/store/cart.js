import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  }),
  getters: {},
  actions: {
    clearCart() {
      this.cart = [];
      localStorage.removeItem("cart");
    },
    addItemToCart({ image_url, type, name, description, id, price }) {
      this.cart.push({
        name,
        description,
        id,
        price,
        type,
        image_url,
        created_date: new Date().getTime(),
      });
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
});
