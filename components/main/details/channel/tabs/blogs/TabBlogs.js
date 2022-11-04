import React, {useEffect, useState} from 'react'
import useSWR from "swr";
import {getFetchPublic} from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import BlogCardNew from "@components/main/card/BlogCardNew";
import Pagination from "@components/shared/pagination/Pagination";

const baseUrl = process.env.apiV2
const blogsUrl = `${baseUrl}/blogs?channel_id=`

function TabBlogs({ channel_id }) {
  const limit = 12;
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)


  const { data: blogs, error } = useSWR(
      `${blogsUrl}${channel_id}&page=${page}&per_page=${limit}`,
      getFetchPublic
  );

  const isLoading = !blogs && !error;

  useEffect(() => {
    if(blogs && blogs.total_items) {
      setTotal(blogs.total_items)
    }
  }, [blogs])

  return (
      <>
        <div className="row mt-5">
          {isLoading && <SpinnerLoader />}
          {blogs &&
              blogs.blogs.length > 0 &&
              blogs.blogs.map((blog) => (
                  <div key={blog.id} className="col-6 col-md-6 col-lg-3 mb-4">
                    <BlogCardNew blog={blog} />
                  </div>
              ))}
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Pagination
                totalCount={total || 0}
                onPageChange={setPage}
                currentPage={page}
                pageSize={limit}
            />
          </div>
        </div>
      </>
  )
}

export default TabBlogs