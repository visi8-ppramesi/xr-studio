import { mount } from "@vue/test-utils";
import Cart from "../../../src/views/shopping/Cart.vue";
import options from '../utils/pluginInitializer.js'

test("Cart", async () => {
  const wrapper = mount(Cart, {
    global: {
        plugins: [...Object.values(options.plugins)],
        components: {...options.components}
    }
  });

  expect(wrapper.find("#cart-title").text()).toBe("Shopping Cart");
  expect(wrapper.find("#cart-count").text()).toBe("0 Items");
  expect(wrapper.find("#cart-title-1").text()).toBe("Product Details");
  expect(wrapper.find("#cart-title-2").text()).toBe("Quantity");
  expect(wrapper.find("#cart-title-3").text()).toBe("Price");
  expect(wrapper.find("#cart-title-4").text()).toBe("Total");
  expect(wrapper.find("#cart-continue").text()).toBe("Continue Shopping");
  expect(wrapper.find("#cart-summary").text()).toBe("Order Summary");
  expect(wrapper.find("#cart-count-items").text()).toBe("Items 0");
  expect(wrapper.find("#cart-total-cost").text()).toBe("Total cost");
  expect(wrapper.find("#cart-total-amount").text()).toBe("$Rp 0,00");
  expect(wrapper.find("#cart-checkout").text()).toBe("Checkout");
});
