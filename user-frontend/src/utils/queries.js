import {
  where,
  limit,
  orderBy,
  startAfter,
  // startAt,
  // doc,
  // FieldPath,
  // endBefore,
  // getDoc,
} from "firebase/firestore";
import isNil from "lodash/isNil";

export const shootCalendarBetweenQuery = (startAtParam, endAtParam) => {
  return [
    where("locked_in_start_date", ">=", startAtParam),
    where("locked_in_start_date", "<=", endAtParam),
  ];
};

export const shootCalendarCreatedByQuery = (startAtParam, endAtParam) => {
  return [
    where("created_date", ">=", startAtParam),
    where("created_date", "<=", endAtParam),
  ];
};

export const paginationQuery = (
  limitParam,
  orderByParam = "name",
  startAtParam = null,
  extraParams = []
) => {
  if (isNil(startAtParam)) {
    return [orderBy(orderByParam), limit(limitParam), ...extraParams];
  } else {
    return [
      orderBy(orderByParam),
      startAfter(startAtParam),
      limit(limitParam),
      ...extraParams,
    ];
  }
};

export const searchByName = () => {};

export const relatedByCategories = (categories) => {
  return [where("categories", "array-contains-any", categories)];
};

export const relatedByTags = (tags) => {
  return [where("tags", "array-contains-any", tags)];
};
