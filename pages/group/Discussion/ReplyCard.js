import React, { useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEdit,
  faReply,
  faExpandAlt,
  faCompressAlt,
  faEllipsisV,
  faTrash,
  faBan,
} from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'

const Setting = ({
  item,
  userIds,
  openModal,
  handleSubscribe,
  status,
  groupDetails,
  handleRedirection,
}) => {
  const [isShow, openLeftElipse] = useState(false)
  return (
    <div
      className="discussion-details"
      key={item?.slug}
      onMouseLeave={() => openLeftElipse(false)}
    >
      <div className="bs-item-wrap inner-wrap-item">
        <div className="flex flex-1">
          <div className="item-avatar">
            <a href="#">
              {userIds && userIds[item?.author] !== undefined ? (
                <img
                  alt="photo"
                  src={userIds[item?.author].avatar_urls.thumb}
                />
              ) : ''}
            </a>
          </div>
          <div className="item">
            <div className="item-title">
                {userIds?.[item?.author]?.name}
            </div>
            <div className="item-meta">
              {userIds?.[item?.author]?.role}{' '}
              {moment(item?.modified_gmt).format('MMMM DD, [at] hh:mm a')}
            </div>
          </div>
        </div>
        {!groupDetails?.can_join && (
          <div className="item-icon-tag">
            <div className="reply-tag">
              <FontAwesomeIcon icon={faReply} onClick={() => openModal(item)} />
              <div className="tooltip-panel">
                <em></em>Reply
              </div>
            </div>
            <div className="ellipsis-tag">
              <FontAwesomeIcon
                icon={faEllipsisV}
                onClick={() => openLeftElipse(!isShow)}
              />
              <div className="tooltip-panel">
                <em></em>More Actions
              </div>
              <div
                className="dropdown-toogle"
                style={{ display: isShow ? 'block' : 'none' }}
              >
                <em></em>
                <ul>
                  <li onClick={() => handleRedirection('edit', item.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                    Edit
                  </li>
                  {/* <li><FontAwesomeIcon icon={faTimes} />Close</li> */}
                  {status ? (
                    <li onClick={() => handleRedirection('merge')}>
                      <FontAwesomeIcon icon={faCompressAlt} />
                      Merge
                    </li>
                  ) : (
                    <li onClick={() => handleRedirection('move', item.id)}>
                      <FontAwesomeIcon icon={faComment} />
                      Move
                    </li>
                  )}
                  {!status && (
                    <li onClick={() => handleRedirection('split', item.id)}>
                      <FontAwesomeIcon icon={faExpandAlt} />
                      Split
                    </li>
                  )}
                  {/* {item?.author !== user.id && !status &&
                                    <li><FontAwesomeIcon icon={faFlag} />Report reply</li>} */}
                  <li
                    onClick={() =>
                      handleSubscribe(item, 'spam', !item?.action_states.spam)
                    }
                  >
                    <FontAwesomeIcon icon={faBan} />
                    {!item?.action_states.spam ? 'spam' : 'unspam'}
                  </li>
                  {item?.action_states.trash && (
                    <li onClick={() => handleSubscribe(item, 'trash')}>
                      <FontAwesomeIcon icon={faTrash} />
                      Trash
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <div dangerouslySetInnerHTML={{ __html: item?.short_content }}></div>
      <div className="image-tag">
        {item?.bbp_media
          ? item?.bbp_media.map((media) => (
              <img src={media?.attachment_data?.full} />
            ))
          : ''}
        {item?.bbp_videos
          ? item.bbp_videos.map((media) => (
              <ReactPlayer
                url={media.url}
                controls={true}
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload', //<- this is the important bit
                    },
                  },
                }}
              />
            ))
          : ''}
      </div>
    </div>
  )
}

export default Setting
