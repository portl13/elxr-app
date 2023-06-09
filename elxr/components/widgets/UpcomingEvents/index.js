import React, { useContext } from "react";
import moment from "moment";

import SpinnerLoader from "@/components/shared/loader/SpinnerLoader";

import Card from "@/elxr/components/bits/Card";
import ViewAllLink from "@/elxr/components/bits/buttons/ViewAllLink";
import TextLink from "@/elxr/components/bits/text/TextLink";

import { useAppointments } from "@/elxr/hooks/api/appointments";

import {
  cardCSS,
  Header,
  HeaderSection,
  UpcomingEvent,
  Duration,
  NoResults,
  List,
  Title,
  Description,
} from "./styles";
import useSWR from "swr";
import { UserContext } from "@context/UserContext";
import { genericFetch } from "@request/creator";
import CalendarIcon from "@icons/CalendarIcon";
import { convertToUTC, getFormat } from "@utils/dateFromat";
import {stringToSlug} from "@lib/stringToSlug";

const eventlUrl = `${process.env.apiV2}/channel-event?all=true&single=true&date_filter=upcoming`;

const UpcomingEvents = () => {
  // const { user } = useContext(UserContext);
  const { data: events = [], isLoading: loading } = useSWR(
    eventlUrl,
    genericFetch
  );

  return (
    <Card css={cardCSS}>
      <HeaderSection>
        <Header sub={events.length}>Upcoming Events</Header>

        {/*<ViewAllLink href="/calendar-menu/view-appointment" />*/}
      </HeaderSection>

      {loading && <SpinnerLoader />}

      {!loading && !Boolean(events.length) && (
        <NoResults>No upcoming events.</NoResults>
      )}

      {!loading && Boolean(events.length) && (
        <List>
          {events.map((event) => {
            return (
              <UpcomingEvent key={event.id}>
                <div>
                  <div
                    style={{
                      backgroundImage: `url(${event.thumbnail})`,
                      height: 50,
                      width: 50,
                      borderRadius: "50%",
                    }}
                    className={"bg-cover"}
                  />
                </div>
                <div>
                  <TextLink href={`/event/${stringToSlug(event?.title || '/')}/${event?.id}`}>
                    <Title>{event.title}</Title>
                  </TextLink>
                  <Description
                    dangerouslySetInnerHTML={{ __html: event?.description }}
                  />
                  <Duration>
                    <CalendarIcon width="20px" height="20px" />
                    {getFormat(
                      convertToUTC(event.date_time),
                      "LLL dd, h:mm aaa"
                    )}
                  </Duration>
                </div>
              </UpcomingEvent>
            );
          })}
        </List>
      )}
    </Card>
  );
};

export default UpcomingEvents;
