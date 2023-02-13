import useSWR from "swr";

import { fetchers } from "@/elxr/network/portlApiClient";

const basePath = "/wp-json/buddyboss/v1/topics";

export const useDiscussions = (params = {}) => {
  // TODO: Move query parameters into params
  return useSWR([basePath, { params }], fetchers.get, {
    revalidateOnFocus: false,
  });
};
