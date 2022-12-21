import React, { useState } from "react";
import SectionBlogs from "./section/SectionBlogs";
import SectionChannels from "./section/SectionChannels";
import SectionCommunities from "./section/SectionCommunities";
import SectionCourses from "./section/SectionCourses";
import SectionCreator from "./section/SectionCreator";
import SectionEvents from "./section/SectionEvents";
import SectionPodcasts from "./section/SectionPodcasts";
import SectionVideos from "./section/SectionVideos";
import SectionMusic from "@components/main/section/SectionMusic";
import useDebounce from "@hooks/useDebounce";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import useSWRImmutable from "swr/immutable";
import { getFetchPublic } from "@request/creator";
import ScrollTags from "@components/shared/slider/ScrollTags";

const categoriesUrl = `${process.env.apiV2}/channels/categories/`;

function MainHome() {
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [category, setCategory] = useState("");

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const all = () => {
    setCategory("");
  };

  return (
    <>
      <section className={"row align-items-end"}>
        <div className={"col-12 col-md-9"}>
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
              <div key={value.slug} className="p-1">
                <button
                  onClick={() => setCategory(value.slug)}
                  className={`text-capitalize custom-pills nowrap ${
                    category === value.slug ? "active" : ""
                  }`}
                >
                  {value.label}
                </button>
              </div>
            ))}
          </ScrollTags>
        </div>
        <div className="col-12 col-md-3">
          <InputDashSearch
            value={search}
            name={"search"}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>
      <SectionCreator />
      <SectionChannels category={category} search={debounceTerm} />
      <SectionEvents category={category} search={debounceTerm} />
      <SectionVideos category={category} search={debounceTerm} />
      <SectionPodcasts category={category} search={debounceTerm} />
      <SectionMusic search={debounceTerm} category={category} />
      <SectionBlogs category={category} search={debounceTerm} />
      <SectionCourses category={category} search={debounceTerm} />
      <SectionCommunities search={debounceTerm} />
    </>
  );
}

export default MainHome;
