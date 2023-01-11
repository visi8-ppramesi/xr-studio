import { buildQueries, paginationQuery } from "@/composables/queries";
import { onMounted, ref } from "vue";

export function listFetcher(collection) {
  let items = ref([]);
  let query = ref([]);
  let content = ref(null);
  async function getItems(queryParam = [], loadMore = false) {
    let pQuery;
    if (!loadMore) {
      items.value = [];
      pQuery = paginationQuery(12, "name", null, queryParam);
    } else {
      const lastDoc = items.value[items.value.length - 1].doc;
      pQuery = paginationQuery(12, "name", lastDoc, queryParam);
    }

    const [currentCount, myItems] = await Promise.all([
      collection.getCount(pQuery),
      collection.getDocuments(pQuery),
    ]);
    if (currentCount < 12) {
      content.value.disableLoadMore();
    } else {
      content.value.enableLoadMore();
    }
    items.value.push(...myItems);
  }

  function search(data) {
    const myQuery = buildQueries(data.query);
    query.value = myQuery;
    getItems(query.value, false);
  }

  function loadMore() {
    getItems(query.value, true);
  }

  onMounted(() => {
    getItems();
  });

  return { items, query, getItems, search, loadMore, content };
}
