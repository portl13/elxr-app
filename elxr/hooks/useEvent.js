import React from "react";

/*
 * Alternative to useCallback that memoizes the callback reference
 * but doesn't require an array of observables.
 *
 * The callback values are always up to date as they will be mutated
 * inside the ref instance.
 *
 * The callbacks returned from this event should not becalled inside
 * render function body. Only in effects, event handlers and other async
 * contexts.
 */
function useEvent(handler) {
  const handlerRef = React.useRef(null);

  // In a real implementation, this would run before layout effects
  React.useEffect(() => {
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
