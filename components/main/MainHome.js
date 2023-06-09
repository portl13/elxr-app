import React, { useContext } from "react";
import SectionGalleries from "./section/SectionGalleries";
import SectionChannels from "./section/SectionChannels";
import SectionCommunities from "./section/SectionCommunities";
import SectionCourses from "./section/SectionCourses";
import SectionCreator from "./section/SectionCreator";
import SectionEvents from "./section/SectionEvents";
import SectionPodcasts from "./section/SectionPodcasts";
import SectionVideos from "./section/SectionVideos";
import { ChannelContext } from "@context/ChannelContext";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import { useMenu } from "@context/MenuContext";
import SectionBlogs from "./section/SectionBlogs";
import SectionFeatured from "./section/SectionFeatured";

function MainHome() {
  const { debounceTerm, setSearch, search } = useContext(ChannelContext);
  const { openSearch } = useMenu();
  return (
    <>
      {openSearch ? (
        <section className="section-dark col-md-none">
          <div className="row">
            <div className="col-12">
              <InputDashSearch
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </div>
        </section>
      ) : null}
      <SectionFeatured />
      <SectionVideos search={debounceTerm} />
      <SectionCreator search={debounceTerm} />
      <SectionEvents search={debounceTerm} />
      <SectionCommunities search={debounceTerm} />
      <SectionCourses search={debounceTerm} />
      <SectionPodcasts search={debounceTerm} />
      <SectionChannels search={debounceTerm} />
      <SectionGalleries search={debounceTerm} />
      <SectionBlogs search={debounceTerm} />
    </>
  );
}

export default MainHome;
