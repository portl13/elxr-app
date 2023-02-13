import React from "react";

const useMount = (effect) => {
  const intance = React.useRef({
    mounted: false,
    effect,
  });

  React.useEffect(() => {
    if (!intance.current.mounted) {
      intance.current.mounted = true;

      return intance.current.effect();
    }
  }, [intance]);
};

export default useMount;
