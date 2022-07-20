import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

function BlogsTab({ creator_id }) {
  const isLoading = false;
  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14">BLOGS</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      <h1>BlogsTab</h1>
    </div>
  );
}

export default BlogsTab;
