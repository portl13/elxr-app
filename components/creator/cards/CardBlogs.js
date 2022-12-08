import React from 'react'
import Link from 'next/link'
import { stringToSlug } from '@lib/stringToSlug'
import CategoryAndTags from '@components/shared/cards/CategoryAndTags'

function CardBlogs({ blog }) {
  return (
    <div className="card-general">
      <Link href={`/blog/${stringToSlug(blog.title)}/${blog.id}`}>
        <a>
          <div
            className="ratio ratio-16x9 bg-gray card-head cover-bg border-radius-17"
            style={{ backgroundImage: `url(${blog.thumbnail})` }}
          ></div>
        </a>
      </Link>
      <div className="card-info">
        <div className=" d-flex justify-content-between mt-4">
          <span className="baged-white text-dark">Blog</span>
        </div>
        <h4 className="card-title my-1 line-clamp-2 font-size-12">
          <Link href={`/blog/${stringToSlug(blog.title)}/${blog.id}`}>
            <a className='color-font'>{blog.title}</a>
          </Link>
        </h4>
        <div
          className="m-0 font-size-12 line-clamp-2 card-blog-description"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <CategoryAndTags 
          category={blog.category}
          tags={blog.tags}
        />
      </div>
    </div>
  )
}

export default CardBlogs
