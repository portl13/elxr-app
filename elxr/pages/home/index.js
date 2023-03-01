import React, { useContext, useEffect } from "react";
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

import { Layout, Section } from "./styles";
import MainLayout from "@components/main/MainLayout";
import { homeStylesCSS } from "@/elxr/theme/styleOverrides/homeStyles";
import { UserContext } from "@context/UserContext";
import Subscriptions from "@/elxr/components/widgets/Subscriptions";
import Followings from "@/elxr/components/widgets/Followings";
import Courses from "@/elxr/components/widgets/Courses";
import { useAppSelector } from "@store/store";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/CommonConstants";
import { useDispatch } from "react-redux";
import { setDaysAgoIndex } from "@store/features/journal/journal-slice";
import { FoodLog } from "@components/suggestics/dashboard/journal/food-log/FoodLog";
import { WaterLog } from "@components/suggestics/dashboard/journal/water-log/WaterLog";
import WeightLog from "@components/suggestics/dashboard/journal/weight-log/WeightLog";
import { DaySelector } from "@components/suggestics/dashboard/journal/day-selector/DaySelector";
import { ProgressChartNew } from "@components/suggestics/dashboard/journal/progress-chart-new/ProgressChartNew";
import Card from "@/elxr/components/bits/Card";
import {WeeklyJournalData} from "@components/suggestics/dashboard/journal/weekly-journal-data/WeeklyJournalData";
import Meal from "@/elxr/components/widgets/Meal";
const homeStyles = css`
  ${homeStylesCSS}
`;

function Homepage() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const daysAgoIndex = useAppSelector((state) => state.journal.daysAgoIndex);

  const today = dayjs();
  const date = today.subtract(daysAgoIndex, "day");
  const dateString = date.format(DATE_FORMAT);
  const startWeekString = date.subtract(6, "day").format(DATE_FORMAT);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDaysAgoIndex(0));
  }, []);

  return (
    <MainLayout classNameContainer={"home"} title={"Elxr"}>
      <div className={"Journal"} css={homeStyles}>
        <Layout>
          <Section area="hi">
            <Card >
              <h5>
                Hi {user?.name},
              </h5>
              <p className={"font-size-16"}>
                Welcome to your Elxr Dashboard, your go-to destination to stay updated on your latest discoveries and upcoming activities. Start browsing and see what Elxr has to offer you today.
              </p>
            </Card>
          </Section>

          <Section area="meal-recipes">
            <Meal />
          </Section>

          <Section area="recent">
            <RecentUploadsWidget />
          </Section>

          <Section area="activity">
            <LiveWidget />
          </Section>

          <Section area="subscription">
            {token ? <Subscriptions token={token} /> : null}
          </Section>

          <Section area="following">
            {token ? <Followings token={token} user={user} /> : null}
          </Section>

          <Section area="notifications">
            <NotificationsWidget />
          </Section>

          <Section area="calendar">
            <WeeklyJournalData start={startWeekString} end={dateString} />
            <Card className={"dateActivity d-none d-lg-block"}>
              <DaySelector />
              <ProgressChartNew />
            </Card>
          </Section>

          <Section className={"logRow"} area="food-log">
            <FoodLog dateString={dateString} />
          </Section>

          <Section area="drink-water" className="logRow">
            <WaterLog dateString={dateString} />
          </Section>

          <Section area="current-weight" className="logRow">
            <WeightLog dateString={dateString} />
          </Section>

          <Section area="courses">
            {token ? <Courses token={token} user={user} /> : null}
          </Section>

          <Section area="appointments">
            <TodaysAppointments />
          </Section>

          <Section area="events">
            <UpcomingEvents />
          </Section>
        </Layout>
      </div>
    </MainLayout>
  );
}

export default Homepage;
