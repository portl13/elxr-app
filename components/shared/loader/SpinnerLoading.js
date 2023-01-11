import React from "react";
import { LoadingBtn } from "@components/livefeed/livefeed.style";
import { Spinner } from "reactstrap";

function SpinnerLoading({ text = "Loading ..." }) {
  return (
    <LoadingBtn>
      {text}{" "}
      <Spinner style={{ width: "1.2rem", height: "1.2rem" }} color="primary" />
    </LoadingBtn>
  );
}

export default SpinnerLoading;
