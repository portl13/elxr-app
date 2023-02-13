import useSWR from "swr";

import { fetchers } from "@/elxr/network/portlApiClient";

const basePath = "wp-json/appointment/v1/appointment";

export const useAppointments = (params = {}) => {
  return useSWR([basePath, { params }], fetchers.get, {
    revalidateOnFocus: false,
  });
};
