import CategoryAndTags from '@components/shared/cards/CategoryAndTags'
import { stringToSlug } from '@lib/stringToSlug'
import Link from 'next/link'
import React, { useState } from 'react'
import BlogsDeleteModal from './BlogDeleteModal'
import BlogsAction from './BlogsAction'

function BlogsCard({ blog, mutate }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  return (
    <>
      <div className="card-general">
        <Link href={`/blog/${stringToSlug(blog.title)}/${blog.id}`}>
          <a>
            <div
              style={{ backgroundImage: `url(${blog.thumbnail})` }}
              className="ratio ratio-16x9 bg-gray card-head cover-bg"
            ></div>
          </a>
        </Link>

        <div className="card-info">
          <div className=" d-flex justify-content-between mt-4">
            <span className="baged-white text-dark">Blog</span>
            <BlogsAction
              blog={blog}
              openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          </div>
          <h4 className="card-title my-1 font-size-12">
            <Link href={`/blog/${stringToSlug(blog.title)}/${blog.id}`}>
              <a className="text-white">{blog.title}</a>
            </Link>
          </h4>
          <div
            className="m-0 font-size-12 line-clamp-2 card-blog-description"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <CategoryAndTags category={blog.category} tags={blog.tags} />
        </div>
      </div>
      <BlogsDeleteModal
        mutate={mutate}
        blog={blog}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />
    </>
  )
}

export default BlogsCard
