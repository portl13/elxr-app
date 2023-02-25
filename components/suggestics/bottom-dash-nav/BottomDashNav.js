import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CssBaseline,
} from "@material-ui/core";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { dashSlideTitles } from "../../../store/features/dash-info/dash-info-slice";
import { useAppSelector } from "../../../store/store";

const routes = {
  0: "/meal-plan",
  1: "/recipe",
  2: "/journal",
  3: "/shopping-list",
};

export function BottomDashNav() {
  const slideIndex = useAppSelector((state) => state.dashInfo.slideIndex);
  const ref = React.useRef(null);
  const [activeTab, setActiveTab] = useState("");
  const [activeTabImg, setActiveTabImg] = useState("");

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    setActiveTab(window.location.pathname);
    setActiveTabImg(window.location.pathname);
  });

  const handleRoutes = (_event, newValue) => {
    router.push(`/my_dashboard${routes[newValue]}`);
  };

  return (
    <Box ref={ref}>
      <CssBaseline />
      <BottomNavigation
        className="inner-navigation"
        showLabels
        value={slideIndex.toString()}
        onChange={(_event, newValue) => {
          handleRoutes(_event, newValue);
        }}
      >
        <BottomNavigationAction
          className={
            activeTab == "/my_dashboard/meal-plan"
              ? "dashboard-button round-btn active"
              : "dashboard-button round-btn"
          }
          value="0"
          label={dashSlideTitles[0]}
          icon={
            <span className="icon-box">
              <span className="icon-boxp-inner">
                <img
                  src={
                    activeTabImg == "/my_dashboard/meal-plan"
                      ? "../img/hot-soup-bowl-active.svg"
                      : "../img/hot-soup-bowl.svg"
                  }
                />
              </span>
            </span>
          }
        />
        <BottomNavigationAction
          className={
            activeTab == "/my_dashboard/recipe"
              ? "dashboard-button round-btn active"
              : "dashboard-button round-btn"
          }
          value="1"
          label={dashSlideTitles[1]}
          icon={
            <span className="icon-box">
              <span className="icon-boxp-inner">
                <img
                  src={
                    activeTabImg == "/my_dashboard/recipe"
                      ? "../img/recipe-book-active.svg"
                      : "../img/recipe-book.svg"
                  }
                />
              </span>
            </span>
          }
        />
        {/* <BottomNavigationAction
          className={activeTab == '/my_dashboard/journal'
            ? 'dashboard-button round-btn active'
            : 'dashboard-button round-btn'
          }
          value="2"
          label={dashSlideTitles[2]}
          icon={
            <span className='icon-box'>
              <span className='icon-boxp-inner'>
                <img src={activeTabImg == '/my_dashboard/journal'
                  ? '../img/journal-active.svg'
                  : '../img/journal.svg'}
                />
              </span>
            </span>
          }
        /> */}
        {/*
        <BottomNavigationAction
          className={activeTab == '/my_dashboard/shopping-list'
            ? 'round-btn active'
            : 'round-btn'
          }
          value="3"
          label={dashSlideTitles[3]}
          icon={
            <img src={activeTabImg == '/my_dashboard/shopping-list'
              ? '../img/cart-active.svg'
              : '../img/cart.svg'}
            />
          }
        />
        */}
      </BottomNavigation>
    </Box>
  );
}
