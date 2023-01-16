import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FILTERS_POST, OPTIONS_SPLIDE_GENERAL } from "@utils/constant";
import useSWRImmutable from "swr/immutable";
import LargeMainCard from "@components/main/card/LargeMainCard";

const url = `${process.env.apiV2}/blogs?all=true`;
const categoriesUrl = `${process.env.apiV2}/blogs/categories?hide=true`;

function SectionBlogs({ search }) {
  const [filter, setFilter] = useState("desc");
  const [category, setCategory] = useState("");

  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: blogs, error } = useSWR(
    `${url}&page=1&per_page=6&order=${filter}&search=${search}&category=${category}`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const isLoading = !blogs && !error;

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const all = () => {
    setCategory("");
  };

  if (blogs?.blogs?.length === 0) {
    return "";
  }

  return (
    <>
      <section className={"section-light"}>
        <div className="row mb-2">
          <div className="col-12 mb-3 d-flex justify-content-between">
            <h4 className="section-main-title color-font text-capitalize">
              Discover articles, poetry and blogs from our writers
            </h4>
            <Link href="/blogs">
              <a
                  className={`text-capitalize text-font nowrap d-flex d-lg-none font-size-12 align-items-center`}
              >
                See All
              </a>
            </Link>
          </div>

          <div className="col-12 mb-3">
            <div className={"d-flex mb-4"}>
              {FILTERS_POST.map((fil) => (
                <button
                  key={fil.value}
                  onClick={() => setFilter(fil.value)}
                  className={`custom-pills nowrap ${
                    filter === fil.value ? "active" : null
                  }`}
                >
                  {fil.label}
                </button>
              ))}
            </div>

            <div className="row mx-0 d-flex justify-content-between">
              <div className="row mx-0">
                <div className="p-1">
                  <span
                    onClick={all}
                    className={`text-capitalize section-category nowrap pointer ${
                      category === "" ? "active" : ""
                    }`}
                  >
                    All
                  </span>
                </div>
                {categories?.map((value) => (
                  <div key={value.label} className="p-1">
                    <span
                      onClick={() => setCategory(value.value)}
                      className={`text-capitalize section-category nowrap pointer ${
                        category === value.value ? "active" : ""
                      }`}
                    >
                      {value.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/blogs">
                <a className={`text-capitalize section-more-btn nowrap d-none d-lg-block mr-0`}>
                  Discover more writings
                </a>
              </Link>
            </div>
          </div>
        </div>

        {isLoading && <SpinnerLoader />}

        <div className="section-creator">
          <Splide
            ref={refSlide}
            options={OPTIONS_SPLIDE_GENERAL}
            hasTrack={false}
          >
            <SplideTrack>
              {blogs &&
                blogs.blogs.length > 0 &&
                blogs.blogs.map((blog) => (
                  <SplideSlide key={blog.id}>
                    <LargeMainCard category={blog.category} image={blog.thumbnail} title={blog?.title} type={"blog"} item={blog} />
                  </SplideSlide>
                ))}
            </SplideTrack>
          </Splide>
        </div>

        <div className="row mx-0 d-flex justify-content-end mt-4">
          <button onClick={prev} className="arrow-slide section-arrow-btn mr-3">
            <FontAwesomeIcon className="center-absolute" icon={faChevronLeft} />
          </button>
          <button onClick={next} className="arrow-slide section-arrow-btn mr-4">
            <FontAwesomeIcon
              className="center-absolute"
              icon={faChevronRight}
            />
          </button>
        </div>
      </section>
    </>
  );
}

export default SectionBlogs;
