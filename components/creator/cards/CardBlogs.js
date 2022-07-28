import React from 'react'
import Link from 'next/link'
import { stringToSlug } from '@lib/stringToSlug'

function CardBlogs({ blog }) {
  return (
    <div className="card-general">
      <Link href={`/blog/${stringToSlug(blog.title)}/${blog.id}`}>
        <a>
          <div
            className="ratio ratio-16x9 bg-gray card-head cover-bg"
            style={{ backgroundImage: `url(${blog.thumbnail})` }}
          ></div>
        </a>
      </Link>
      <div className="card-info">
        <div className=" d-flex justify-content-between mt-4">
          <span className="baged-white text-dark">Blog</span>
        </div>
        <h4 className="card-title my-1 line-clamp-2">
          <Link href={`/blog/${stringToSlug(blog.title)}/${blog.id}`}>
            <a className='text-white'>{blog.title}</a>
          </Link>
        </h4>
        <p
          className="m-0 font-size-12 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className=" d-flex my-2">
          <span className="font-size-12 mr-1">Categoria:</span>
          <span className="font-size-12">{blog.category}</span>
        </div>
        <div className=" d-flex flex-wrap">
          {blog.tags.map((tag) => (
            <span key={tag.term_id} className="baged-gris mr-2 mb-1">
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardBlogs
