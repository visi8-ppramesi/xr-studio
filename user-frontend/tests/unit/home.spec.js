import { mount, flushPromises } from "@vue/test-utils";
import Home from "../../src/views/Home.vue";

test("front-page", async () => {
  const wrapper = mount(Home, {});

  expect(wrapper.find("#front-page-title").text()).toBe("The best solution for your productions");
  expect(wrapper.find("#front-page-description").text()).toBe(`Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora at cupiditate quis eum maiores libero veritatis? Dicta facilis sint aliquid ipsum atque?`);

  // const promises = [
  //   wrapper.find('input[name="username"]').setValue('testestest'),
  //   wrapper.find('input[name="fullName"]').setValue('email@email.com'),
  //   wrapper.find('input[name="email"]').setValue('full name'),
  //   wrapper.find('input[name="password"]').setValue('password')
  // ]

  // await Promise.all(promises)

  // await wrapper.find('#register-button').trigger('click')

  // await flushPromises()
  // await flushPromises()
  // await flushPromises()
  // await flushPromises()

  // expect(wrapper.find('input[name="username"]')).getValue('Forgot Password?'),
  // expect(wrapper.find('input[name="fullName"]')).getValue('Forgot Password?'),
  // expect(wrapper.find('input[name="email"]')).getValue('Forgot Password?'),
  // expect(wrapper.find('input[name="password"]')).getValue('Forgot Password?')

  expect(wrapper.find("#register-option").text()).toBe("or sign up with:");
});

test("featured-component", async () => {
  const wrapper = mount(Home, {});

  expect(wrapper.find("#featured-title").text()).toBe("Why is it so great?");
  expect(wrapper.find("#featured-benefit-1").text()).toBe("Support 24/7");
  expect(wrapper.find("#featured-description-1").text()).toBe("Laudantium totam quas cumque pariatur at doloremque hic quos quia eius. Reiciendis optio minus mollitia rerum labore facilis inventore voluptatem ad, quae quia sint. Ullam.");
  expect(wrapper.find("#featured-benefit-2").text()).toBe("Safe and solid");
  expect(wrapper.find("#featured-description-2").text()).toBe("Eum nostrum fugit numquam, voluptates veniam neque quibusdam ullam aspernatur odio soluta, quisquam dolore animi mollitia a omnis praesentium, expedita nobis!");
  expect(wrapper.find("#featured-benefit-3").text()).toBe("Extremely fast");
  expect(wrapper.find("#featured-description-3").text()).toBe("Enim cupiditate, minus nulla dolor cumque iure eveniet facere ullam beatae hic voluptatibus dolores exercitationem? Facilis debitis aspernatur amet nisi?");
});

test("pricing-component", async () => {
  const wrapper = mount(Home, {});

  expect(wrapper.find("#pricing-title").text()).toBe("One-time payment");
  expect(wrapper.find("#pricing-description").text()).toBe("Lorem ipsum dolor sit amet, consectetur adipisicing elit. A soluta corporis voluptate ab error quam dolores doloremque, quae consectetur.");
  expect(wrapper.find("#pricing-benefit-1").text()).toBe("Support 24/7");
  expect(wrapper.find("#pricing-benefit-2").text()).toBe("Analytics");
  expect(wrapper.find("#pricing-benefit-3").text()).toBe("Components");
  expect(wrapper.find("#pricing-benefit-4").text()).toBe("Updates");
  expect(wrapper.find("#pricing-benefit-5").text()).toBe("Reports");
  expect(wrapper.find("#pricing-benefit-6").text()).toBe("Mobile");
  expect(wrapper.find("#pricing-button").text()).toBe("Buy now");
});

test("content-horizontal", async () => {
  const wrapper = mount(Home, {});

  expect(wrapper.find("#content-horizontal-title").text()).toBe("Latest Scenes");
  expect(wrapper.find("#trip-title-1").text()).toBe("My paradise");
  expect(wrapper.find("#trip-date-1").text()).toBe("Published 13.01.2022 by Anna Maria Doe");
  expect(wrapper.find("#trip-description-1").text()).toBe("Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam.");
  expect(wrapper.find("#trip-read-1").text()).toBe("Read more");
  expect(wrapper.find("#trip-title-2").text()).toBe("Travel to Italy");
  expect(wrapper.find("#trip-date-2").text()).toBe("Published 12.01.2022 by Halley Frank");
  expect(wrapper.find("#trip-description-2").text()).toBe("Suspendisse in volutpat massa. Nulla facilisi. Sed aliquet diam orci, nec ornare metus semper sed. Integer volutpat ornare erat sit amet rutrum.");
  expect(wrapper.find("#trip-read-2").text()).toBe("Read more");
  expect(wrapper.find("#trip-title-3").text()).toBe("Chasing the sun");
  expect(wrapper.find("#trip-date-3").text()).toBe("Published 10.01.2022 by Joe Svan");
  expect(wrapper.find("#trip-description-3").text()).toBe("Curabitur tristique, mi a mollis sagittis, metus felis mattis arcu, non vehicula nisl dui quis diam. Mauris ut risus eget massa volutpat feugiat. Donec.");
  expect(wrapper.find("#trip-read-3").text()).toBe("Read more");
  expect(wrapper.find("#trip-scenes").text()).toBe("See All Scenes");
});

test("content-vertical", async () => {
  const wrapper = mount(Home, {});

  expect(wrapper.find("#content-vertical-title").text()).toBe("Latest Scenes");
  expect(wrapper.find("#trip-title-1").text()).toBe("My paradise");
  expect(wrapper.find("#trip-subtitle-1").text()).toBe("Travels");
  expect(wrapper.find("#trip-date-1").text()).toBe("Published 13.01.2022 by Anna Maria Doe");
  expect(wrapper.find("#trip-description-1").text()).toBe("Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim elementum. Donec a ullamcorper diam.");
  expect(wrapper.find("#trip-read-1").text()).toBe("Read more");
  expect(wrapper.find("#trip-title-2").text()).toBe("Travel to Italy");
  expect(wrapper.find("#trip-subtitle-2").text()).toBe("Art");
  expect(wrapper.find("#trip-date-2").text()).toBe("Published 12.01.2022 by Halley Frank");
  expect(wrapper.find("#trip-description-2").text()).toBe("Suspendisse in volutpat massa. Nulla facilisi. Sed aliquet diam orci, nec ornare metus semper sed. Integer volutpat ornare erat sit amet rutrum.");
  expect(wrapper.find("#trip-read-2").text()).toBe("Read more");
  expect(wrapper.find("#trip-title-3").text()).toBe("Chasing the sun");
  expect(wrapper.find("#trip-subtitle-3").text()).toBe("Business");
  expect(wrapper.find("#trip-date-3").text()).toBe("Published 10.01.2022 by Joe Svan");
  expect(wrapper.find("#trip-description-3").text()).toBe("Curabitur tristique, mi a mollis sagittis, metus felis mattis arcu, non vehicula nisl dui quis diam. Mauris ut risus eget massa volutpat feugiat. Donec.");
  expect(wrapper.find("#trip-read-3").text()).toBe("Read more");
  expect(wrapper.find("#trip-scenes").text()).toBe("See All Scenes");
});