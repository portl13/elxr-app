import React from 'react'
import DownloadCardDetail from '@pages/my-account/DownloadCardDetail'
import { v4 as uuidv5 } from 'uuid'
function DownloadCard({ result }) {
  return (
    <>
      <div className="datatable-ui">
        <div className="row-head">
          <div className="download-list product">PRODUCT</div>
          <div className="download-list">DOWNLOADS REMAINING</div>
          <div className="download-list">EXPIRES</div>
          <div className="download-list">DOWNLOAD</div>
        </div>
        {result?.map((d) => (
          <DownloadCardDetail key={`${d.order_id}-${uuidv5()}`} result={d} />
        ))}
      </div>
    </>
  )
}
export default DownloadCard
