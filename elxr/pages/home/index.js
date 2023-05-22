import React, { useContext, useEffect } from "react"
import { css } from "@emotion/core"

import NotificationsWidget from "@/elxr/components/widgets/Notifications"
import LiveWidget from "@/elxr/components/widgets/Live"
import RecentUploadsWidget from "@/elxr/components/widgets/RecentUploads"
import TodaysAppointments from "@/elxr/components/widgets/TodaysAppointments"
import UpcomingEvents from "@/elxr/components/widgets/UpcomingEvents"

import { Layout, Section } from "./styles"
import MainLayout from "@components/main/MainLayout"
import { homeStylesCSS } from "@/elxr/theme/styleOverrides/homeStyles"
import { UserContext } from "@context/UserContext"
import Subscriptions from "@/elxr/components/widgets/Subscriptions"
import Followings from "@/elxr/components/widgets/Followings"
import Courses from "@/elxr/components/widgets/Courses"
import Card from "@/elxr/components/bits/Card"
const homeStyles = css`
  ${homeStylesCSS}
`

function Homepage() {
  const { user } = useContext(UserContext)
  const token = user?.token
  return (
    <MainLayout classNameContainer={"home"} title={"Elxr"}>
      <div className={"Journal"} css={homeStyles}>
        <Layout>
          <Section area="hi">
            <Card>
              <h5>Hi {user?.name},</h5>
              <p className={"font-size-16"}>
                Welcome to your Elxr Dashboard, your go-to destination to stay
                updated on your latest discoveries and upcoming activities.
                Start browsing and see what Elxr has to offer you today.
              </p>
            </Card>
          </Section>
          <Section area="recent">
            <RecentUploadsWidget />
          </Section>

          <Section area="activity">
            <LiveWidget />
          </Section>

          <Section area="subscription">
            <Subscriptions token={token} />
          </Section>

          <Section area="following">
            <Followings token={token} user={user} />
          </Section>

          <Section area="notifications">
            <NotificationsWidget />
          </Section>

          <Section area="courses">
            <Courses token={token} user={user} />
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
  )
}

export default Homepage
