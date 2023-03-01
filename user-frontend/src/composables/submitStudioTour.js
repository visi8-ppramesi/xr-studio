// import { firebase } from "@/firebase";
// import { vedhg } from "@/utils/dateRangeHash";
// import axios from "axios";
import isNil from "lodash/isNil";
import omitBy from "lodash/omitBy";
// import omitBy from "lodash/omitBy";
// import isEmpty from "lodash/isEmpty";
import { createPostRequest } from "./utils/postRequestUtils";

const handleError = (e) => {
  return e;
};

const structureStudioTourData = function (data) {
  const retVal = omitBy(
    {
      tour_start_date: data.startDate,
      tour_end_date: data.endDate,
      location: data.location,
      notes: data.notes,
      contact_email: data.email,
    },
    isNil
  );
  return retVal;
};

const createStudioTourPostRequest = createPostRequest(
  process.env.VUE_APP_STUDIO_TOUR_MANAGER,
  "createStudioTour",
  "create-studio-tour",
  structureStudioTourData,
  handleError
);

export async function createStudioTour(data) {
  return createStudioTourPostRequest(data);
}
