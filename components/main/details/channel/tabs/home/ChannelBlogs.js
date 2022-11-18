import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import CardBlogs from "@components/creator/cards/CardBlogs";

function ChannelBlogs({ blogs, isLoading, setTab }) {
  if (blogs && blogs.blogs && blogs.blogs.length === 0) {
    return "";
  }

  return (
    <div className="row mt-5">
      <div className="col-12 d-flex justify-content-between mb-3 align-items-baseline">
        <h4 className="font-size-14 mb-3">BLOGS</h4>
        <span>
          <button className={"no-btn"} onClick={() => setTab("blog")}>
            <span className="font-size-14 text-white">See all</span>
          </button>
        </span>
      </div>
      {isLoading && <SpinnerLoader />}
      {blogs &&
        blogs.blogs &&
        blogs.blogs.length > 0 &&
        blogs.blogs.map((blog) => (
          <div key={blog.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <CardBlogs blog={blog} />
          </div>
        ))}
    </div>
  );
}

export default ChannelBlogs;
