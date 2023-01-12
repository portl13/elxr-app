import React, { useContext } from "react";
import SectionBlogs from "./section/SectionBlogs";
import SectionChannels from "./section/SectionChannels";
import SectionCommunities from "./section/SectionCommunities";
import SectionCourses from "./section/SectionCourses";
import SectionCreator from "./section/SectionCreator";
import SectionEvents from "./section/SectionEvents";
import SectionPodcasts from "./section/SectionPodcasts";
import SectionVideos from "./section/SectionVideos";
import SectionMusic from "@components/main/section/SectionMusic";
import { ChannelContext } from "@context/ChannelContext";

function MainHome() {
  const { debounceTerm } = useContext(ChannelContext);
  return (
    <>
      <SectionCreator />
      <SectionChannels search={debounceTerm} />
      <SectionEvents search={debounceTerm} />
      <SectionVideos search={debounceTerm} />
      <SectionPodcasts search={debounceTerm} />
      <SectionCourses search={debounceTerm} />
      <SectionMusic search={debounceTerm} />
      <SectionBlogs search={debounceTerm} />
      <SectionCommunities search={debounceTerm} />
    </>
  );
}

export default MainHome;
