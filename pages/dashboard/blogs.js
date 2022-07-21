import Blogs from '@components/dashboard/blogs/Blogs'
import DashBoard from '@components/dashboard/DashBoard'
import React from 'react'

function BlogsPage() {
  return (
    <DashBoard title="Blogs">
        <Blogs/>
    </DashBoard>
  )
}

export default BlogsPage