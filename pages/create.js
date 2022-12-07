import React, { useContext } from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import ListNavItem from "@components/layout/ListNavItem";
import BackButton from "@components/shared/button/BackButton";
import {
  faMusic,
  faPodcast,
  faHeadphones,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import ProductIcon from "@icons/ProductIcon";
import useSWR from "swr";
import { UserContext } from "@context/UserContext";
import { genericFetch } from "@request/dashboard";
import { Alert } from "reactstrap";

const url = `${process.env.apiV2}/channels`;

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
    icon: <FontAwesomeIcon icon={faYoutube} />,
  },
  {
    link: "/create/album",
    title: "Album",
    icon: <FontAwesomeIcon icon={faHeadphones} />,
  },
  {
    link: "/create/song",
    title: "Song",
    icon: <FontAwesomeIcon icon={faMusic} />,
  },
  {
    link: "/create/create-podcasts",
    title: "Podcasts",
    icon: <FontAwesomeIcon className="text-podcast" icon={faPodcast} />,
  },
  {
    link: "/dashboard/blog/create-blog",
    title: "Blogs",
    icon: "/img/icon-movil/create-menu/blog-icon.svg",
  },
  {
    link: "/dashboard/courses/add-course",
    title: "Courses",
    icon: "/img/icon-movil/purchases-menu/courses.svg",
  },
  {
    link: "/create/add-product",
    title: "Product",
    icon: <ProductIcon />,
  },
  {
    link: "/community/create-group",
    title: "Communities",
    icon: "/img/icon-movil/create-menu/communities-icon.svg",
  },
  {
    link: "/create/meetings",
    title: "Meetings",
    icon: "/img/icon-movil/create-menu/meetings.svg",
  },
];

function CreatePage() {
  const { user } = useContext(UserContext);
  const { data: channel } = useSWR(
    user?.token
      ? [`${url}?author=${user.id}&page=1&per_page=1&single=true`, user.token]
      : null,
    genericFetch
  );

  return (
    <MainLayout title="Create" sidebar={<MainSidebar />}>
      <BackButton />
      <figure className="text-center mb-4">
        <h3>Create</h3>
      </figure>
      <section className="container-menu-mobile pb-2">
        {channel && channel?.channels && channel.channels.length === 0 ? (
          <div
            className={
              "align-items-center justify-content-center d-flex flex-column list-nav-item font-size-14"
            }
            color={"danger"}
          >
            <span>You have not created any channels,</span>
            <span>please Create a Channel to add content.</span>
          </div>
        ) : null}
        {routers.map((route) => (
          <ListNavItem key={route.link} data={route} />
        ))}
      </section>
    </MainLayout>
  );
}

export default CreatePage;
