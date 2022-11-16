import BlogsRelated from "@components/blog/BlogsRelated";
import { getFetchPublic } from "@request/creator";
import React, { useContext } from "react";
import useSWR from "swr";
import BlogInfo from "@components/blog/BlogInfo";
import SkeletonEventDetail from "@components/SkeletonLoading/events/SkeletonEventDetail";
import { UserContext } from "@context/UserContext";

const baseUrl = process.env.apiV2;
const url = `${baseUrl}/blogs`;
function BlogDetail({ id }) {

  const { user } = useContext(UserContext);
  const { data: blog, error } = useSWR(`${url}/${id}`, getFetchPublic);

  const isLoading = !blog && !error;

  return (
    <article className="container-media">
      <div className="main-item">
        {isLoading && <SkeletonEventDetail />}
        {!isLoading && <BlogInfo user={user} blog={blog} />}
      </div>
      <div className="relative-items mt-4 mt-md-0">
        <h4 className="text-center text-uppercase">More blogs like this</h4>
        {blog && <BlogsRelated category={blog?.category_id} />}
      </div>
    </article>
  );
}

export default BlogDetail;
