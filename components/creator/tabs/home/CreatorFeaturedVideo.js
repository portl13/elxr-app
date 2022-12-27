import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";
import { Stream } from "@cloudflare/stream-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import PlayerYouTube from "react-player/youtube";
import PlayerVimeo from "react-player/vimeo";

const urlImage = process.env.SubdomainCloudflare;

function CreatorFeaturedVideo({ creator, about, setTab }) {
  const formatAbout = `${about ? about?.slice(0, 200) : ""} ...`;
  const [openModal, setOpenModal] = useState(false);
  const video = creator?.video_url;
  const time = creator?.size;
  return (
    <>
      <div className="d-flex row mt-5">
        <div className="col-6">
          <h4 className="section-main-title mb-4 font-weight-bold">
            Featured Video
          </h4>
          <div className="section-main">
            <div
              onClick={() => setOpenModal(!openModal)}
              className="card-general pointer"
            >
              <div
                style={{
                  backgroundImage: `url(${creator?.thumbnail})`,
                }}
                className="ratio ratio-16x9 bg-gray border-radius-17 cover-bg"
              ></div>
            </div>
          </div>
        </div>

        <div className="col-6">
          <h4 className="section-main-title mb-4 font-weight-bold">About</h4>
          {about && (
            <>
              <div dangerouslySetInnerHTML={{ __html: formatAbout }} />
              <span
                className="pointer text-primary"
                onClick={() => setTab("about")}
              >
                more
              </span>
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={openModal}
        toggle={() => setOpenModal(!openModal)}
        centered
        size="lg"
      >
        <ModalBody className="p-0  overflow-hidden">
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

            {!video && (
              <div className="ratio ratio-16x9 pointer">
                <span className="duration-video">
                  <FontAwesomeIcon className="play-icon" icon={faPlay} />
                </span>
              </div>
            )}

            {video &&
              !video.includes("youtu") &&
              !video.includes("vimeo") &&
              !onlyLettersAndNumbers(video) && (
                <div className="ratio ratio-16x9 pointer  cover-bg">
                  <span className="duration-video">
                    <FontAwesomeIcon className="play-icon" icon={faPlay} />
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
        </ModalBody>
      </Modal>
    </>
  );
}

export default CreatorFeaturedVideo;
