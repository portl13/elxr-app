import React from "react";
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
  List,
  Appointment,
  Description,
  Duration,
  NoResults,
} from "./styles";

const TodaysAppointments = () => {
  const { data: appointments = [], isValidating: loading } = useAppointments();

  const todaysAppointments = React.useMemo(() => {
    return appointments.filter(({ start }) =>
      moment(start).isSame(new Date(), "day")
    );
  }, [appointments]);

  return (
    <Card css={cardCSS}>
      <HeaderSection>
        <Header
          sub={todaysAppointments.length}
          accentInfo={moment().format("MMMM Do, YYYY")}
        >
          Today&apos;s Appointments
        </Header>

        <ViewAllLink href="/calendar-menu/appointments-list" />
      </HeaderSection>

      {loading && <SpinnerLoader />}

      {!loading && !todaysAppointments.length && (
        <NoResults>No appointments set for today.</NoResults>
      )}

      {!loading && !!todaysAppointments.length && (
        <List>
          {todaysAppointments.map((appointment) => {
            const [{ link: href } = {}] = appointment.meet_link;

            const {
              id,
              product_title: product,
              customer_name: customer,
              start_time: start,
              end_time: end,
            } = appointment;

            const appointmentTitle = `${customer} with ${product}`;

            return (
              <Appointment key={id}>
                {href && (
                  <TextLink href={href} target="_blank">
                    <Description>{appointmentTitle}</Description>
                  </TextLink>
                )}

                {!href && <Description>{appointmentTitle}</Description>}

                <Duration>
                  {start} to {end}
                </Duration>
              </Appointment>
            );
          })}
        </List>
      )}
    </Card>
  );
};

export default TodaysAppointments;
