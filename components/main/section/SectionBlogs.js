import CardBlogs from "@components/creator/cards/CardBlogs";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import React from "react";

function SectionBlogs() {
  const isLoading = false;
  return (
    <>
      <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14">BLOGS</h4>
      </div>
        <CardBlogs />
      </div>
    </>
  );
}

export default SectionBlogs;
