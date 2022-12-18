import CardBlogs from "@components/creator/cards/CardBlogs";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, {useRef, useState} from "react";
import useSWR from "swr";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import BlogCardNew from "../card/BlogCardNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {FILTERS_POST, OPTIONS_SPLIDE_GENERAL} from "@utils/constant";
import ChannelCardNew from "@components/main/card/ChannelCardNew";

const url = `${process.env.apiV2}/blogs?all=true`;

function SectionBlogs({search}) {
  const [filter, setFilter] = useState('desc');

  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: blogs, error } = useSWR(
    `${url}&page=1&per_page=6&order=${filter}&search=${search}`,
    getFetchPublic
  );

  const isLoading = !blogs && !error;

  if (blogs?.blogs?.length === 0){
    return ''
  }

  return (
    <section className={"section-home"}>
      <div className="row">
        <div className="col-12 d-flex justify-content-between mb-3" >
          <div className={"d-flex align-items-center mb-3"}>
            <h4 className="section-main-title text-capitalize mb-0 mr-5">Blogs</h4>
            <div className={"d-flex"}>
              {FILTERS_POST.map(fil => (
                  <button
                      key={fil.value}
                      onClick={()=>setFilter(fil.value)}
                      className={`custom-pills nowrap ${filter === fil.value ? 'active' : null}`}>
                    {fil.label}
                  </button>
              ))}
            </div>
          </div>
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
    </section>
  );
}

export default SectionBlogs;
