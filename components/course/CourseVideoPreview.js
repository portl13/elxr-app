import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody } from "reactstrap";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";
import PlayerYouTube from "react-player/youtube";
import PlayerVimeo from "react-player/vimeo";
import ReactPlayer from 'react-player'
import { Stream } from "@cloudflare/stream-react";

function CourseVideoPreview({ course }) {
  const [open, setOpen] = useState(false);

  if (!course) {
    return (
      <div className="ratio ratio-16x9 bg-default bg-course-detail-url"></div>
    );
  }

  const openModal = () => {
    if (!course.course_video) return;
    setOpen(!open);
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${course.course_img})`,
        }}
        onClick={openModal}
        className="ratio ratio-16x9 bg-default bg-course-detail-url"
      >
        {course.course_video && (
          <div className={"play-icon-video center-absolute"}>
            <FontAwesomeIcon icon={faPlay} />
          </div>
        )}
      </div>
      <Modal
        size={"lg"}
        isOpen={open}
        toggle={() => setOpen(!open)}
        centered={true}
      >
        <ModalBody>
          {course.course_video && onlyLettersAndNumbers(course.course_video) && (
            <div>
              <Stream
                controls
                src={course.course_video}
                height={"100%"}
                width={"100%"}
                responsive={false}
                className={"ratio ratio-16x9"}
              />
            </div>
          )}

          {course.course_video && course.course_video.includes("youtu") && (
            <div className="ratio ratio-16x9 border-radius-17 pointer">
              <PlayerYouTube
                width={"100%"}
                height={"100%"}
                url={course.course_video}
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

          {course.course_video && course.course_video.includes("vimeo") && (
            <div className="ratio ratio-16x9 border-radius-17 pointer">
              <PlayerVimeo
                width={"100%"}
                height={"100%"}
                url={course.course_video}
                config={{
                  vimeo: {
                    playerOptions: {
                      title: 0,
                      controls: false,
                      muted: true,
                    },
                  },
                }}
              />
            </div>
          )}
          {course.course_video &&
            !course.course_video.includes("youtu") &&
            !course.course_video.includes("vimeo") &&
            !onlyLettersAndNumbers(course.course_video) && (
              <div className="ratio ratio-16x9 border-radius-17 pointer">
                <ReactPlayer
                  width={"100%"}
                  height={"100%"}
                  url={course.course_video}
                />
              </div>
            )}
        </ModalBody>
      </Modal>
    </>
  );
}

export default CourseVideoPreview;
