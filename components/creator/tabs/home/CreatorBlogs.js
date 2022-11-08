import React, { useRef } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import CardBlogs from "@components/creator/cards/CardBlogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import {
  OPTIONS_SPLIDE_BID_CARD,
  OPTIONS_SPLIDE_GENERAL,
} from "@utils/constant";
import BlogCardNew from "@components/main/card/BlogCardNew";

function CreatorBlogs({ blogs, error, setTab, match }) {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const isLoading = !blogs && !error;

  if (blogs && blogs.blogs && blogs.blogs.length === 0) {
    return "";
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3 align-items-baseline">
          <h4 className="section-main-title">BLOGS</h4>
          <span>
            {!match && blogs?.blogs.length > OPTIONS_SPLIDE_BID_CARD.perPage && (
              <>
                <button
                  onClick={prev}
                  className="arrow-slide btn-icon-header mr-3"
                >
                  <FontAwesomeIcon
                    className="center-absolute"
                    icon={faChevronLeft}
                  />
                </button>
                <button
                  onClick={next}
                  className="arrow-slide btn-icon-header mr-4"
                >
                  <FontAwesomeIcon
                    className="center-absolute"
                    icon={faChevronRight}
                  />
                </button>
              </>
            )}
            <button className={"no-btn"} onClick={() => setTab("blog")}>
              <span className="font-size-14 text-white">See all</span>
            </button>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <div className="section-main section-events">
        <Splide
          options={OPTIONS_SPLIDE_BID_CARD}
          hasTrack={false}
          ref={refSlide}
        >
          <SplideTrack>
            {!match &&
              blogs &&
              blogs.blogs.length > 0 &&
              blogs.blogs.map((blog) => (
                <SplideSlide key={blog.id}>
                  <BlogCardNew blog={blog} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
        {match &&
          blogs &&
          blogs.blogs.length > 0 &&
          blogs.blogs.map((blog) => <BlogCardNew key={blog.id} blog={blog} />)}
      </div>
    </>
  );
}

export default CreatorBlogs;
