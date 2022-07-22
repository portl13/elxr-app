import CardBlogs from "@components/creator/cards/CardBlogs";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React, { useState } from "react";
import useSWR from "swr";

const url = `${process.env.apiV2}/blogs?all=true`;

const tabs = [
  {
    tab: "all",
    label: "All",
  },
  {
    tab: "art",
    label: "Art",
  },
  {
    tab: "food",
    label: "Food",
  },
  {
    tab: "music",
    label: "Music",
  },
  {
    tab: "yoga",
    label: "Yoga",
  },
];

function PageBlogs() {
  const [tab, setTab] = useState("");
  const { data: blogs, error } = useSWR(`${url}&page=1&per_page=12`, getFetchPublic);

  const isLoading = !blogs && !error;

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Blogs</h4>
        </div>
        <div className="col-12 col-md-6 mb-5">
          {tabs.map((item) => (
            <button
              key={item.tab}
              onClick={() => setTab(item.tab)}
              className={`${tab === item.tab ? "active" : ""} custom-pills`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="col-12 col-md-6 mb-5">
          <div className="d-flex  justify-content-md-end">
            <InputDashSearch />
          </div>
        </div>
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
