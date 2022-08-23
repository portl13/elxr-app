import BlogsRelated from '@components/blog/BlogsRelated'
import CreatedButton from '@components/shared/action/CreatedButton'
import SaveButton from '@components/shared/action/SaveButton'
import CategoryAndTags from '@components/shared/cards/CategoryAndTags'
import ChannelCardMedia from '@components/video/ChannelCardMedia'
import { getFetchPublic } from '@request/creator'
import React from 'react'
import useSWR from 'swr'

const baseUrl = process.env.apiV2
const url = `${baseUrl}/blogs`
function BlogDetail({ id }) {
  const { data: blog } = useSWR(`${url}/${id}`, getFetchPublic)

  return (
    <article className="container-media">
      <div className="main-item">
        <div
          className="ratio ratio-16x9 bg-gray card-head cover-bg bg-gray"
          style={{
            backgroundImage: `url(${blog?.thumbnail})`,
          }}
        ></div>
        <div className="d-flex w-100 justify-content-between">
          <h4 className="font-weight-bold mt-4 mb-2">{blog?.title}</h4>
          <div className="flex-shrink d-flex align-items-center">
            <CreatedButton typeAdd={"blog"} />
            {blog && <SaveButton value={blog?.id} type="blog" />}
          </div>
        </div>

        {blog && (
          <CategoryAndTags category={blog?.category} tags={blog?.tags} />
        )}
        <div
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: blog?.content,
          }}
        />
        {blog && blog.channel_id && (
          <ChannelCardMedia channel_id={blog.channel_id} />
        )}
      </div>
      <div className="relative-items mt-4 mt-md-0">
        <h4 className="text-center text-uppercase">More blogs like this</h4>
        {blog && <BlogsRelated category={blog?.category_id} />}
      </div>
    </article>
  )
}

export default BlogDetail
