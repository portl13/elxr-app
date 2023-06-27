import { css } from '@emotion/core'
import { stringToSlug } from '@lib/stringToSlug'
import { onlyLettersAndNumbers } from '@utils/onlyLettersAndNumbers'
import { clean } from '@utils/cleanHtml'
import Link from 'next/link'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars-2'

function CardVideoFeatured({ video }) {
  const { creator, tags } = video
  return (
    <article
      css={css`
        .featured-subtitle {
          display: inline-block;
          color: var(--primary-color);
          font-size: 1.1rem;
          font-weight: bold;
          margin: 8px 0;
        }
        .featured-container {
          padding: 5px 0;
        }
        .featured-description {
          font-size: 1rem;
        }
        .featured-title {
          font-size: 1.3rem;
          margin-top: 0;
        }
        @media (min-width: 992px) {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          .featured-container {
            padding: 0 50px;
          }
          .featured-subtitle {
            color: var(--primary-color);
            font-size: 1.3rem;
          }
          .featured-description {
            font-size: 1rem;
          }
          .featured-title {
            font-size: 1.5rem;
            margin:0 0 20px;
          }
        }
      `}
    >
      <div className="featured-container-image">
        <Link href={`/video/${stringToSlug(video?.title)}/${video?.id}`}>
          <a>
            {onlyLettersAndNumbers(video?.video) && !video.thumbnail && (
              <div
                style={{
                  backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${video?.video}/thumbnails/thumbnail.jpg?time=${video?.size}s)`,
                }}
                className="ratio ratio-16x9 pointer border-radius-12 cover-bg"
              ></div>
            )}

            {video.thumbnail && (
              <div
                style={{
                  backgroundImage: `url(${video?.thumbnail})`,
                }}
                className="ratio ratio-16x9 border-radius-12 pointer  cover-bg"
              ></div>
            )}
          </a>
        </Link>
      </div>
      <div className="featured-container">
        <span className="featured-subtitle">Featured</span>
        <h2 className="featured-title">{video?.title}</h2>
        <p className="featured-description d-none d-md-block">
          {clean(video?.description?.slice(0, 420))}...
          <Link href={`/video/${stringToSlug(video?.title)}/${video?.id}`}>
            <a>more</a>
          </Link>
        </p>
        <div className="d-flex position-relative pt-md-2">
          <div className="border-colors cover-bg d-flex align-items-center justify-content-center ">
            <Link href={`/creator/${stringToSlug(creator.name)}/${creator.id}`}>
              <a className="text-white">
                <div
                  style={{
                    backgroundImage: `url(${creator.logo})`,
                  }}
                  className="avatar-event-card bg-gray cover-bg"
                ></div>
              </a>
            </Link>
          </div>
          <div className="card-info-content pl-2 pr-0 d-flex align-content-center">
            <h3 className="title-even-home m-0 d-flex flex-column justify-content-center w-100">
              {creator ? (
                <span className="subtitle-even-home color-font-grey mr-1 d-block">
                  <Link
                    href={`/creator/${stringToSlug(creator.name)}/${
                      creator.id
                    }`}
                  >
                    <a className={'color-font-grey'}>by {creator.name}</a>
                  </Link>
                </span>
              ) : null}
              <span className="d-block">{video?.category}</span>
              {tags?.length > 0 ? (
                <div
                  css={css`
                    height: 25px;
                    overflow-x: auto;
                    width: 100%;
                  `}
                >
                  <Scrollbars universal>
                    {tags?.map((tag) => (
                      <span
                        key={tag.value}
                        className="baged-gris color-font-grey mr-2 mb-1"
                      >
                        {tag.label}
                      </span>
                    ))}
                  </Scrollbars>
                </div>
              ) : null}
            </h3>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CardVideoFeatured
