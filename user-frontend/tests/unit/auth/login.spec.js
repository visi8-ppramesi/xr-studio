import { mount, flushPromises } from "@vue/test-utils";
import Login from "../../../src/views/auth/Login.vue";
import options from '../utils/pluginInitializer.js'

test("login", async () => {
  const wrapper = mount(Login, {
    global: {
        plugins: [...Object.values(options.plugins)],
        components: {...options.components}
    }
  });

  const promises = [
    wrapper.find('input[name="email"]').setValue('test@gmail.com'),
    wrapper.find('input[name="password"]').setValue('password')
  ]

  await Promise.all(promises)

  // await wrapper.find('#login-button').trigger('click')

  await flushPromises()
  await flushPromises()
  await flushPromises()
  await flushPromises()

  expect(wrapper.find('input[name="email"]').element.value).toBe('test@gmail.com'),
  expect(wrapper.find('input[name="password"]').element.value).toBe('password')
});
