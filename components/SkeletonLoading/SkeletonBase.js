import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NonSsrWrapper from "../no-ssr-wrapper/NonSSRWrapper";

function SkeletonBase({ children }) {
  return (
    <NonSsrWrapper>
      <SkeletonTheme
        baseColor="rgba(20,23,57,.5)"
        highlightColor="rgba(20,23,57,.7)"
      >
        {children}
      </SkeletonTheme>
    </NonSsrWrapper>
  );
}

export default SkeletonBase;
