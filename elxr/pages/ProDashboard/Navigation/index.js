import React, { useContext } from "react";
import { UserContext } from "@context/UserContext";
import DashboardIcon from "@/elxr/components/assets/svg/icons/Dashboard";
import ClientIcon from "@/elxr/components/assets/svg/icons/Client";
import MembersIcon from "@/elxr/components/assets/svg/icons/Members";
import MeetingsIcon from "@/elxr/components/assets/svg/icons/Meetings";
import CommunityIcon from "@/elxr/components/assets/svg/icons/Community";
import EventIcon from "@/elxr/components/assets/svg/icons/Event";
import StoreIcon from "@/elxr/components/assets/svg/icons/Store";
import ContentIcon from "@/elxr/components/assets/svg/icons/Content";
import SubscriptionIcon from "@/elxr/components/assets/svg/icons/Subscription";
import ProductIcon from "@/elxr/components/assets/svg/icons/Product";
import OrdersIcon from "@/elxr/components/assets/svg/icons/Orders";
import ChannelsIcon from "@/elxr/components/assets/svg/icons/Channels";
import VideosIcon from "@/elxr/components/assets/svg/icons/Video";
import PodcastsIcon from "@/elxr/components/assets/svg/icons/Podcast";
import BlogsIcon from "@/elxr/components/assets/svg/icons/Blogs";
import CourseIcon from "@/elxr/components/assets/svg/icons/Course";
import ArrowDownIcon from "@/elxr/components/assets/svg/icons/ArrowDown";
import ArrowUpIcon from "@/elxr/components/assets/svg/icons/ArrowUp";
import Link from "next/link";

import * as S from "./styles";

const CollapsabledMenuItem = ({ item }) => {
  const { routes, title, icon } = item;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <S.MenuItem onClick={() => setIsOpen((open) => !open)}>
        {icon} {title} {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </S.MenuItem>
      {isOpen &&
        routes.map((r, idx) => (
          <Link key={idx} href={r.path}>
            <a>
              <S.CollapsableItem>
                <S.MenuItem>
                  {r.icon} {r.title}
                </S.MenuItem>
              </S.CollapsableItem>
            </a>
          </Link>
        ))}
    </div>
  );
};

const Navigation = () => {
  const { user } = useContext(UserContext);

  const routes = [
    {
      title: "Clients",
      icon: <ClientIcon />,
      path: "/manage/customers",
    },
    {
      title: "My Page",
      icon: <MembersIcon />,
      path: `/professionals/my-page/${user.id}`,
    },
    {
      title: "Meetings",
      icon: <MeetingsIcon />,
      path: "/calendar-menu/appointments-list",
    },
    {
      title: "Communities",
      icon: <CommunityIcon />,
      path: "/manage/communities",
    },
    {
      title: "My Events",
      icon: <EventIcon />,
      path: "/manage/events",
    },
    {
      title: "My Store",
      icon: <StoreIcon />,
      routes: [
        {
          title: "My Subscriptions",
          icon: <SubscriptionIcon />,
          path: "/manage/subscription",
        },
        {
          title: "My Products",
          icon: <ProductIcon />,
          path: "/manage/products",
        },
        {
          title: "Orders",
          icon: <OrdersIcon />,
          path: "/manage/orders",
        },
      ],
    },
    {
      title: "Branding",
      icon: <StoreIcon />,
      path: "/manage/branding",
    },
    {
      title: "My Content",
      icon: <ContentIcon />,
      routes: [
        {
          title: "Channels",
          icon: <ChannelsIcon />,
          path: "/manage/channels",
        },
        {
          title: "Videos",
          icon: <VideosIcon />,
          path: "/manage/videos",
        },
        {
          title: "Podcasts",
          icon: <PodcastsIcon />,
          path: "/manage/podcasts",
        },
        {
          title: "Blogs",
          icon: <BlogsIcon />,
          path: "/manage/blogs",
        },
        {
          title: "Courses",
          icon: <CourseIcon />,
          path: "/manage/courses",
        },
      ],
    },
  ];

  return (
    <S.NavigationContainer>
      <Link href="/pro-dashboard">
        <S.DashboardItem>
          <DashboardIcon /> <S.DashboardText>Dashboard</S.DashboardText>
        </S.DashboardItem>
      </Link>
      {routes.map((r) => {
        if (r.routes) {
          return <CollapsabledMenuItem key={r.title} item={r} />;
        }
        return (
          <Link key={r.title} href={r.path}>
            <a>
              <S.MenuItem>
                {r.icon} {r.title}
              </S.MenuItem>
            </a>
          </Link>
        );
      })}
    </S.NavigationContainer>
  );
};

export default Navigation;
