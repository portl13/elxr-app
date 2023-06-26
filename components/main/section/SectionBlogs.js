import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { FILTERS_POST, OPTIONS_SPLIDE_CHANNELS } from "@utils/constant";
import BlogCardNew from "../card/BlogCardNew";
import { useCategories } from "@context/EventsContext";
import SeeAllButton from "@components/main/ui/SeeAllButton";

const url = `${process.env.apiV2}/blogs?all=true`;

function SectionBlogs({ search }) {
  const [filter, setFilter] = useState("featured");
  const { cat: category } = useCategories();

  const refSlide = useRef();

  const { data: blogs, error } = useSWR(
    `${url}&page=1&per_page=6&order=${filter}&search=${search}&category=${category.slug}&single=true`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const isLoading = !blogs && !error;

  if (blogs?.length === 0) {
    return "";
  }

  return (
    <>
      <section className={"section-dark"}>
        <div className="row">
          <div className="col-12 mb-2 d-flex justify-content-between">
            <div className="d-flex flex-column flex-lg-row w-100">
              <h4 className="section-main-title text-capitalize d-flex align-items-center justify-content-between">
                Featured Writings
                <SeeAllButton path={"/blogs"} className={"d-lg-none d-flex"} />
              </h4>
              <div className={"filter-contents mb-2 ml-lg-3"}>
                {FILTERS_POST.map((fil) => (
                  <button
                    key={fil.value}
                    onClick={() => setFilter(fil.value)}
                    className={`category-btn ${
                      filter === fil.value ? "active" : null
                    }`}
                  >
                    {fil.label}
                  </button>
                ))}
              </div>
            </div>
            <SeeAllButton path={"/blogs"} className={"d-none d-lg-flex"} />
          </div>
        </div>

        {isLoading && <SpinnerLoader />}

        <div className="section-creator">
          <Splide
            ref={refSlide}
            options={OPTIONS_SPLIDE_CHANNELS}
            hasTrack={false}
          >
            <SplideTrack>
              {blogs &&
                blogs.map((blog) => (
                  <SplideSlide key={blog.id}>
                    <BlogCardNew blog={blog} />
                  </SplideSlide>
                ))}
            </SplideTrack>
          </Splide>
        </div>
      </section>
    </>
  );
}

export default SectionBlogs;