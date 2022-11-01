<template>
  <div>
    <form class="bg-white rounded px-8 pt-6 pb-8 mb-4">
      <div v-for="field in fields" :key="field.id">
        <div v-if="field.type === 'input'">
          <div class="flex justify-center py-1">
            <div class="mb-3 w-full mx-96 xl:w-96">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                {{ field.name }}
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                :type="field.type"
                :placeholder="field.placeholder"
                v-model="formData[field.name]"
              />
            </div>
          </div>
        </div>

        <div v-if="field.type === 'select'">
          <div class="flex justify-center py-1">
            <div class="mb-3 w-full mx-96 xl:w-96">
              <select
                class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
                v-model="formData[field.name]"
              >
                <option
                  v-for="item in field.options"
                  :key="item.id"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div v-if="field.type === 'checkbox'">
          <div class="flex justify-center py-2">
            <div class="mb-3 w-full mx-96 xl:w-96">
              <div class="form-check">
                <input
                  class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="flexCheckDefault"
                  v-model="formData[field.name]"
                />
                <label
                  class="form-check-label inline-block text-gray-800"
                  for="flexCheckDefault"
                >
                  {{ field.label }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div v-if="field.type === 'textarea'">
          <div class="flex justify-center py-2">
            <div class="mb-3 w-full mx-96 xl:w-96">
              <label
                for="exampleFormControlTextarea1"
                class="form-label inline-block mb-2 text-gray-700"
                >{{ field.label }}</label
              >
              <textarea
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlTextarea1"
                rows="3"
                :placeholder="field.placeholder"
                v-model="formData[field.name]"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          @click="register()"
          type="button"
          class="mb-8 inline-block px-20 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          name: "firstname",
          type: "input",
          placeholder: "first name",
        },
        {
          name: "category",
          type: "select",
          options: [
            {
              value: "1",
              label: "option 1",
            },
            {
              value: "2",
              label: "option 2",
            },
            {
              value: "3",
              label: "option 3",
            },
          ],
          placeholder: "Categories",
        },
        {
          name: "tag_1",
          label: "asdf",
          type: "checkbox",
        },
        {
          name: "tag_2",
          label: "asdfssss",
          type: "checkbox",
        },
        {
          name: "Description",
          type: "textarea",
          label: "textarea box",
          placeholder: "Description",
        },
      ],
      formData: {},
    };
  },
  methods: {
    register() {
      console.log(this.formData);
    },
  },
};
</script>
