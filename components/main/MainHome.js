import React from "react";
import SectionBlogs from "./section/SectionBlogs";
import SectionChannels from "./section/SectionChannels";
import SectionCommunities from "./section/SectionCommunities";
import SectionCourses from "./section/SectionCourses";
import SectionCreator from "./section/SectionCreator";
import SectionEvents from "./section/SectionEvents";
import SectionPodcasts from "./section/SectionPodcasts";
import SectionVideos from "./section/SectionVideos";
import SectionMusic from "@components/main/section/SectionMusic";

function MainHome({ category, debounceTerm }) {
  return (
    <div className="px-5">
      <SectionCreator />
      <SectionChannels category={category} search={debounceTerm} />
      <SectionEvents category={category} search={debounceTerm} />
      <SectionVideos category={category} search={debounceTerm} />
      <SectionPodcasts category={category} search={debounceTerm} />
      <SectionMusic category={category} search={debounceTerm} />
      <SectionBlogs category={category} search={debounceTerm} />
      <SectionCourses category={category} search={debounceTerm} />
      <SectionCommunities search={debounceTerm} />
    </div>
  );
}

export default MainHome;
