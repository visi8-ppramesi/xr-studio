import { firebase } from "@/firebase";
import axios from "axios";

const envDev = process.env.VUE_APP_MODE == "development";
export const createHeaders = async function () {
  const { auth } = firebase;
  const { currentUser } = auth;
  const headers = {};
  if (currentUser) {
    const tokenId = await currentUser.getIdToken();
    headers.Authorization = `Bearer ${tokenId}`;
  } else {
    throw new Error("User not logged in");
  }
  return headers;
};

export const createPostRequest = function (
  url,
  name,
  pathname,
  structureFunction,
  handleError = (e) => e
) {
  return async function (data) {
    try {
      const managerUrl = new URL(url);
      managerUrl.pathname = pathname;
      const headers = await createHeaders();

      const procData = structureFunction(data);
      if (envDev) {
        procData.debug = true;
      }

      return axios.post(managerUrl.toString(), procData, {
        headers,
      });
    } catch (error) {
      handleError({ name, error });
      throw error;
    }
  };
};
