import useSWR from "swr";

import { fetchers } from "@/elxr/network/portlApiClient";

const basePath = "/wp-json/ldlms/v2/sfwd-courses";

export const useCourses = (params = {}) => {
  return useSWR([basePath, { params }], fetchers.get, {
    revalidateOnFocus: false,
  });
};
