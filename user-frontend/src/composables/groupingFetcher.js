import { onMounted, reactive } from "vue";
import zipObject from "lodash/zipObject";
import isNil from "lodash/isNil";
import isFunction from "lodash/isFunction";

export function groupingFetcher(collections, callback = () => {}) {
  let group = reactive({});
  const runFunc = () => {
    const keys = Object.keys(collections);
    Promise.all(Object.values(collections).map((v) => v.getDocuments())).then(
      (groupings) => {
        group.data = zipObject(keys, groupings);
        if (!isNil(callback) && isFunction(callback)) {
          callback();
        }
      }
    );
  };

  onMounted(runFunc);
  return group;
}
