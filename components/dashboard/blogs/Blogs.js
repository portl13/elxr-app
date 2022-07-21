import InputDashSearch from '@components/shared/form/InputDashSearch'
import PlusIcon from '@icons/PlusIcon'
import Link from 'next/link'
import React from 'react'
import BlogsCard from './BlogsCard'

function Blogs() {
  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div>
          <h2 className="title-dashboard m-0 font-weight-bold">Blogs</h2>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="mb-2 mb-md-0">
            <InputDashSearch />
          </div>
          <div className="btn-create-client">
            <Link href={'/dashboard/channels/create-channel'}>
              <a className="btn btn-create">
                <i>
                  <PlusIcon className="btn-create-icon" />
                </i>
                <span>Write a Blog Post</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <BlogsCard />
        </div>
      </div>
    </div>
  )
}

export default Blogs
