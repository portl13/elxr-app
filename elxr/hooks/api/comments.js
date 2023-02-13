import useSWR from "swr";

import { fetchers } from "@/elxr/network/portlApiClient";

export const useComments = (postId = null, params = {}) => {
  const basePath = `/wp-json/buddyboss/v1/activity/${postId}/comment`;
  return useSWR(postId ? [basePath, { params }] : null, fetchers.get, {
    revalidateOnFocus: false,
  });
};
