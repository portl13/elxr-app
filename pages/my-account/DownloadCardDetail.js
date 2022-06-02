import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfinity } from '@fortawesome/free-solid-svg-icons'
import Router from 'next/router'

function DownloadCardDetail({ result }) {
  return (
    <div className="column-head">
      <div className="row-download product" data-label="PRODUCT">
        <span
          onClick={() =>
            Router.push(`/subscription-detail?id=${result?.product_id}`)
          }
        >
          {result?.product_name}
        </span>
      </div>
      <div className="row-download" data-label="DOWNLOADS REMAINING">
        {result?.downloads_remaining === '' && (
          <span>
            <FontAwesomeIcon icon={faInfinity} />
          </span>
        )}
      </div>
      <div className="row-download" data-label="EXPIRES">
        <span>
          {result?.access_expires === null && 'Never'}
        </span>
      </div>
      <div className="row-download" data-label="DOWNLOAD">
        <a href={result?.download_url} download>
          {result?.file.name}
        </a>
      </div>
    </div>
  )
}
export default DownloadCardDetail
