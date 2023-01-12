import React, {useEffect, useRef, useState} from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import useSWR from "swr";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import {
  FILTERS_POST,
  OPTIONS_SPLIDE_GENERAL_MUSIC,
} from "@utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useSWRImmutable from "swr/immutable";
import CardHomeMusic from "../card/CardHomeMusic";
import {chuckSize} from "@utils/chuckSize";

const podcastslUrl = `${process.env.apiV2}/albums?all=true&single=true`;
const categoriesUrl = `${process.env.apiV2}/albums/categories?hide=true`;
function SectionMusic({ search }) {
  const [filter, setFilter] = useState("desc");
  const [category, setCategory] = useState("");
  const [music, setMusic] = useState([]);
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: audios, error } = useSWR(
    `${podcastslUrl}&page=1&per_page=8&order=${filter}&search=${search}&category=${category}&with_author=true`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const isLoading = !audios && !error;

  const all = () => {
    setCategory("");
  };

  useEffect(() => {
    if (audios?.length){
      setMusic(chuckSize(audios, 2))
    }
  }, [audios]);


  if (audios?.length === 0) {
    return "";
  }

  return (
    <section className={"section-dark"}>
      <div className="row mb-2">
        <div className="col-12 mb-3">
          <h4 className="section-main-title text-capitalize ">
            Trending albums and songs{" "}
          </h4>
        </div>

        <div className="col-12 mb-3">
          <div className={"d-none d-md-flex"}>
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
        </div>

        <div className="col-12 mb-3">
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

            <Link href={"/music"}>
              <a className={`text-capitalize section-more-btn nowrap`}>
                Discover more music
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="section-music">
        {isLoading && <SpinnerLoader />}
        <Splide
          ref={refSlide}
          options={OPTIONS_SPLIDE_GENERAL_MUSIC}
          hasTrack={false}
        >
          <SplideTrack>
            {music?.map((audio, index) => (
              <SplideSlide key={index}>
                {audio.map(a => (
                  <CardHomeMusic type={"album"} audio={a} />
                ))}
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
          <FontAwesomeIcon className="center-absolute" icon={faChevronRight} />
        </button>
      </div>
    </section>
  );
}

export default SectionMusic;
