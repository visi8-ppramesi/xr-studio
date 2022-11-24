import { mount } from "@vue/test-utils";
import Cart from "../../../src/views/shopping/Cart.vue";

test("Cart", async () => {
  const wrapper = mount(Cart, {});

  expect(wrapper.find("#cart-title").text()).toBe("Shopping Cart");
  expect(wrapper.find("#cart-count").text()).toBe("Schedule a shoot");
  expect(wrapper.find("#cart-title-1").text()).toBe("Product Details");
  expect(wrapper.find("#cart-title-2").text()).toBe("Quantity");
  expect(wrapper.find("#cart-title-3").text()).toBe("Price");
  expect(wrapper.find("#cart-title-4").text()).toBe("Total");
  expect(wrapper.find("#cart-continue").text()).toBe("Total");
});
