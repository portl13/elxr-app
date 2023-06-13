import React from 'react'
import useSWR from 'swr'
import { genericFetch } from '@request/dashboard'
import { NumericFormat } from 'react-number-format'
import { format } from 'date-fns'
// <SpinnerLoader pd={"0"} width={"15px"} height={"15px"} />
const url = '${process.env.apiV2}/dashboard/sales/'

function AmountCard({ token }) {
  const today = new Date()
  const { data } = useSWR(token ? [url, token] : null, genericFetch)
  return (
    <div className="w-100 dashboard-card h-100">
      <div className="row mx-0">
        <div className="col-12 d-flex align-items-center">
          <h5 className="mb-3 font-quicksand pt-3">
            SALES Analytics - {today ? format(today, 'MMMM yyyy') : null}
          </h5>
          <div>
            <span className="font-quicksand text-capitalize ml-2">
              (Current)
            </span>
          </div>
        </div>
      </div>

      <div className="row mx-0">
        <div className={'col-3 dash-card-item'}>
          <h6 className="mb-1 dash-card-subtitle color-font">Gross Sales</h6>
          <span className="dash-card-amount color-font">
            ${data?.total_gross_sales ? (
              <NumericFormat
                displayType="text"
                value={data?.total_gross_sales}
                thousandSeparator=","
                decimalSeparator="."
              />
            ) : (
              0
            )}
          </span>
          <br />
          <span className="dash-card-time color-font">This Month</span>
        </div>

        <div className={'col-3 dash-card-item'}>
          <h6 className="mb-1 dash-card-subtitle color-font">Net Earnings</h6>
          <span className="dash-card-amount color-font">
            ${data?.total_earned ? (
              <NumericFormat
                displayType="text"
                value={data?.total_earned}
                thousandSeparator=","
                decimalSeparator="."
              />
            ) : (
              0
            )}
          </span>
          <br />
          <span className="dash-card-time color-font">This Month</span>
        </div>

        <div className={'col-3 dash-card-item'}>
          <h6 className="mb-1 dash-card-subtitle color-font">Items Sold</h6>
          <span className="dash-card-amount color-font">
            {data?.total_items_sold || 0}
          </span>
          <br />
          <span className="dash-card-time color-font">This Month</span>
        </div>

        <div className={'col-3 dash-card-item'}>
          <h6 className="mb-1 dash-card-subtitle color-font">
            Orders Received
          </h6>
          <span className="dash-card-amount color-font">
            {data?.total_orders || 0}
          </span>
          <br />
          <span className="dash-card-time color-font">This Month</span>
        </div>
      </div>
    </div>
  )
}

export default AmountCard
