import axios from "axios";

import createFetcher from "@/elxr/lib/fetcher";

const baseURL = process.env.baseUrl;

const portlApiClient = axios.create({
  baseURL,
  // Set other request defaults here if necessary
});

export const setDefaultHeader = (key, value) => {
  if (key && value) {
    portlApiClient.defaults.headers.common[key] = value;
  }
};

export const removeDefaultHeader = (key) => {
  if (key) {
    delete portlApiClient.defaults.headers.common[key];
  }
};

export const fetchers = createFetcher(portlApiClient);

export default portlApiClient;
