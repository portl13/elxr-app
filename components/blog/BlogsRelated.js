import CardBlogs from "@components/creator/cards/CardBlogs";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React from "react";
import useSWR from "swr";

const url = `${process.env.apiV2}/blogs`;

function BlogsRelated({ category }) {
  const { data: blogs } = useSWR(
    `${url}?category=${category}&page=1&per_page=3`,
    getFetchPublic
  );

  return (
    <aside>
      {!blogs && <SpinnerLoader />}
      {blogs &&
        blogs.blogs.map((blog) => (
          <div className="mb-4" key={blog.id}>
            <CardBlogs blog={blog} />
          </div>
        ))}
    </aside>
  );
}

export default BlogsRelated;
