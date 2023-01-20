import Link from "next/link";
import React, {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {UserContext} from "@context/UserContext";
import {CommunityCardLivefeedStyle, reportModal} from "./livefeed.style";
import "react-multi-carousel/lib/styles.css";
import useIcon from "@hooks/useIcon";
import ReactPlayer from "react-player/lazy";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBan,
  faComment,
  faEdit,
  faEllipsisH,
  faFlag,
  faQuoteLeft,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {uploadModal} from "@components/livefeed/photo.style";
import CommentCard from "./CommentCard";
import EditPost from "./EditPost";
import {getProfileRoute, validateYouTubeUrl} from "@utils/constant";
import AddCommentCard from "./AddCommentCard";
import SharePost from "./SharePost";
import PhotoCollage from "./PhotoCollage";
import {stringToSlug} from "@lib/stringToSlug";
import {onlyLettersAndNumbers} from "@utils/onlyLettersAndNumbers";
import {formatDistanceToNow} from "date-fns";
import {utcToZonedTime} from "date-fns-tz";
import jstz from "jstz";

const typeActivity = {
  "new_blog_channel-videos": "video",
  new_blog_podcasts: "podcasts",
  new_blog_channel_events: "event",
  new_blog_blog: "blog",
  new_blog_album: "album",
};
const typeActivitySaved = {
  "new_blog_channel-videos": "video",
  new_blog_podcasts: "podcast",
  new_blog_channel_events: "event",
  new_blog_blog: "blog",
};

const renderNewContent = (activity, defaultContent) => {
  if (
    activity.type === "new_blog_channel-videos" ||
    activity.type === "new_blog_podcasts" ||
    activity.type === "new_blog_channel_events" ||
    activity.type === "new_blog_channel" ||
    activity.type === "new_blog_blog" ||
    activity.type === "new_blog_album"
  ) {
    return (
      <>
        {activity?.feature_media && (
          <Link
            href={`/${typeActivity[activity.type]}/${stringToSlug(
              activity?.secondary_item_title || "title"
            )}/${activity?.secondary_item_id}`}
          >
            <a>
              <div
                style={{
                  backgroundImage: `url(${activity?.feature_media})`,
                }}
                className="ratio ratio-16x9 bg-cover bg-gray"
              ></div>
            </a>
          </Link>
        )}

        {!activity?.feature_media && activity.type === "new_blog_channel-videos" &&
          activity.video &&
          onlyLettersAndNumbers(activity.video) && (
            <Link
              href={`/${typeActivity[activity.type]}/${stringToSlug(
                activity?.secondary_item_title || "title"
              )}/${activity?.secondary_item_id}`}
            >
              <a>
                <div
                  style={{
                    backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${activity.video}/thumbnails/thumbnail.jpg?time=${activity?.size || 1}s)`,
                  }}
                  className="ratio ratio-16x9 bg-gray bg-cover"
                ></div>
              </a>
            </Link>
          )}

        <h5 className="mt-4">
          <Link
            href={`/${typeActivity[activity.type]}/${stringToSlug(
              activity?.secondary_item_title || "title"
            )}/${activity?.secondary_item_id}`}
          >
            <a>{activity.secondary_item_title}</a>
          </Link>
        </h5>
        <p
          className="description-feed"
          dangerouslySetInnerHTML={{ __html: defaultContent }}
        />
      </>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: defaultContent }} />;
};

const postedData = (activity, date) => {
  const newDate = new Date(`${date}Z`);
  const timeZone = jstz.determine().name();
  const zonedDate = utcToZonedTime(newDate, timeZone);
  const posted = formatDistanceToNow(zonedDate, { addSuffix: true });

  if (activity.type === "new_blog_channel-videos") {
    return "posted a video " + posted;
  }
  if (activity.type === "new_blog_podcasts") {
    return "posted a podcasts " + posted;
  }
  if (activity.type === "new_blog_blog") {
    return "posted a blog " + posted;
  }
  if (activity.type === "new_blog_channel_events") {
    return "posted an event " + posted;
  }
  if (activity.type === "new_blog_channel") {
    return "posted a channel " + posted;
  }

  if (activity.type === "new_blog_album") {
    return "posted an album " + posted;
  }

  return (
    <>Posted {posted === "less than a minute" ? `${posted} ago` : posted}</>
  );
};

const LiveFeedCard = ({
  isComment,
  activity,
  showProfileGroup,
  parentCallback,
  activityList,
  setActivityList,
  isFeedWrapper,
  apiCall,
  isAuthor = false,
}) => {
  const {
    user_avatar: { thumb = "/img/user.png" },
    content: { rendered = null },
    name = "",
    date,
    bp_media_ids,
    comment_count,
    favorited,
    can_delete,
    can_comment,
    can_edit,
    can_report,
    id,
    reported,
    content_stripped,
    privacy,
    title,
    bp_videos,
    type,
    show_in_feed,
  } = activity;

  if (!show_in_feed) {
    return;
  }

  const { user } = useContext(UserContext);
  const [photoArray, setPhotoArray] = useState(bp_media_ids);
  const [commentCount, setCommentCount] = useState(comment_count);
  const [fav, setFav] = useState(favorited);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [modal, setModal] = useState(false);
  const [result, setResult] = useState([]);
  const { iconElement: report } = useIcon(faFlag);
  const { iconElement: quote } = useIcon(faQuoteLeft);
  const [reportData, setReportData] = useState(false);
  const [commentData, setCommentData] = useState(false);
  const [report_Id, setReport_Id] = useState("");
  const [reportId, setReportId] = useState(null);
  const [initial, setInitial] = useState("");
  const closeReport = () => setShowReport(false);
  const [note, setNote] = useState("");
  const [viewComment, setViewComment] = useState(false);
  const [commentResponse, setCommentResponse] = useState([]);
  const [activityContent, setActivityContent] = useState(content_stripped);
  const [updateContent, setUpdateContent] = useState("");
  const [selPost, setSelPost] = useState(null);
  const [group, setGroup] = useState(privacy);
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [moreOption, setMoreOption] = useState(false);
  const onDismiss = () => setVisible(false);
  const inputElement = useRef(null);
  const commentUrl = process.env.bossApi + `/activity/${id}/comment`;
  const url = process.env.bossApi + "/moderation/report";
  const [shareShow, setShareShow] = useState(false);
  const [groupData, setGroupData] = useState(true);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [viewComment]);
  function getReport() {
    axios(process.env.bossApi + "/moderation/report", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setResult(res.data.map((e) => e.options)[0]);
      setInitial(res.data.map((e) => e.options)[0].map((d) => d.value)[0]);
      setModal(true);
    });
  }
  function postReport() {
    axios
      .post(
        url,
        {
          item_id: id,
          item_type: "activity",
          report_category:
            reportId == null ? result.map((d) => d.value)[0] : reportId,
          ...(reportId === "other" ? { note: note } : null),
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setReportData(true);
      });
  }
  const onTrigger = () => {
    parentCallback(id);
  };
  function getComment() {
    setCommentResponse([]);
    axios
      .get(commentUrl, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setCommentData(true);
        setCommentResponse(res.data.comments);
      });
  }
  useEffect(() => {
    if (user && activity?.id && activity?.comment_count > 0 && apiCall) {
      getComment();
    }
  }, []);
  function createComment(childData, id) {
    axios
      .post(
        commentUrl,
        {
          content: childData,
          ...(id !== null ? { parent_id: id } : null),
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setCommentData(true);
        getComment();
        setCommentCount(commentCount + 1);
      });
  }
  const handleDelete = (childData, count) => {
    axios(process.env.bossApi + `/activity/${childData}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      getComment();
      if (count >= 1) {
        setCommentCount(commentCount - count - 1);
      } else {
        setCommentCount(commentCount - 1);
      }
    });
  };

  const handlePhotoDelete = (childData) => {
    const photo_Id = childData;
    axios(process.env.bossApi + `/media/${photo_Id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      console.log("res.data:", res.data);
      setPhotoArray(photoArray.filter((item) => item.id !== photo_Id));
    });
  };
  function moveImage(photoData) {
    setPhotoArray(photoArray.filter((item) => item.id !== photoData.id));
  }
  function handleDescription(content, photoId, groupStatus) {
    setGroupData(groupStatus);
    axios
      .patch(
        process.env.bossApi + `/media/${photoId}`,
        {
          id: photoId,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        let index = photoArray.findIndex((item) => item.id === photoId);
        photoArray[index].description = content;
        setPhotoArray(photoArray);
        setGroupData(true);
      });
  }
  function likeAction(childData, groupStatus) {
    setGroupData(groupStatus);
    axios(process.env.bossApi + `/activity/${childData}/favorite`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setGroupData(true);
    });
  }
  function getLink() {
    const content = rendered.replace("</p>", "");
    let urlRegex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    return content.match(urlRegex) === null ? "" : content.match(urlRegex)[0];
  }

  return (
    <div css={CommunityCardLivefeedStyle}>
      <div className="activity-header d-flex mb-2">
        <div className="dots-section">
          <FontAwesomeIcon
            icon={faEllipsisH}
            onClick={() =>
              moreOption ? setMoreOption(false) : setMoreOption(true)
            }
          />
          <div className="tooltip-panel">More Options</div>
          {moreOption && (
            <div className="more-action-list">
              {((can_delete && !isComment) || isAuthor) && (
                <div className="inner-tag">
                  <div className="main-tag">
                    <div className="item-link" onClick={() => setShow(true)}>
                      <FontAwesomeIcon icon={faTrash} />
                      Delete
                    </div>
                  </div>
                </div>
              )}
              {(can_edit === true ||
                (isAuthor && type === "activity_update")) && (
                <div className="inner-tag">
                  <div className="main-tag">
                    <div
                      className="item-link"
                      onClick={() => {
                        setShowEdit(true);
                        setSelPost(activity);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      Edit
                    </div>
                  </div>
                </div>
              )}
              {!can_delete && !can_edit && isAuthor === false && (
                <div className="inner-tag">
                  <div className="main-tag">
                    <div
                      className="item-link"
                      onClick={() => {
                        getReport();
                        setShowReport(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faBan} />
                      Report
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="item-avatar">
          <img className="avatar" src={thumb} />
        </div>
        <div className="activity-header-text">
          <div className="meta-title">
            <Link
              className="mr-1"
              href={getProfileRoute(
                name,
                activity.user_id,
                "timeline",
                "personal"
              )}
            >
              {name}
            </Link>
            {/* {activity.secondary_item_id == 0 ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: sanitizeByType(activity),
                }}
              />
            ) : (
              <Link
                className="mr-1"
                href={getProfileRoute(
                  userName,
                  activity.secondary_item_id,
                  'timeline',
                  'personal'
                )}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: sanitizeByType(activity),
                  }}
                />
              </Link>
            )} */}
          </div>
          <div className="meta-date">{postedData(activity, date)}</div>
        </div>
      </div>
      <div className="activity-content">
        <div className="activity-inner">
          {updateContent === "" ? (
            rendered.toString().includes("blockquote") === true ? (
              <div className="activity-post-container">
                <div>
                  {quote}
                  <div dangerouslySetInnerHTML={{ __html: rendered }} />
                </div>
              </div>
            ) : (
              <>{renderNewContent(activity, rendered)}</>
            )
          ) : (
            updateContent
          )}
          {getLink() && validateYouTubeUrl(getLink()) && (
            <div className="ratio ratio-16x9">
              <ReactPlayer
                url={getLink()}
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
        </div>
        <div className="multi-video-section">
          {bp_videos ? (
            <>
              {bp_videos.map((ved) => (
                <ReactPlayer
                  key={`${ved.id}-${ved.attachment_id}`}
                  url={ved.url}
                  controls={true}
                  className="ratio ratio-16x9"
                  width={"100%"}
                  height={"100%"}
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload", //<- this is the important bit
                      },
                    },
                  }}
                />
              ))}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="multi-photos-section">
          {bp_media_ids &&
            photoArray.map((media, index) => (
              <React.Fragment key={media.id}>
                {index < 5 && (
                  <PhotoCollage
                    index={index}
                    bp_media_ids={photoArray}
                    media={media}
                    name={name}
                    user={user}
                    photoId={media.id}
                    parentCallback={handlePhotoDelete}
                    parentImageData={moveImage}
                    parentGroupData={groupData}
                    parentDescription={handleDescription}
                    likeAction={likeAction}
                  />
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
      <div className="profile-count-ui">
        {fav && (
          <>
            <span className="like-profile-panel">You like this </span>
            <em></em>
          </>
        )}
        {commentCount === 0 ? null : (
          <>
            <span className="like-profile-panel">
              {commentCount} {commentCount === 1 ? "Comment" : "Comments"}{" "}
            </span>
          </>
        )}
      </div>
      <div className="activity-buttons-action">
        {/*<LikeButton*/}
        {/*  id={id}*/}
        {/*  favorite_count={favorite_count}*/}
        {/*  favorited={fav}*/}
        {/*  setFav={setFav}*/}
        {/*/>*/}
        {/*<span>{favorite_count}</span>*/}
        {/*<span> Like</span>*/}
        {can_comment && (
          <>
            <button
              type="button"
              className="btn-icon btn-3 btn pl-1 pr-1"
              onClick={() => setViewComment(true)}
            >
              <i>
                <FontAwesomeIcon icon={faComment} className="icon-2rem" />
              </i>
            </button>
            <span> {commentCount} </span>
            <span> Comment </span>
          </>
        )}
        {/*{can_report === true && reported === false && reportData === false ? (*/}
        {/*  <button*/}
        {/*    type="button"*/}
        {/*    className="btn-icon btn-3 btn pl-1 pr-1"*/}
        {/*    onClick={() => {*/}
        {/*      getReport();*/}
        {/*      setShowReport(true);*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <span className="btn-inner--icon">{report}</span>*/}
        {/*    <span className="btn-inner--text">Report </span>*/}
        {/*  </button>*/}
        {/*) : null}*/}
        {can_report === true && reported === true && reportData === false ? (
          <div className="btn-icon btn-3 btn pl-1 pr-1 hover-none">
            <span className="btn-inner--icon">{report}</span>
            <span className="btn-inner--text"> Reported</span>
          </div>
        ) : null}
        {reportData === true ? (
          <div className="btn-icon btn-3 btn pl-1 pr-1 hover-none">
            <span className="btn-inner--icon">{report}</span>
            <span className="btn-inner--text"> Reported</span>
          </div>
        ) : null}
        <div className="btn p-1" onClick={() => setShareShow(!shareShow)}>
          <i>
            <FontAwesomeIcon icon={faShare} className="icon-2rem " />
          </i>
          <span className="color-font">Share</span>
        </div>
        <Modal
          className="modal-dialog-centered modal-sm"
          isOpen={show}
          css={uploadModal}
        >
          <ModalBody className="text-center">
            <p className="mb-4">Are you sure you want to Delete this post?</p>
            <Button
              color="secondary-text"
              onClick={() => {
                setShow(false);
                setMoreOption(false);
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                onTrigger();
                setShow(false);
              }}
            >
              Yes, Delete
            </Button>
          </ModalBody>
        </Modal>
        {showEdit && selPost && (
          <EditPost
            visible={visible}
            onDismiss={onDismiss}
            setShowEdit={setShowEdit}
            uploadModal={uploadModal}
            showEdit={showEdit}
            setGroup={setGroup}
            group={group}
            user={user}
            setUpdateContent={setUpdateContent}
            activity={selPost}
            setActivityContent={setActivityContent}
            result={result}
            setResult={setResult}
            activityList={activityList}
            setActivityList={setActivityList}
            isFeedWrapper={isFeedWrapper}
            showProfileGroup={showProfileGroup}
            setMoreOption={setMoreOption}
          />
        )}
        {modal && (
          <Modal
            className="modal-dialog-centered"
            isOpen={showReport}
            css={reportModal}
          >
            <ModalHeader>Report Content</ModalHeader>
            <ModalBody>
              {result &&
                result.map((d, i) => {
                  return (
                    <div className="custom-control custom-radio mb-3">
                      <input
                        className="custom-control-input"
                        type="radio"
                        id={"report" + i}
                        name={"report" + i}
                        value={d.value}
                        checked={
                          d.value == (report_Id == "" ? initial : report_Id)
                        }
                        onChange={(e) => {
                          setReport_Id(d.value);
                          setReportId(d.value);
                          setNote("");
                        }}
                      />
                      <label
                        className="custom-control-label"
                        for={"report" + i}
                      >
                        <span>{d.name}</span>
                      </label>
                      <span>{d.description}</span>
                    </div>
                  );
                })}
              {report_Id == "other" ? (
                <div className="form-item">
                  <label>
                    <textarea
                      id="note"
                      type="text"
                      name="note"
                      className="bp-other-report-cat"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      required
                    />
                    {note == "" ? (
                      <span>*Report Content is required</span>
                    ) : null}
                  </label>
                </div>
              ) : null}
            </ModalBody>
            <ModalFooter className="py-3">
              <Button
                color="secondary-text"
                onClick={() => {
                  closeReport();
                  setReport_Id("");
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  reportId === "other"
                    ? note === ""
                      ? null
                      : postReport()
                    : postReport();
                  reportId === "other"
                    ? note === ""
                      ? null
                      : setShowReport(false)
                    : setShowReport(false);
                }}
              >
                Report
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
      {shareShow && <SharePost cardId={id} title={title} rendered={rendered} />}
      {commentData &&
        commentResponse &&
        commentResponse.map((comments) => (
          <CommentCard
            comment={comments.content_stripped}
            reply={comments.can_comment}
            deleteComment={comments.can_delete}
            report={comments.can_report}
            avtar={comments.user_avatar.thumb}
            id={comments.id}
            key={comments.id}
            name={comments.name}
            date={comments.date}
            reported={comments.reported}
            parentCallback={handleDelete}
            replyCount={comments.comment_count}
            commentRpl={comments.comment_count >= 1 ? comments.comments : null}
            activityId={comments.primary_item_id}
            getComment={getComment}
            setCommentCount={setCommentCount}
            commentCount={commentCount}
            parentCreate={createComment}
            viewComment={viewComment}
            setViewComment={setViewComment}
            userId={comments.user_id}
          />
        ))}
      <div
        className={viewComment === false ? "d-none" : "activity-comments-panel"}
      >
        <AddCommentCard
          user={user}
          viewComment={viewComment}
          setViewComment={setViewComment}
          parentCreate={createComment}
        />
      </div>
    </div>
  );
};
export default LiveFeedCard;
