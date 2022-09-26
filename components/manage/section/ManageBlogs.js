import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import { useRouter } from "next/router";
import useDebounce from "@hooks/useDebounce";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import EventModalSelectChannel from "@components/dashboard/events/EventModalSelectChannel";
import CardBlog from "@components/manage/card/CardBlog";

const url = `${process.env.apiV2}/blogs`;

function ManageBlogs() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const router = useRouter();
  const limit = 20;
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [total, setTotal] = useState(0);

  const createPost = (id) => {
    router.push(`/dashboard/blog/${id}/add-blog/`);
  };

  const { data: blogs, mutate } = useSWR(
    token
      ? [
          `${url}?author=${user?.id}&page=${page}&per_page=${limit}&search=${debounceTerm}`,
          token,
        ]
      : null,
    genericFetch
  );

  const isLoading = !blogs;

  useEffect(() => {
    if (blogs && blogs.total_items) {
      setTotal(blogs.total_items);
    }
  }, [blogs]);

  return (
    <>
      <div className="container">
        <div className="row d-flex  justify-content-between mb-5">
          <div className="col-12 col-md-6">
            <h4 className="list-nav-item-title pl-0">Blogs</h4>
          </div>
          <div className="col-12 col-md-3">
            <InputDashSearch
              value={search}
              name={"search"}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-4 mt-md-5">
          {isLoading && <SpinnerLoader />}
          {blogs &&
            blogs.blogs &&
            blogs.blogs.length > 0 &&
            blogs.blogs.map((blog) => (
              <div key={blog.id} className="col-12 col-md-6 col-lg-3 mb-4">
                <CardBlog mutate={mutate} blog={blog} />
              </div>
            ))}
          {blogs && blogs.blogs && blogs.blogs.length === 0 && (
            <h3 className="col display-4">You have not created any blog yet</h3>
          )}
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
      </div>
      {open && (
        <EventModalSelectChannel
          handleCreate={createPost}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
}

export default ManageBlogs;