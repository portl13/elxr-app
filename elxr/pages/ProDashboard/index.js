import React from "react";
import * as S from "./styles";
import Navigation from "./Navigation";
import NotificationsWidget from "@/elxr/components/widgets/Notifications";
import TipsWidget from "@/elxr/components/widgets/Tips";
import LiveWidget from "@/elxr/components/widgets/Live";
import TodaysAppointments from "@/elxr/components/widgets/TodaysAppointments";
import UpcomingEvents from "@/elxr/components/widgets/UpcomingEvents";
import UnreadMessages from "@/elxr/components/widgets/UnreadMessages";

const ProDashboardPage = () => {
  return (
    <S.ProDashboardContainer>
      <Navigation />
      <S.Layout>
        <S.Section area="1">
          <S.AnalyticsPlaceholder />
        </S.Section>
        <S.Section area="2">
          <TodaysAppointments />
        </S.Section>
        <S.Section area="3">
          <UpcomingEvents />
        </S.Section>
        <S.Section area="4" css={S.feedSectionCSS}>
          <LiveWidget />
          <S.RecipesWidgetContainer>
            <TipsWidget />
          </S.RecipesWidgetContainer>
        </S.Section>
        <S.Section area="5">
          <UnreadMessages />
        </S.Section>
        <S.Section area="6">
          <NotificationsWidget />
        </S.Section>
        <S.Section area="7"></S.Section>
      </S.Layout>
    </S.ProDashboardContainer>
  );
};

export default ProDashboardPage;
