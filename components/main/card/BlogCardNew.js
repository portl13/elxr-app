import React from 'react'
import Link from 'next/link'
import { stringToSlug } from '@lib/stringToSlug'
import { writingsLink } from '@utils/links'

function BlogCardNew({ blog }) {
  const { creator } = blog
  return (
    <div className="card-general-new">
      <Link href={writingsLink(blog.title, blog.id)}>
        <a>
          <div
            className="ratio ratio-16x9 border-radius-12 bg-gray card-head bg-cover"
            style={{ backgroundImage: `url(${blog.thumbnail})` }}
          ></div>
        </a>
      </Link>
      <div className=" d-flex position-relative py-3 px-2">
        <div className="border-colors cover-bg d-flex align-items-center justify-content-center ">
          <div
            style={{ backgroundImage: `url(${creator.logo})` }}
            className="avatar-event-card bg-gray cover-bg"
          >
            <Link href={`/professionals/${stringToSlug(creator.name)}/${creator.id}`}>
              <a className="h-100"></a>
            </Link>
          </div>
        </div>
        <div className="card-info-content d-flex flex-column pl-3 pr-0">
          <h3 className="title-even-home line-clamp-2 m-0">
            <Link href={writingsLink(blog.title, blog.id)}>
              <a className="color-font">{blog.title}</a>
            </Link>
          </h3>
          {creator ? (
            <span className="subtitle-even-home color-font-grey mr-1">
              <Link
                href={`/professionals/${stringToSlug(creator.name)}/${creator.id}`}
              >
                <a className={'color-font-grey'}>by {creator.name}</a>
              </Link>
            </span>
          ) : null}
          <span className="date-even-home color-font">{blog.category}</span>
        </div>
      </div>
    </div>
  )
}

export default BlogCardNew
