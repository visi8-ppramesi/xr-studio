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
    where("creation_date", ">=", startAtParam),
    where("creation_date", "<=", endAtParam),
  ];
};

export const paginationQuery = (
  limitParam,
  orderByParam = "name",
  startAtParam = null
) => {
  if (isNil(startAtParam)) {
    return [orderBy(orderByParam), limit(limitParam)];
  } else {
    return [orderBy(orderByParam), startAfter(startAtParam), limit(limitParam)];
  }
};

export const searchByName = () => {};

export const relatedByCategories = (categories) => {
  return [where("categories", "array-contains-any", categories)];
};

export const relatedByTags = (tags) => {
  return [where("tags", "array-contains-any", tags)];
};
