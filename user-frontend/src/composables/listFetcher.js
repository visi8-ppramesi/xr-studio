import { buildQueries, paginationQuery } from "@/composables/queries";
import { onMounted, ref } from "vue";
import isNil from "lodash/isNil";

export function listFetcher(
  collection,
  itemsPerPage = 12,
  fetcherFunction = "getDocuments",
  loadOnMounted = true
) {
  let items = ref([]);
  let query = ref([]);
  let content = ref(null);
  async function getItems(queryParam = [], loadMore = false) {
    let pQuery;
    if (itemsPerPage > 0) {
      if (!loadMore) {
        items.value = [];
        pQuery = paginationQuery(itemsPerPage, "name", null, queryParam);
      } else {
        const lastDoc = items.value[items.value.length - 1].doc;
        pQuery = paginationQuery(itemsPerPage, "name", lastDoc, queryParam);
      }
    } else {
      pQuery = [...queryParam];
    }

    const [currentCount, myItems] = await Promise.all([
      collection.getCount(pQuery),
      !isNil(collection[fetcherFunction])
        ? collection[fetcherFunction](pQuery)
        : collection.getDocuments(pQuery),
    ]);
    if (currentCount < 12) {
      content.value?.disableLoadMore();
    } else {
      content.value?.enableLoadMore();
    }
    items.value.push(...myItems);
    return myItems;
  }

  function search(data) {
    const myQuery = buildQueries(data.query);
    query.value = myQuery;
    getItems(query.value, false);
  }

  function loadMore() {
    getItems(query.value, true);
  }

  if (loadOnMounted) {
    onMounted(() => {
      getItems();
    });
  }

  return { items, query, getItems, search, loadMore, content };
}
