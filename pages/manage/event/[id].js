import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@components/main/MainLayout";
import { UserContext } from "@context/UserContext";
import useSWR from "swr";
import { getEventByID } from "@request/dashboard";
import ChatEvent from "@components/eventChat/component/ChatEvent";
import PlayerYouTube from "react-player/youtube";
import PlayerVimeo from "react-player/vimeo";
import { convertToUTC, getFormatedDateFromDate } from "@utils/dateFromat";
const url = `${process.env.apiV2}/channel-event/`;

const VideoParty = ({ video }) => {
  return (
    <>
      {video.includes("youtu") && (
        <div className="ratio ratio-16x9 pointer">
          <PlayerYouTube
            width={"100%"}
            height={"100%"}
            url={video}
            config={{
              youtube: {
                playerVars: {
                  controls: 0,
                  showinfo: 0,
                  fs: 0,
                  disablekb: 1,
                  rel: 0,
                  modestbranding: 1,
                },
              },
            }}
          />
        </div>
      )}

      {video.includes("vimeo") && (
        <div className="ratio ratio-16x9 pointer">
          <PlayerVimeo
            width={"100%"}
            height={"100%"}
            url={video}
            config={{
              vimeo: {
                playerOptions: {
                  title: 1,
                  controls: 1,
                  showinfo: 1,
                  autoplay: false,
                  muted: true,
                },
              },
            }}
          />
        </div>
      )}
    </>
  );
};

function EventDetailPage({ id }) {
  const { user, auth } = useContext(UserContext);
  const [author, setAuthor] = useState(false);
  const token = user?.token;

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
    <MainLayout disappear={true} title={"Event Detail"}>
      <div className="row mx-0">
        <div className="col-12 col-xl-8">
          <div className="card-general no-border">

            {event && event?.type_stream === "third-party" && (
              <VideoParty video={event?.third_party_url} />
            )}

            {event && event?.type_stream === "conference" && (
                <div
                    style={{
                      backgroundImage: `url(${event?.thumbnail})`,
                    }}
                    className="ratio ratio-16x9 bg-cover border-radius-17"
                ></div>
            )}
            <div className="mt-4 px-0 px-md-2">
              <div className="d-flex">
                <div className="d-none d-md-flex flex-column">
                  <span>Scheduled for</span>
                  <span className="d-block mb-2">
                    {event?.date_time &&
                      getFormatedDateFromDate(
                        convertToUTC(event?.date_time),
                        "MMMM dd, yyyy h:mm aaa"
                      )}
                  </span>
                </div>
                <div className={"ml-3"}>
                  {event && event?.type_stream === "conference" && event?.meet_owner_link && (
                    <a className={"btn btn-primary"} href={event?.meet_owner_link} target={"_blank"}>
                      Join Meeting
                    </a>
                  )}
                </div>
              </div>

              <h4 className="font-weight-bold title-responsive color-font">
                {event?.title}
              </h4>

              {event ? (
                  <p
                      className="m-0"
                      dangerouslySetInnerHTML={{
                        __html: event?.description,
                      }}
                  />
              ) : null}

            </div>
          </div>
        </div>
        <div className="col-12 col-xl-4 col-chat">
          {author && (
            <ChatEvent auth={auth} user={user} owner={author} vendor_id={id} />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default EventDetailPage;
export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { id },
  };
}
