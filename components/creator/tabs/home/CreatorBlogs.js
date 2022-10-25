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

function CreatorBlogs({ blogs, error, limit = 4 }) {
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
        <div className="col-12 d-flex justify-content-between mb-3">
          <h4 className="section-main-title">BLOGS</h4>
          <span>
            {blogs?.blogs.length > OPTIONS_SPLIDE_BID_CARD.perPage && (
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
            <Link href={"/blogs"}>
              <a className="font-size-14 text-white">See all</a>
            </Link>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <Splide options={OPTIONS_SPLIDE_BID_CARD} hasTrack={false} ref={refSlide}>
        <SplideTrack>
          {blogs &&
            blogs.blogs.length > 0 &&
            blogs.blogs.map((blog) => (
              <SplideSlide key={blog.id}>
                <BlogCardNew blog={blog} />
              </SplideSlide>
            ))}
        </SplideTrack>
      </Splide>
    </>
  );
}

export default CreatorBlogs;
