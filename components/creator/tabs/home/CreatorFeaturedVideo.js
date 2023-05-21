import React, { useState } from "react";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";
import { Stream } from "@cloudflare/stream-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import PlayerYouTube from "react-player/youtube";
import PlayerVimeo from "react-player/vimeo";
import FollowButton from "@components/shared/button/FollowButton";
import SubscriptionButtonCreator from "@components/shared/button/SubscriptionButtonCreator";
import { clean } from "@utils/cleanHtml";
import CreatorSocialList from "@components/creator/CreatorSocialList";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const urlImage = process.env.SubdomainCloudflare;

function CreatorFeaturedVideo({ creator, about, user }) {
  const [open, setOpen] = useState(false);
  const formatAbout = `${about ? about?.slice(0, 200) : ""} `;
  const video = creator?.video_url;
  const time = creator?.size;

  return (
    <>
      <section className={"creator-header"}>
        <div className="container container-creator">
          <div className="row">
            {video ? (
              <div className="col-12 col-md-6">
                <>
                  {video && onlyLettersAndNumbers(video) && (
                    <div>
                      <Stream
                        controls
                        src={`${video}`}
                        height={"100%"}
                        width={"100%"}
                        responsive={false}
                        className={"ratio ratio-16x9"}
                        poster={`https://${urlImage}/${video}/thumbnails/thumbnail.jpg?time=${time}s`}
                      />
                    </div>
                  )}

                  {video &&
                    !video.includes("youtu") &&
                    !video.includes("vimeo") &&
                    !onlyLettersAndNumbers(video) && (
                      <div className="ratio ratio-16x9 pointer  cover-bg">
                        <span className="duration-video">
                          <FontAwesomeIcon
                            className="play-icon"
                            icon={faPlay}
                          />
                        </span>
                        <ReactPlayer
                          url={video}
                          width="100%"
                          height="100%"
                          controls={true}
                          muted={true}
                          config={{
                            file: {
                              attributes: {
                                controlsList: "nodownload", //<- this is the important bit
                              },
                            },
                          }}
                        />
                      </div>
                    )}

                  {video && video.includes("youtu") && (
                    <div className="ratio ratio-16x9 pointer">
                      <PlayerYouTube
                        width={"100%"}
                        height={"100%"}
                        url={video}
                        config={{
                          youtube: {
                            playerVars: {
                              controls: 1,
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

                  {video && video.includes("vimeo") && (
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
              </div>
            ) : null}

            {!video ? (
              <div className="col-12 col-md-6">
                <div
                  style={{
                    backgroundImage: `url(${creator?.vendor_banner})`,
                    borderRadius: 15,
                  }}
                  className={"ratio ratio-16x9 bg-gray cover-bg"}
                ></div>
              </div>
            ) : null}

            <div
              className={`col-md-6 mt-3 mt-md-0 d-flex flex-column align-items-center`}
            >
              <div
                style={{
                  backgroundImage: `url(${
                    creator?.vendor_shop_logo ? creator?.vendor_shop_logo : ""
                  })`,
                }}
                className="contain-channel-img big bg-gray position-relative cover-bg"
              ></div>
              <h2 className={"font-size-22 mt-2"}>
                {creator.vendor_shop_name}
              </h2>
              <div className="d-flex mb-4 mt-2">
                <div className="position-relative mr-3">
                  {creator && creator.vendor_id && (
                    <FollowButton
                      className={"btn btn-follow-button"}
                      user_id={creator.vendor_id}
                    />
                  )}
                </div>
                <div className="position-relative mr-3">
                  {creator && creator?.show_subscription ? (
                    <SubscriptionButtonCreator
                      user={user}
                      vendor_id={creator?.vendor_id}
                      subscription_id={creator?.subscription_id}
                      is_subscriber={creator?.is_subscribed}
                      is_following={creator?.is_following}
                      className={"btn btn-subscription-button"}
                    />
                  ) : null}
                </div>
                <div className="position-relative">
                  {creator?.link_donation ? (
                      <a href={creator?.link_donation} target={"_blank"} className={"btn btn-primary border-radius-35 text-capitalize"}>
                        Donate
                      </a>
                  ) : null}
                </div>
              </div>
              <div className="d-flex  align-items-center mb-2 ">
                {creator && <CreatorSocialList social={creator.social} />}
              </div>
              {about ? (
                <div>
                  {clean(formatAbout)}
                  <span
                    className="pointer text-primary"
                    onClick={() => setOpen(true)}
                  >
                    more...
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <Modal size={"lg"} isOpen={open} centered toggle={() => setOpen(!open)}>
        <ModalHeader>About</ModalHeader>
        <ModalBody>
          <div
            className={"text-font"}
            dangerouslySetInnerHTML={{ __html: about }}
          />
        </ModalBody>
      </Modal>
    </>
  );
}

export default CreatorFeaturedVideo;
