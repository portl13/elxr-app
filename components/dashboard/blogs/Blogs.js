import React, { useContext, useState } from 'react'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import PlusIcon from '@icons/PlusIcon'
import BlogsCard from './BlogsCard'
import { useRouter } from 'next/router'
import EventModalSelectChannel from '../events/EventModalSelectChannel'
import useSWR from 'swr'
import { UserContext } from '@context/UserContext'
import { genericFetch } from '@request/dashboard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'

const url = `${process.env.apiV2}/blogs`

function Blogs() {
  const { user } = useContext(UserContext)
  const token = user?.token
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const createPost = (id) => {
    router.push(`/dashboard/blog/${id}/add-blog/`)
  }

  const { data: blogs } = useSWR(
    token ? [`${url}?author=${user?.id}`, token] : null,
    genericFetch
  )

  const isLoading = !blogs

  return (
    <>
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-left align-items-md-center justify-content-between">
          <div>
            <h2 className="title-dashboard font-weight-bold">Blogs</h2>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-left align-items-md-center">
            <div className="mb-3 mb-md-0">
              <InputDashSearch  />
            </div>
            <div className="btn-create-client ">
              <button onClick={() => setOpen(!open)} className="btn btn-create w-100 ml-md-3">
                <i>
                  <PlusIcon className="btn-create-icon" />
                </i>
                <span>Write a Blog Post</span>
              </button>
            </div>
          </div>
        </div> 
        <div className="row mt-4 mt-md-5">
          {isLoading && <SpinnerLoader />}
          {blogs &&
            blogs.blogs &&
            blogs.blogs.length > 0 &&
            blogs.blogs.map((blog) => (
              <div key={blog.id} className="col-12 col-md-6 col-lg-3 mb-4">
                <BlogsCard blog={blog} />
              </div>
            ))}
          {blogs && blogs.blogs && blogs.blogs.length === 0 && (
            <h3 className="col display-4">
              You have not created any blog yet
            </h3>
          )}
        </div>
      </div>
      {open && (
        <EventModalSelectChannel
          handleCreate={createPost}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  )
}

export default Blogs
