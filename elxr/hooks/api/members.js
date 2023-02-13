import useSWR from "swr";

import { fetchers } from "@/elxr/network/portlApiClient";

const basePath = "/wp-json/buddyboss/v1/members";

export const useMembers = (params = {}) => {
  return useSWR([basePath, { params }], fetchers.get, {
    revalidateOnFocus: false,
  });
};
