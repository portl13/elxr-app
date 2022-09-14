import React from 'react'
import Link from 'next/link'
import { stringToSlug } from '@lib/stringToSlug'
import CategoryAndTags from '@components/shared/cards/CategoryAndTags'
import blogs from '@pages/blogs'

function BlogCardNew({ blog }) {
    console.log(blog)
  return (
    <div className="card-general-new">
      <Link href={`/blog/${stringToSlug(blog.title)}/${blog.id}`}>
        <a>
          <div
            className="ratio ratio-16x9 border-radius-17 bg-gray card-head cover-bg"
            style={{ backgroundImage: `url(${blog.thumbnail})` }}
          ></div>
        </a>
      </Link>
      <div className="py-3">
        <h4 className=" font-weight-bold m-0 font-size-12">
          <Link href={`/blog/${stringToSlug(blog.title)}/${blog.id}`}>
            <a className='text-white'>{blog.title}</a>
          </Link>
        </h4>
        <div className="d-flex alig-items-center text-grey ">
          <span className="font-size-13 mr-1">
            Channel: {blog.channel_name}
          </span>
        </div>
        <div className=" d-flex  text-grey">
        <span className="font-size-13 mr-1">Category:</span>
        <span className="font-size-13">{blog.category}</span>
      </div>
      </div>
    </div>
  )
}

export default BlogCardNew