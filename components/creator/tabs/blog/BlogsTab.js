import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import useSWRInfinite from "swr/infinite";
import BlogCardNew from "@components/main/card/BlogCardNew";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import InfinitScroll from "react-infinite-scroll-component";

const url = `${process.env.apiV2}/blogs?author=`;

function BlogsTab({ creator_id }) {
  const limit = 20;

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${url}${creator_id}&page=${index + 1}&per_page=${limit}&single=true`,
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
        <div className="col-12">
          <h4 className="font-size-14">BLOGS</h4>
        </div>
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
export default BlogsTab;
