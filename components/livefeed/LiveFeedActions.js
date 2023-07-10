import {
  faCommentAlt,
  faFlag,
  faShare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useIcon from '@hooks/useIcon'
import React from 'react'
import RepostButton from './RepostButton'
import GiftButton from '@components/gift/GiftButton'

function LiveFeedActions({
  commentCount,
  activity,
  photoArray,
  setPhotoArray,
  updateContent,
  user,
  reportData,
  setShareShow,
  shareShow,
  createRepost,
  setViewComment,
  handleDescription,
  groupData,
  likeAction
}) {
  const { iconElement: report } = useIcon(faFlag)
  return (
    <div className="activity-buttons-action d-flex px-3 mt-2">
      {activity?.can_comment && (
        <>
          <button
            type="button"
            className="btn-icon btn-3 btn pl-1 pr-1"
            onClick={() => setViewComment(true)}
          >
            <i>
              <FontAwesomeIcon icon={faCommentAlt} className="icon-2rem" />
            </i>
            <span className="color-font">
              {' '}
              {commentCount > 0 && commentCount}{' '}
            </span>
          </button>
        </>
      )}
      {user ? (
        <RepostButton
          user={user}
          photoArray={photoArray}
          setPhotoArray={setPhotoArray}
          activity={activity}
          groupData={groupData}
          updateContent={updateContent}
          createRepost={createRepost}
          handleDescription={handleDescription}
          likeAction={likeAction}
        />
      ) : null}
      {user ? (
        <GiftButton authorName={activity?.name} authorId={activity?.user_id} />
      ) : null}

      {activity?.can_report === true &&
      activity?.reported === true &&
      reportData === false ? (
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

      <div className="btn pointer" onClick={() => setShareShow(!shareShow)}>
        <i>
          <FontAwesomeIcon icon={faShare} className="icon-2rem " />
        </i>
      </div>
    </div>
  )
}

export default LiveFeedActions
