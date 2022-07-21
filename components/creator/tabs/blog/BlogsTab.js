import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import CardBlogs from "@components/creator/cards/CardBlogs";

function BlogsTab({ creator_id }) {
  const isLoading = false;
  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14">BLOGS</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      <CardBlogs/>
    </div>
  );
}

export default BlogsTab;
