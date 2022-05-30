import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import { Button } from "reactstrap";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { uploadModal } from "../../components/livefeed/photo.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReportComment from "./ReportComment";
import AddCommentCard from "./AddCommentCard";
import CommentRplL5Card from "./CommentRplL5Card";
import DeleteModal from "./DeleteModal";
import Link from "next/link";
import { getProfileRoute } from "../../utils/constant";
function CommentRplL4Card({
  comment,
  reply,
  deleteComment,
  report,
  avtar,
  id,
  parentCallback,
  name,
  date,
  reported,
  replyCount,
  commentRpl,
  activityId,
  getComment,
  setCommentCount,
  commentCount,
  parentCreate,
  viewComment,
  setViewComment,
  userId,
}) {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [modal, setModal] = useState(false);
  const [result, setResult] = useState([]);
  const [reportData, setReportData] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const [initial, setInitial] = useState("");
  const [viewComment1, setViewComment1] = useState(false);
  const [rplResult, setRplResult] = useState(commentRpl);
  const [comments, setAllComments] = useState([]);
  const url = process.env.bossApi + "/moderation/report";
  const count = replyCount;
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
  const onTrigger = () => {
    parentCallback(id, count);
  };
  const loadChildComments = (parent) => {
    let res = [],
      comnt = [];
    for (let k = 0; k < parent.length; k++) {
      comnt.push(parent[k]);
      if (parent[k].comment_count) {
        res = [...res, ...parent[k].comments];
      }
    }
    setAllComments((data) => [...data, ...comnt]);
    if (res.length) loadChildComments(res);
    else return false;
  };
  useEffect(() => {
    if (rplResult) {
      for (let k = 0; k < rplResult.length; k++) {
        setAllComments((data) => [...data, rplResult[k]]);
        if (rplResult[k].comment_count)
          loadChildComments(rplResult[k].comments);
      }
    }
  }, [rplResult]);
  return (
    <>
      <div className="activity-comments-container live-activity-container pleft105">
        <div className="main-comment-box">
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
                {deleteComment && (
                  <div className="inner-tag">
                    <div className="main-tag">
                      <div className="item-link" onClick={() => setShow(true)}>
                        <FontAwesomeIcon icon={faTrash} />
                        Delete
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="ac-reply-avatar">
            <img className="avatar" src={avtar} />
          </div>
          <div className="ac-comment-meta-section">
            <div className="author-name">
              <Link
                className="mr-1"
                href={getProfileRoute(name, userId, "timeline", "personal")}
              >
                {name}
              </Link>
              <span>
                <a href="">{moment(date).fromNow()}</a>
              </span>
            </div>
            <div className="comment-content">{comment}</div>
            <div className="reply-content">
              {reply && (
                <Button onClick={() => setViewComment1(true)}>Reply</Button>
              )}
              {report === true && reported === false && reportData === false ? (
                <Button
                  onClick={() => {
                    getReport();
                    setShowReport(true);
                  }}
                >
                  Report
                </Button>
              ) : null}
              {report === true && reported === true && reportData === false ? (
                <span> Reported</span>
              ) : null}
              {reportData === true ? <span> Reported</span> : null}
            </div>
          </div>
        </div>
      </div>
      {show && (
        <DeleteModal
          show={show}
          uploadModal={uploadModal}
          setShow={setShow}
          parentTrigger={onTrigger}
          setMoreOption={setMoreOption}
        />
      )}
      {modal && (
        <ReportComment
          user={user}
          result={result}
          initial={initial}
          showReport={showReport}
          setShowReport={setShowReport}
          id={id}
          url={url}
          reportData={reportData}
          setReportData={setReportData}
        />
      )}
      {viewComment1 && (
        <div className="pleft125">
          <AddCommentCard
            user={user}
            viewComment={viewComment1}
            setViewComment={setViewComment1}
            parentCreate={parentCreate}
            id={id}
          />
        </div>
      )}
      {replyCount >= 1 &&
        comments.map((comments) => (
          <CommentRplL5Card
            comment={comments.content_stripped}
            reply={comments.can_comment}
            deleteComment={comments.can_delete}
            report={comments.can_report}
            avtar={comments.user_avatar.thumb}
            id={comments.id}
            name={comments.name}
            date={comments.date}
            reported={comments.reported}
            parentCallback={parentCallback}
            replyCount={comments.comment_count}
            commentRpl={comments.comment_count >= 1 ? comments.comments : null}
            activityId={comments.primary_item_id}
            getComment={getComment}
            setCommentCount={setCommentCount}
            commentCount={commentCount}
            parentCreate={parentCreate}
            viewComment={viewComment}
            setViewComment={setViewComment}
            userId={comments.user_id}
          />
        ))}
    </>
  );
}
export default CommentRplL4Card;
