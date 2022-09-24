import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import Image from "next/image";
import ListNavItem from "@components/layout/ListNavItem";
import BackButton from "@components/shared/button/BackButton";

const routers = [
  {
    link: "/dashboard/channels/create-channel",
    title: "Channels",
    icon: "/img/icon-movil/create-menu/channles-icon.svg",
  },
  {
    link: "/dashboard/channel/create-event",
    title: "Events",
    icon: "/img/icon-movil/create-menu/events.svg",
  },
  {
    link: "/dashboard/videos/create-video",
    title: "Videos",
    icon: "/img/icon-movil/create-menu/video-icon.svg",
  },
  {
    link: "/dashboard/podcasts/create-podcasts",
    title: "Podcasts",
    icon: "/img/icon-movil/create-menu/podcast.svg",
  },
  {
    link: "/dashboard/blog/create-blog",
    title: "Blogs",
    icon: "/img/icon-movil/create-menu/blog-icon.svg",
  },
  {
    link: "/dashboard/courses/add-course",
    title: "Courses",
    icon: "/img/icon-movil/create-menu/courses-icon.svg",
  },
  {
    link: "/community/create-group",
    title: "Communities",
    icon: "/img/icon-movil/create-menu/communities-icon.svg",
  },
  {
    link: "/dashboard/meetings",
    title: "Meetings",
    icon: "/img/icon-movil/create-menu/meetings.svg",
  },
];

function CreatePage() {
  return (
    <MainLayout title="Create" sidebar={<MainSidebar />}>
      <BackButton />
      <figure className="text-center mb-4">
        <h3>Create</h3>
      </figure>
      <section className="container-menu-mobile">
        {routers.map((route) => (
          <ListNavItem key={route.link} data={route} />
        ))}
      </section>
    </MainLayout>
  );
}

export default CreatePage;
