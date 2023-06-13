import React from 'react'
import useSWR from 'swr'
import { genericFetch } from '@request/dashboard'
const url = `${process.env.apiV2}/dashboard/analytics/`

function AmountCardLight({ token }) {
  const { data, isLoading } = useSWR(token ? [url, token] : null, genericFetch)

  return (
    <div className="w-100 dash-card-blue h-100">
      <div className="row">
        <div className="col-12">
          <h5 className="mb-3 dash-card-title-light color-font">PAGE Analytics</h5>
        </div>
      </div>

      <div className="row">
        <div className={`col-6 dash-card-item`}>
          <h6 className="mb-1 dash-card-subtitle color-font">Followers</h6>
          <span className="dash-card-amount color-font">{data?.followers || 0}</span>
          <br />
          <span className="dash-card-time color-font">Last 30 Days</span>
        </div>

        <div className={`col-6 dash-card-item`}>
          <h6 className="mb-1 dash-card-subtitle color-font">Subscribers</h6>
          <span className="dash-card-amount color-font">{data?.subscribers || 0}</span>
          <br />
          <span className="dash-card-time color-font">Last 30 Days</span>
        </div>
      </div>
    </div>
  )
}

export default AmountCardLight
