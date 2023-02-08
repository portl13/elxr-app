import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import BlogCardNew from "@components/main/card/BlogCardNew";
import Pagination from "@components/shared/pagination/Pagination";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";

const baseUrl = process.env.apiV2;
const blogsUrl = `${baseUrl}/blogs?channel_id=`;

function TabBlogs({ channel_id }) {
  const limit = 20;

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${blogsUrl}${channel_id}&page=${
        index + 1
      }&per_page=${limit}&single=true`,
    getFetchPublic
  );

  const blogs = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  return (
    <>
      <div className="row mt-5">
        {isLoadingInitialData && <SpinnerLoader />}
      </div>
      <InfinitScroll
        className={"row"}
        dataLength={blogs.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {blogs &&
          blogs.map((blog) => (
            <div key={blog.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <BlogCardNew blog={blog} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default TabBlogs;
