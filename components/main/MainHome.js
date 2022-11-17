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

function MainHome() {
  return (
    <>
      <SectionCreator />
      <SectionChannels />
      <SectionEvents />
      <SectionVideos />
      <SectionPodcasts />
      <SectionMusic />
      <SectionBlogs />
      <SectionCourses />
      <SectionCommunities />
    </>
  );
}

export default MainHome;
