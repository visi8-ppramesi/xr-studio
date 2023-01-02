import { mount, flushPromises } from "@vue/test-utils";
import Register from "../../../src/views/auth/Register.vue";
import options from '../utils/pluginInitializer.js'

test("register", async () => {
  const wrapper = mount(Register, {
    global: {
        plugins: [...Object.values(options.plugins)],
        components: {...options.components}
    }
  });

  const promises = [
    wrapper.find('input[name="username"]').setValue('testestest'),
    wrapper.find('input[name="email"]').setValue('email@email.com'),
    wrapper.find('input[name="fullName"]').setValue('full name'),
    wrapper.find('input[name="password"]').setValue('password'),
    wrapper.find('input[name="confirm-password"]').setValue('confirm-password')
  ]

  await Promise.all(promises)

  await wrapper.find('#register-button').trigger('click')

  await flushPromises()
  await flushPromises()
  await flushPromises()
  await flushPromises()

  expect(wrapper.find('input[name="username"]').element.value).toBe('testestest'),
  expect(wrapper.find('input[name="fullName"]').element.value).toBe('full name'),
  expect(wrapper.find('input[name="email"]').element.value).toBe('email@email.com'),
  expect(wrapper.find('input[name="password"]').element.value).toBe('password'),
  expect(wrapper.find('input[name="confirm-password"]').element.value).toBe('confirm-password')
});
