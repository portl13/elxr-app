import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

import { fetchers } from "@/elxr/network/portlApiClient";

const basePath = "/wp-json/buddyboss/v1/activity";

export const useActivities = (params = { per_page: 7, page: 1 }) => {
  return useSWR([basePath, { params }], fetchers.get, {
    revalidateOnFocus: false,
  });
};

export const useActivitiesInfinite = (params = { per_page: 7 }) => {
  return useSWRInfinite(
    (index) => `${basePath}?per_page=${params.per_page}&page=${index + 1}`,
    fetchers.get,
    {
      revalidateOnFocus: false,
    }
  );
};
