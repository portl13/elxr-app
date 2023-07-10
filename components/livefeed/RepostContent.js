import Link from 'next/link'
import React from 'react'
import { postedData, typeActivity } from '@utils/activity'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'
import { validateYouTubeUrl } from '@utils/constant'
import { stringToSlug } from '@lib/stringToSlug'
import ReactPlayer from 'react-player'
import PhotoCollage from './PhotoCollage'
import { onlyLettersAndNumbers } from '@utils/onlyLettersAndNumbers'
import { professionalsLink, profileLink } from '../../utils/links'

const renderNewContent = (activity, defaultContent) => {
  if (
    activity.type === 'new_blog_channel-videos' ||
    activity.type === 'new_blog_podcasts' ||
    activity.type === 'new_blog_channel_events' ||
    activity.type === 'new_blog_channel' ||
    activity.type === 'new_blog_blog' ||
    activity.type === 'new_blog_album'
  ) {
    return (
      <>
        {activity?.feature_media && (
          <Link
            href={`/${typeActivity[activity.type]}/${stringToSlug(
              activity?.secondary_item_title || 'title'
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

        {!activity?.feature_media &&
          activity.type === 'new_blog_channel-videos' &&
          activity.video &&
          onlyLettersAndNumbers(activity.video) && (
            <Link
              href={`/${typeActivity[activity.type]}/${stringToSlug(
                activity?.secondary_item_title || 'title'
              )}/${activity?.secondary_item_id}`}
            >
              <a>
                <div
                  style={{
                    backgroundImage: `url(https://${
                      process.env.SubdomainCloudflare
                    }/${activity.video}/thumbnails/thumbnail.jpg?time=${
                      activity?.size || 1
                    }s)`,
                  }}
                  className="ratio ratio-16x9 bg-gray bg-cover"
                ></div>
              </a>
            </Link>
          )}

        <h5 className="mt-4 px-3">
          <Link
            href={`/${typeActivity[activity.type]}/${stringToSlug(
              activity?.secondary_item_title || 'title'
            )}/${activity?.secondary_item_id}`}
          >
            <a className="color-font">{activity.secondary_item_title}</a>
          </Link>
        </h5>
        <div
          className="description-feed pb-2 px-3"
          dangerouslySetInnerHTML={{ __html: defaultContent }}
        />
      </>
    )
  }

  return <div dangerouslySetInnerHTML={{ __html: defaultContent }} />
}

function RepostContent({
  activity,
  photoArray,
  updateContent,
  handleDescription,
  groupData,
  likeAction,
  name = '',
  date,
  bp_videos,
  user,
  thumb,
  moveImage,
  getLink,
  isRepost = false,
}) {

  const rendered = activity?.content?.rendered || ''
  
  return (
    <div className={isRepost ? 'activity-repost' : ''}>
      <div className={`activity-header d-flex mb-2 px-3`}>
        <div className="item-avatar mr-3">
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
            {postedData(date)} {''}
            <FontAwesomeIcon icon={faGlobeAmericas} className="icon-setting" />
          </div>
        </div>
      </div>
      <div className="activity-content">
        <div className="activity-inner">
          {updateContent === '' ? (
            rendered.toString().includes('blockquote') === true ? (
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
                      controlsList: 'nodownload', //<- this is the important bit
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
                  width={'100%'}
                  height={'100%'}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload', //<- this is the important bit
                      },
                    },
                  }}
                />
              ))}
            </>
          ) : (
            ''
          )}
        </div>

        {photoArray?.length > 0 ? (
          <div
            className={`multi-photos-section  grid-${
              photoArray.length >= 5 ? '5' : photoArray.length
            }`}
          >
            {photoArray.map((media, index) => (
              <React.Fragment key={media.id}>
                {index < 5 && (
                  <PhotoCollage
                    index={index}
                    bp_media_ids={photoArray}
                    media={media}
                    name={name}
                    user={user}
                    photoId={media.id}
                    parentCallback={() => {}}
                    parentImageData={moveImage}
                    parentGroupData={groupData}
                    parentDescription={handleDescription}
                    likeAction={likeAction}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default RepostContent
