import React from "react";
import Link from "next/link";

function SeeAllButton({ path, text = "See All", className }) {
  return (
    <Link href={path}>
      <a
        className={`text-capitalize text-font nowrap font-size-12 align-items-center ${className}`}
      >
        {text}
      </a>
    </Link>
  );
}

export default SeeAllButton;
