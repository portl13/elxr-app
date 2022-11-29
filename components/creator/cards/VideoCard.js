import React from 'react'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CategoryAndTags from '@components/shared/cards/CategoryAndTags'
import Link from 'next/link'
import { stringToSlug } from '@lib/stringToSlug'
import {onlyLettersAndNumbers} from "@utils/onlyLettersAndNumbers";

function VideoCard({ video }) {
  return (
    <>
      <article className="card-general">
        <div>
          {onlyLettersAndNumbers(video.video) && !video.thumbnail &&(
              <div
                  style={{
                    backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${video.video}/thumbnails/thumbnail.jpg?time=${video.size}s)`,
                  }}
                  className="ratio ratio-16x9 border-radius-17 pointer  cover-bg"
              >
                <span className="duration-video">
                  <FontAwesomeIcon className="play-icon" icon={faPlay} />
                </span>
              </div>
          )}
          
          {video.thumbnail && (
            <div
              style={{
                backgroundImage: `url(${video.thumbnail})`,
              }}
              className="ratio ratio-16x9 pointer  border-radius-17 cover-bg"
            >
              <span className="duration-video">
                <FontAwesomeIcon className="play-icon" icon={faPlay} />
              </span>
            </div>
          )}

        </div>
        <div className="p-3">
          <div className="d-flex justify-content-between">
            <span className="badge badge-primary mb-1">Video</span>
          </div>
          <div className="mt-3">
            <h5 className="m-0 font-size-12 font-weight-bold">
              <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
                <a className="text-white">{video.title}</a>
              </Link>
            </h5>
            <p className="m-0 font-size-12 line-clamp-2">{video.description}</p>
            <CategoryAndTags category={video.category} tags={video.tags} />
          </div>
        </div>
      </article>
    </>
  )
}

export default VideoCard
