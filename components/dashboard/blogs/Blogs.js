import React, { useContext, useEffect, useState } from 'react'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import PlusIcon from '@icons/PlusIcon'
import BlogsCard from './BlogsCard'
import { useRouter } from 'next/router'
import EventModalSelectChannel from '../events/EventModalSelectChannel'
import useSWR from 'swr'
import { UserContext } from '@context/UserContext'
import { genericFetch } from '@request/dashboard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import useDebounce from '@hooks/useDebounce'
import Pagination from '@components/shared/pagination/Pagination'

const url = `${process.env.apiV2}/blogs`

function Blogs() {
  const { user } = useContext(UserContext)
  const token = user?.token
  const router = useRouter()
  const limit = 20
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const debounceTerm = useDebounce(search, 500)
  const [total, setTotal] = useState(0)

  const createPost = (id) => {
    router.push(`/dashboard/blog/${id}/add-blog/`)
  }

  const { data: blogs, mutate } = useSWR(
    token
      ? [
          `${url}?author=${user?.id}&page=${page}&per_page=${limit}&search=${debounceTerm}`,
          token,
        ]
      : null,
    genericFetch
  )

  const isLoading = !blogs

  useEffect(() => {
    if (blogs && blogs.total_items) {
      setTotal(blogs.total_items)
    }
  }, [blogs])

  return (
    <>
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-left align-items-md-center justify-content-between">
          <div>
            <h2 className="title-dashboard font-weight-bold">Blogs</h2>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-left align-items-md-center">
            <div className="mb-3 mb-md-0">
              <InputDashSearch 
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
            <div className="btn-create-client ">
              <button
                onClick={() => setOpen(!open)}
                className="btn btn-create w-100 ml-md-3"
              >
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
                <BlogsCard
                  mutate={mutate}
                  blog={blog} 
                />
              </div>
            ))}
          {blogs && blogs.blogs && blogs.blogs.length === 0 && (
            <h3 className="col display-4">You have not created any blog yet</h3>
          )}
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Pagination
              totalCount={total || 0}
              onPageChange={setPage}
              currentPage={page}
              pageSize={limit}
            />
          </div>
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
