import CardBlogs from "@components/creator/cards/CardBlogs";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import ScrollTags from "@components/shared/slider/ScrollTags";
import useDebounce from "@hooks/useDebounce";
import { getFetchPublic } from "@request/creator";
import React, { useState } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

const url = `${process.env.apiV2}/blogs?all=true`;
const categoriesUrl = `${process.env.apiV2}/blogs/categories`;

function PageBlogs() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);

  const { data: blogs, error } = useSWR(
    `${url}&page=1&per_page=12&search=${debounceTerm}&category=${category}`,
    getFetchPublic
  );

  const isLoading = !blogs && !error;

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const all = () => {
    setCategory("");
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Blogs</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-4 mb-md-5">
          <ScrollTags>
            <div className="p-1">
              <button
                onClick={all}
                className={`custom-pills nowrap ${
                  category === "" ? "active" : ""
                }`}
              >
                All
              </button>
            </div>
            {categories?.map((value) => (
              <div key={value.value} className="p-1">
                <button
                  onClick={() => setCategory(value.value)}
                  className={`custom-pills nowrap ${
                    category === value.value ? "active" : ""
                  }`}
                >
                  {value.label}
                </button>
              </div>
            ))}
          </ScrollTags>
        </div>
        <div className="col-12 col-md-3 mb-4 mb-md-5">
          <div className="d-flex  justify-content-md-end">
            <InputDashSearch
              value={search}
              name={"search"}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        {isLoading && <SpinnerLoader />}
        {blogs &&
          blogs.blogs.length > 0 &&
          blogs.blogs.map((blog) => (
            <div key={blog.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <CardBlogs blog={blog} />
            </div>
          ))}
      </div>
    </>
  );
}

export default PageBlogs;
