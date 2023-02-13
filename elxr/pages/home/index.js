import React from "react";
import { css } from "@emotion/core";

import NotificationsWidget from "@/elxr/components/widgets/Notifications";
import LiveWidget from "@/elxr/components/widgets/Live";
import RecentUploadsWidget from "@/elxr/components/widgets/RecentUploads";
import RecipesWidget from "@/elxr/components/widgets/Recipes";
import QuoteOfTheDayWidget from "@/elxr/components/widgets/QuoteOfTheDay";
import TodaysAppointments from "@/elxr/components/widgets/TodaysAppointments";
import OverviewWidget from "@/elxr/components/widgets/Overview";
import RecentDiscussions from "@/elxr/components/widgets/RecentDiscussions";
import UpcomingEvents from "@/elxr/components/widgets/UpcomingEvents";
import FoodLog from "@/elxr/components/widgets/FoodLog";

import { Layout, Section } from "./styles";
import MainLayout from "@components/main/MainLayout";
import { homeStylesCSS } from "@/elxr/theme/styleOverrides/homeStyles";
const homeStyles = css`
  ${homeStylesCSS}
`;

function Homepage() {
  return (
    <MainLayout classNameContainer={"home"} title={"Elxr"}>
      <div css={homeStyles}>
        <Layout>
          <Section area="1">
            <OverviewWidget />
          </Section>

          <Section area="2">
            <FoodLog />
          </Section>

          <Section area="3">
            <TodaysAppointments />
          </Section>

          <Section
            area="4"
            css={css`
              position: initial;
              height: initial;
              top: initial;
              right: initial;

              @media (min-width: 768px) {
                height: calc(100vh - 115px);
                position: sticky;
                right: 0;
                top: 16px;
              }
            `}
          >
            {/* TODO Move this code into a component that represents this section */}
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 8px;
                height: 100%;

                @media (min-width: 768px) {
                  gap: 20px;
                }
              `}
            >
              <LiveWidget />
              <RecipesWidget />
            </div>
          </Section>

          <Section area="5">
            <UpcomingEvents />
          </Section>

          <Section area="6">
            <NotificationsWidget />
          </Section>

          <Section area="7">
            <RecentUploadsWidget />
          </Section>

          <Section area="8">
            <RecentDiscussions />
          </Section>

          <Section area="9">
            <QuoteOfTheDayWidget />
          </Section>
        </Layout>
      </div>
    </MainLayout>
  );
}

export default Homepage;
