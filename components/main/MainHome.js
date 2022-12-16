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

function MainHome() {
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);

  return (
    <>
      <section className={"section-main-header"}>
        <div></div>
        <InputDashSearch
          value={search}
          name={"search"}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
      <SectionCreator />
      <SectionChannels search={debounceTerm} />
      <SectionEvents   search={debounceTerm} />
      <SectionVideos   search={debounceTerm} />
      <SectionPodcasts search={debounceTerm} />
      <SectionMusic    search={debounceTerm} />
      <SectionBlogs    search={debounceTerm} />
      <SectionCourses  search={debounceTerm} />
      <SectionCommunities search={debounceTerm} />
    </>
  );
}

export default MainHome;
