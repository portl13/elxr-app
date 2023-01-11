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
      <SectionChannels category={[]} search={''} />
      <SectionEvents category={[]} search={''} />
      <SectionVideos category={[]} search={''} />
      <SectionPodcasts category={[]} search={''} />
      <SectionMusic category={[]} search={''} />
      <SectionBlogs category={[]} search={''} />
      <SectionCourses category={[]} search={''} />
      <SectionCommunities search={''} />
    </>
  );
}

export default MainHome;
