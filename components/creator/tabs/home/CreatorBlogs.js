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
  FILTERS_POST,
  OPTIONS_SPLIDE_BID_CARD,
  OPTIONS_SPLIDE_EVENTS,
  OPTIONS_SPLIDE_GENERAL,
} from "@utils/constant";
import BlogCardNew from "@components/main/card/BlogCardNew";
import CreatorSectionHeader from "@components/creator/tabs/home/CreatorSectionHeader";

function CreatorBlogs({ blogs, error, setTab, filter, setFilter }) {
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
      <CreatorSectionHeader title={"Writings"} setTab={() => setTab("blog")}>
        {FILTERS_POST.map((fil) => (
          <button
            key={fil.value}
            onClick={() => setFilter(fil.value)}
            className={`category-btn ${filter === fil.value ? "active" : null}`}
          >
            {fil.label}
          </button>
        ))}
      </CreatorSectionHeader>
      {isLoading && (
        <div className={"row"}>
          <SpinnerLoader />
        </div>
      )}
      <div className="section-events">
        <Splide options={OPTIONS_SPLIDE_EVENTS} hasTrack={false} ref={refSlide}>
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
      </div>
    </>
  );
}

export default CreatorBlogs;
