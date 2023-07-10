import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { UserContext } from '@context/UserContext'
import { CommunityCardLivefeedStyle, reportModal } from './livefeed.style'
import 'react-multi-carousel/lib/styles.css'
import { uploadModal } from '@components/livefeed/photo.style'
import CommentCard from './CommentCard'
import EditPost from './EditPost'
import AddCommentCard from './AddCommentCard'
import SharePost from './SharePost'

import LiveFeedModalReport from './LiveFeedModalReport'
import LiveFeedModalDelete from './LiveFeedModalDelete'
import LiveFeedCardHeader from './LiveFeedCardHeader'
import LiveFeedCardContent from './LiveFeedCardContent'
import LiveFeedActions from './LiveFeedActions'
import RepostContent from './RepostContent'

const LiveFeedCard = ({
  isComment,
  activity,
  showProfileGroup,
  parentCallback,
  activityList,
  setActivityList,
  isFeedWrapper,
  apiCall,
  createRepost,
}) => {
  const {
    user_avatar: { thumb = '/img/user.png' },
    content: { rendered = null },
    bp_media_ids,
    comment_count,
    id,
    content_stripped,
    title,
    show_in_feed,
    name,
    date,
    bp_videos,
  } = activity

  if (!show_in_feed) {
    return
  }

  const { user } = useContext(UserContext)
  const [photoArray, setPhotoArray] = useState(bp_media_ids)
  const [commentCount, setCommentCount] = useState(comment_count)
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [result, setResult] = useState([])

  const [reportData, setReportData] = useState(false)
  const [commentData, setCommentData] = useState(false)
  const [report_Id, setReport_Id] = useState('')
  const [reportId, setReportId] = useState(null)
  const [initial, setInitial] = useState('')

  const [note, setNote] = useState('')
  const [viewComment, setViewComment] = useState(false)
  const [commentResponse, setCommentResponse] = useState([])
  const [activityContent, setActivityContent] = useState(content_stripped)
  const [updateContent, setUpdateContent] = useState('')
  const [selPost, setSelPost] = useState(null)
  const [moreOption, setMoreOption] = useState(false)

  const inputElement = useRef(null)
  const commentUrl = process.env.bossApi + `/activity/${id}/comment`
  const url = process.env.bossApi + '/moderation/report'
  const [shareShow, setShareShow] = useState(false)
  const [groupData, setGroupData] = useState(true)

  function postReport() {
    axios
      .post(
        url,
        {
          item_id: id,
          item_type: 'activity',
          report_category:
            reportId == null ? result.map((d) => d.value)[0] : reportId,
          ...(reportId === 'other' ? { note: note } : null),
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setReportData(true)
      })
  }

  function closeReport() {
    setShowReport(false)
    setMoreOption(false)
  }

  function onTrigger() {
    parentCallback(id)
  }

  function getReport() {
    axios(process.env.bossApi + '/moderation/report', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then(({ data }) => {
      const result = data.map((e) => e.options)[0]
      setResult(result)
      setInitial(result.map((d) => d.value)[0])
    })
  }

  function getComment() {
    setCommentResponse([])
    axios
      .get(commentUrl, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then(({ data }) => {
        setCommentData(true)
        setCommentResponse(data.comments)
      })
  }

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
        setCommentData(true)
        getComment()
        setCommentCount(commentCount + 1)
      })
  }

  function handleDelete(childData, count) {
    axios(process.env.bossApi + `/activity/${childData}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      getComment()
      if (count >= 1) {
        setCommentCount(commentCount - count - 1)
      } else {
        setCommentCount(commentCount - 1)
      }
    })
  }

  function handlePhotoDelete(childData) {
    const photo_Id = childData
    axios(process.env.bossApi + `/media/${photo_Id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      console.log('res.data:', res.data)
      setPhotoArray(photoArray.filter((item) => item.id !== photo_Id))
    })
  }

  function moveImage(photoData) {
    setPhotoArray(photoArray.filter((item) => item.id !== photoData.id))
  }

  function handleDescription(content, photoId, groupStatus) {
    setGroupData(groupStatus)
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
        let index = photoArray.findIndex((item) => item.id === photoId)
        photoArray[index].description = content
        setPhotoArray(photoArray)
        setGroupData(true)
      })
  }

  function likeAction(childData, groupStatus) {
    setGroupData(groupStatus)
    axios(process.env.bossApi + `/activity/${childData}/favorite`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setGroupData(true)
    })
  }

  function getLink() {
    const content = rendered.replace('</p>', '')
    let urlRegex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    return content.match(urlRegex) === null ? '' : content.match(urlRegex)[0]
  }

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus()
    }
  }, [viewComment])

  useEffect(() => {
    if (user && activity?.id && activity?.comment_count > 0 && apiCall) {
      getComment()
    }
  }, [])

  return (
    <div css={CommunityCardLivefeedStyle}>
      <LiveFeedCardHeader
        isComment={isComment}
        activity={activity}
        setShow={setShow}
        setShowEdit={setShowEdit}
        setSelPost={setSelPost}
        moreOption={moreOption}
        setMoreOption={setMoreOption}
        getReport={getReport}
        setShowReport={setShowReport}
      />

      <LiveFeedCardContent
        getLink={getLink}
        user={user}
        activity={activity}
        photoArray={photoArray}
        moveImage={moveImage}
        groupData={groupData}
        likeAction={likeAction}
        updateContent={updateContent}
        handleDescription={handleDescription}
        handlePhotoDelete={handlePhotoDelete}
        commentCount={commentCount}
      />

      {activity?.type === 'new_blog_repost' ? (
        <RepostContent
          activity={activity?.activity}
          photoArray={photoArray}
          updateContent={updateContent}
          handleDescription={handleDescription}
          groupData={groupData}
          likeAction={likeAction}
          name={name}
          date={date}
          bp_videos={bp_videos}
          user={user}
          thumb={thumb}
          moveImage={moveImage}
          getLink={getLink}
          isRepost={true}
        />
      ) : null}

      <LiveFeedActions
        activity={activity}
        commentCount={commentCount}
        photoArray={photoArray}
        setPhotoArray={setPhotoArray}
        updateContent={updateContent}
        user={user}
        groupData={groupData}
        reportData={reportData}
        setShareShow={setShareShow}
        shareShow={shareShow}
        createRepost={createRepost}
        setViewComment={setViewComment}
        handleDescription={handleDescription}
        likeAction={likeAction}
      />

      {show ? (
        <LiveFeedModalDelete
          show={show}
          setShow={setShow}
          uploadModal={uploadModal}
          setMoreOption={setMoreOption}
          onTrigger={onTrigger}
        />
      ) : null}

      {showReport ? (
        <LiveFeedModalReport
          result={result}
          showReport={showReport}
          reportModal={reportModal}
          setReport_Id={setReport_Id}
          setReportId={setReportId}
          setNote={setNote}
          report_Id={report_Id}
          initial={initial}
          closeReport={closeReport}
          reportId={reportId}
          postReport={postReport}
          setShowReport={setShowReport}
        />
      ) : null}

      {shareShow && <SharePost cardId={id} title={title} rendered={rendered} />}

      {commentData &&
        commentResponse?.map((comments) => (
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

      {showEdit && selPost && (
        <EditPost
          setShowEdit={setShowEdit}
          uploadModal={uploadModal}
          showEdit={showEdit}
          user={user}
          activity={activity}
          setActivityContent={setActivityContent}
          activityList={activityList}
          setActivityList={setActivityList}
          isFeedWrapper={isFeedWrapper}
          showProfileGroup={showProfileGroup}
          setMoreOption={setMoreOption}
        />
      )}

      {viewComment ? (
        <div
          className={
            viewComment === false ? 'd-none' : 'activity-comments-panel'
          }
        >
          <AddCommentCard
            user={user}
            viewComment={viewComment}
            setViewComment={setViewComment}
            parentCreate={createComment}
          />
        </div>
      ) : null}
    </div>
  )
}
export default LiveFeedCard
