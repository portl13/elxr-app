import React from "react";

/*
 * Used for when we need to override global CSS in Portl files
 *
 * The fact it creates a style tag closer to the elements help give
 * it more precedence.
 */
const CSSOverrider = ({ styles = "" }) => {
  return <style>{styles}</style>;
};

export default CSSOverrider;
