import { where, limit, orderBy, startAfter } from "firebase/firestore";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";

const queries = {
  manufacturer: function (manufacturer) {
    return where("manufacturer", "==", manufacturer);
  },
  model: function (model) {
    return where("model", "==", model);
  },
  equipmentCategories: function (equipmentCategories) {
    return where(
      "categories",
      "array-contains-any",
      Object.values(equipmentCategories)
    );
  },
  minPrice: function (minPrice) {
    return where("price", ">=", parseInt(minPrice));
  },
  maxPrice: function (maxPrice) {
    return where("price", "<=", parseInt(maxPrice));
  },
  stringQuery: function (stringQuery) {
    return where("name", "==", stringQuery);
  },
  orderBy: function (orderByParam) {
    return orderBy(orderByParam);
  },
  limit: function (limitParam) {
    return limit(limitParam);
  },
  startAfter: function (startAfterParam) {
    return startAfter(startAfterParam);
  },
};

export function buildQueries(query) {
  const queryKeys = Object.keys(query);
  const queryVals = Object.values(query);
  return filter(
    queryKeys.map((v, idx) => {
      return queries[v](queryVals[idx]);
    }),
    (k) => !isEmpty(k)
  );
}

export const paginationQuery = (
  limitParam,
  orderByParam = "name",
  startAfterParam = null,
  extraParams = []
) => {
  let initialQuery = [orderBy(orderByParam)];
  if (extraParams.length > 0) {
    const pIdx = extraParams.findIndex(
      (v) =>
        v.type === "where" &&
        ["<", "<=", "!=", "not-in", ">", ">="].includes(v._op)
    );
    if (pIdx >= 0) {
      initialQuery = [];
    }
  }
  let queryResult;
  if (isNil(startAfterParam)) {
    queryResult = [...initialQuery, limit(limitParam), ...extraParams];
  } else {
    queryResult = [
      ...initialQuery,
      startAfter(startAfterParam),
      limit(limitParam),
      ...extraParams,
    ];
  }
  return queryResult;
};
