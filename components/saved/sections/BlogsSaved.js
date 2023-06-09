import React from 'react'
import CardBlogs from '@components/creator/cards/CardBlogs'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'

function BlogsSaved({ blogs, blogIds }) {
  if (blogs && blogs.blogs && blogs.blogs.length === 0) {
    return ''
  }

  if (blogIds && blogIds.length === 0) {
    return ''
  }

  return (
    <div className="row mb-4">
      <div className="col-12 d-flex justify-content-between mb-2">
        <h4 className="font-size-14">BLOGS</h4>
      </div>
      {!blogIds && <SpinnerLoader />}
      {!blogs  && blogIds && blogIds.length > 0 && <SpinnerLoader />}
      {blogs &&
        blogs.blogs.map((blog) => (
          <div className="col-12 col-md-4 col-lg-3 mb-4" key={blog.id}>
            <CardBlogs blog={blog} />
          </div>
        ))}
    </div>
  )
}

export default BlogsSaved
