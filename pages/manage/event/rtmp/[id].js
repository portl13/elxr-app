import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import useSWR from "swr";
import { getEventByID } from "@request/dashboard";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import EventRtmpStream from "@components/dashboard/events/EventRtmpStream";

const url = `${process.env.apiV2}/channel-event/`;

function PageStreamRtmp({ data }) {
  const { user, auth } = useContext(UserContext);
  const [author, setAuthor] = useState(false);
  const token = user?.token;
  const { id } = data;

  const { data: event } = useSWR(
    token ? [`${url}${id}`, token] : null,
    getEventByID
  );

  useEffect(() => {
    if (event && event?.author) {
      setAuthor(event.author);
    }
  }, [event]);

  return (
    <MainLayout sidebar={<MainSidebar />} title={"Event Detail"}>
      <EventRtmpStream
        auth={auth}
        author={author}
        user={user}
        event_id={id}
        event={event}
      />
    </MainLayout>
  );
}

export default PageStreamRtmp;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { data: { id } },
  };
}
