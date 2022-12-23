import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import { useRouter } from "next/router";
import useDebounce from "@hooks/useDebounce";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import CardBlog from "@components/manage/card/CardBlog";
import Link from "next/link";
import EmptyList from "@components/shared/ui/EmptyList";

const url = `${process.env.apiV2}/blogs`;

function ManageBlogs() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const router = useRouter();
  const limit = 20;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('publish')

  const { data: blogs, mutate } = useSWR(
    token
      ? [
          `${url}?author=${user?.id}&page=${page}&per_page=${limit}&status=${status}&search=${debounceTerm}`,
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
          <div className="col-12 col-md-auto mt-4 mt-md-0">
            <Link href={"/dashboard/blog/create-blog"}>
              <a className={"btn btn-primary btn-create w-100"}>
                Create a blog
              </a>
            </Link>
          </div>
        </div>
        <div className="row">
        <div className="col-12 d-flex">
          <div className="p-1">
            <button
              onClick={() => setStatus('publish')}
              className={`custom-pills nowrap ${
                status === 'publish' ? 'active' : ''
              }`}
            >
              Published
            </button>
          </div>
          <div className="p-1">
            <button
              onClick={() => setStatus('draft')}
              className={`custom-pills nowrap ${
                status === 'draft' ? 'active' : ''
              }`}
            >
              Drafts
            </button>
          </div>
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
            <EmptyList
              text={"Has not created a blog"}
              icon={
                <img
                  src={"/img/icon-movil/create-menu/blog-icon.svg"}
                  alt={"blog"}
                />
              }
            />
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
    </>
  );
}

export default ManageBlogs;
