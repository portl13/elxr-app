import {
  faBan,
  faEdit,
  faEllipsisH,
  faGlobeAmericas,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { postedData } from '@utils/activity'
import Link from 'next/link'
import React from 'react'
import { professionalsLink, profileLink } from '../../utils/links'

function LiveFeedCardHeader({
  activity,
  isComment,
  setShow,
  setShowEdit,
  setSelPost,
  setMoreOption,
  moreOption,
  getReport,
  setShowReport,
}) {
  return (
    <div className="activity-header d-flex pb-2 px-3">
      <div className="dots-section">
        <FontAwesomeIcon
          icon={faEllipsisH}
          onClick={() => setMoreOption(!moreOption)}
        />
        <div className="tooltip-panel">More Options</div>
        {moreOption && (
          <div className="more-action-list">
            {activity?.can_delete && !isComment && (
              <div className="inner-tag">
                <div className="main-tag">
                  <div className="item-link" onClick={() => setShow(true)}>
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </div>
                </div>
              </div>
            )}
            {activity?.can_edit && activity?.type === 'activity_update' && (
              <div className="inner-tag">
                <div className="main-tag">
                  <div
                    className="item-link"
                    onClick={() => {
                      setShowEdit(true)
                      setSelPost(activity)
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    Edit
                  </div>
                </div>
              </div>
            )}
            {!activity?.can_delete && !activity?.can_edit && (
              <div className="inner-tag">
                <div className="main-tag">
                  <div
                    className="item-link"
                    onClick={() => {
                      getReport()
                      setShowReport(true)
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
        <img className="avatar" src={activity?.user_avatar?.thumb} />
      </div>
      <div className="activity-header-text">
        <div className=" font-size-16">
          <Link
            className="mr-1"
            href={
              activity?.is_custom
                ? professionalsLink(activity?.name, activity.user_id)
                : profileLink(activity?.name, activity.user_id)
            }
          >
            {activity?.name}
          </Link>
        </div>
        <div className="meta-date">
          {postedData(activity?.date)} {''}
          <FontAwesomeIcon icon={faGlobeAmericas} className="icon-setting" />
        </div>
      </div>
    </div>
  )
}

export default LiveFeedCardHeader
