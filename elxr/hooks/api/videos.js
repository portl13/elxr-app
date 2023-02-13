import useSWR from "swr";

import { fetchers } from "@/elxr/network/portlApiClient";

const basePath = `${process.env.apiV2}/video?all=true`;

export const useVideos = (params = {}) => {
  // TODO: Move query parameters into params
  return useSWR([basePath, { params }], fetchers.get, {
    revalidateOnFocus: false,
  });
};
