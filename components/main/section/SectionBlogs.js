import CardBlogs from "@components/creator/cards/CardBlogs";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useRef } from "react";
import useSWR from "swr";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import BlogCardNew from "../card/BlogCardNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { OPTIONS_SPLIDE_GENERAL } from "@utils/constant";
import ChannelCardNew from "@components/main/card/ChannelCardNew";

const url = `${process.env.apiV2}/blogs?all=true`;

function SectionBlogs() {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: blogs, error } = useSWR(
    `${url}&page=1&per_page=6`,
    getFetchPublic
  );

  const isLoading = !blogs && !error;

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3" >
          <h4 className="section-main-title">BLOGS</h4>
          <span>
            <button onClick={prev} className="arrow-slide btn-icon-header mr-3">
              <FontAwesomeIcon
                className="center-absolute"
                icon={faChevronLeft}
              />
            </button>
            <button onClick={next} className="arrow-slide btn-icon-header mr-4">
              <FontAwesomeIcon
                className="center-absolute"
                icon={faChevronRight}
              />
            </button>
            <Link href={"/blogs"}>
              <a className="font-size-14 color-font">See all</a>
            </Link>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <Splide options={OPTIONS_SPLIDE_GENERAL} hasTrack={false} ref={refSlide}>
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

export default SectionBlogs;
