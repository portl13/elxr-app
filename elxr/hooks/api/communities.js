import useSWR from "swr";

import { fetchers } from "@/elxr/network/portlApiClient";

const basePath = "/wp-json/buddyboss/v1/groups";

export const useCommunities = (params = {}) => {
  return useSWR([basePath, { params }], fetchers.get, {
    revalidateOnFocus: false,
  });
};
