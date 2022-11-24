import isNil from "lodash/isNil";
import isFunction from "lodash/isFunction";
import { ITEM_IN_CART, ITEM_NEW, ITEM_INVALID } from "./cartStatus";
import { vedhg } from "../../utils/dateRangeHash";

Array.prototype.exists = function (testFunc) {
  return !isNil(this.find(testFunc));
};

//eslint-disable-next-line no-unused-vars
function createPipeline(context) {
  return [
    function (item) {
      return item;
    },
  ];
}

function createFilters(context) {
  return {
    asset: function (item) {
      const localCart = !isNil(context.cart?.value)
        ? context.cart.value
        : context.cart;
      if (localCart.exists((v) => v.id === item.id)) {
        return ITEM_INVALID;
      }
      return ITEM_NEW;
    },
    equipment: function (item) {
      const localCart = !isNil(context.cart?.value)
        ? context.cart.value
        : context.cart;
      if (localCart.exists((v) => v.id === item.id)) {
        return ITEM_IN_CART;
      }
      return ITEM_NEW;
    },
    studio: function (item) {
      const localCart = !isNil(context.cart?.value)
        ? context.cart.value
        : context.cart;
      if (
        localCart.exists(
          (v) => v.type === "studio" && vedhg.hashesOverlap(v.id, item.id)
        )
      ) {
        return ITEM_INVALID;
      }
      return ITEM_NEW;
    },
  };
}

export default class {
  constructor(store) {
    this.store = store;
    this.filters = createFilters(store);
    this.pipeline = createPipeline(store);
  }

  getProcessorPipeline() {
    return function (item) {
      return this.pipeline.reduce((acc, func, idx) => {
        return func(acc, idx);
      }, item);
    }.bind(this);
  }

  getProcessorFilter() {
    return function (item) {
      if (isNil(this.filters[item.type])) return true;
      if (!isFunction(this.filters[item.type])) return this.filters[item.type];

      return this.filters[item.type](item);
    }.bind(this);
  }
}
