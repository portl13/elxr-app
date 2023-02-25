import React from "react";

/*
 * Similar to React.useCallback but it doesn't need the observable array
 * and new parameters pased to the callack get updated as the callback
 * reference gets saved in a ref.
 *
 * These event callbacks are not meant to be called inside the render cycle.
 */
function useEvent(handler) {
  const handlerRef = React.useRef(null);

  // In a real implementation, this would run before layout effects
  React.useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return React.useCallback((...args) => {
    // In a real implementation, this would throw if called during render
    const fn = handlerRef.current;

    if (!fn) {
      throw new Error(
        '"useEvent" should not be invoked inside the render context.\n' +
          "Call it inside effects, event handlers or other async contexts instead."
      );
    }

    return fn(...args);
  }, []);
}

export default useEvent;
