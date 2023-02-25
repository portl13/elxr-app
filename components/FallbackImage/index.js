import React, { useState } from "react";
//import ReactImageFallback from "react-image-fallback";

function FallbackImage(props) {
  const { src, fallback = "", defaultImage = "", className = "" } = props;
  const [load, setLoad] = useState(false);
  return (
    <img
      className={className}
      src={load ? src : fallback}
      alt="src"
      onLoad={() => setLoad(true)}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = defaultImage;
      }}
      // {...props}
    />
  );
}

export default FallbackImage;
