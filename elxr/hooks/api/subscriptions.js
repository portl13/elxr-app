import useSWR from "swr";

import { fetchers } from "@/elxr/network/portlApiClient";

const basePath = "/wp-json/portl/v1/my-account/subscriptions";

export const useSubscriptions = (params = {}) => {
  return useSWR([basePath, { params }], fetchers.get, {
    revalidateOnFocus: false,
  });
};
