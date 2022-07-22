import CardBlogs from '@components/creator/cards/CardBlogs'

import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getFetchPublic } from '@request/creator';
import React from 'react'
import useSWR from 'swr';


const url = `${process.env.apiV2}/blogs?all=true`;


function SectionBlogs() {
  
  const { data: blogs, error } = useSWR(`${url}&page=1&per_page=4`, getFetchPublic);

  const isLoading = !blogs && !error;

  
  return (
    <>
      <div className="row mt-5">
        <div className="col-12">
          <h4 className="font-size-14">BLOGS</h4>
        </div>
        {isLoading && <SpinnerLoader />}
        {blogs &&
          blogs.blogs.length > 0 &&
          blogs.blogs.map((blog) => (
            <div key={blog.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <CardBlogs blog={blog} />
            </div>
          ))}
      </div>
    </>
  )
}

export default SectionBlogs
