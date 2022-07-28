import { getFetchPublic } from '@request/creator'
import React from 'react'
import useSWR from 'swr'

const baseUrl = process.env.apiV2
const url = `${baseUrl}/blogs`
const urlChannel = `${baseUrl}/channels`
function BlogDetail({ id }) {
  const { data: blog } = useSWR(`${url}/${id}`, getFetchPublic)

  const { data: channel } = useSWR(
    blog ? `${urlChannel}/${blog?.channel_id}` : null,
    getFetchPublic
  )

  return (
    <div className="row">
      <div className="col-12 col-lg-9">
        <div className="card-general">
          <div
            style={{
              backgroundImage: `url(${blog?.thumbnail})`,
            }}
            className="ratio ratio-16x9 bg-gray cover-bg"
          ></div>
        </div>

        <div className="card-info mt-4 px-3 px-md-0">
          <h4 className="font-weight-bold">{blog?.title}</h4>
          <p
            className="m-0"
            dangerouslySetInnerHTML={{
              __html: blog?.content,
            }}
          />
          <div className="card-channel-media border py-2 px-3 mt-4 py-md-3">
            <div className="img-channel-media">
              <div className="avatar-detail">
                {channel && channel.channel_logo && (
                  <img src={channel.channel_logo} alt={channel.channel_name} />
                )}
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row name-channel-media">
              <div className="ml-md-3 mt-2 mt-md-0">
                <h4 className="m-0 font-weight-bold">
                  {channel?.channel_name}
                </h4>
                <span>{channel?.category}</span>
              </div>
            </div>

            <div className="d-flex mt-2 buttons-channel-media">
              <div className="position-relative">
                <button className="btn btn-borde btn-border-primary text-primary">
                  <span>Follow</span>
                </button>
              </div>
              <div className="position-relative">
                <button className="btn btn-create rounded-lg d-flex">
                  <span>Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-3"></div>
    </div>
  )
}

export default BlogDetail
