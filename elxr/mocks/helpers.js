import React from "react";

import useMount from "@/elxr/hooks/useMount";

export const useFakeRequest = (data, options) => {
  const { delay = 500, error } = options;

  const [reqState, setReqState] = React.useState(() => ({
    data: undefined,
    error: undefined,
    isValidating: true,
  }));

  useMount(() => {
    setTimeout(() => {
      if (error) {
        return setReqState({ error, isValidating: false });
      }

      setReqState({ data, isValidating: false });
    }, delay);
  });

  return reqState;
};
