import React from 'react'
import useSWR from 'swr'
import { genericFetch } from '@request/dashboard'
import { startOfMonth, subMonths, lastDayOfMonth, format } from 'date-fns'
const url = `${process.env.apiV2}/dashboard/sales-by-date/`

import { NumericFormat } from 'react-number-format'
import { addMonths } from 'date-fns'

const formatDateFrom = (date) => {
  return format(date, 'yyyy-LL-dd')
}

const parsedMoney = (money) => {
  return (Math.round(money * 100) / 100).toFixed(2)
}

function AmountPayoutCard({ token }) {
  const today = new Date()
  const prevMonth = subMonths(today, 1)
  const nexrMonth = addMonths(today, 1)

  const filter_date_form = startOfMonth(prevMonth)
  const filter_date_to = lastDayOfMonth(prevMonth)

  const { data } = useSWR(
    token
      ? [
          `${url}?filter_date_form=${formatDateFrom(
            filter_date_form
          )}&filter_date_to=${formatDateFrom(filter_date_to)}`,
          token,
        ]
      : null,
    genericFetch,
    { revalidateOnFocus: false }
  )

  return (
    <div className="w-100 dash-card-purple h-100">
      <div className="row">
        <div className="col-12">
          <h5 className="mb-3 dash-card-title-light color-font">Next Payout</h5>
        </div>
      </div>
      <div className="row">
        <div className={`col-6 dash-card-item`}>
          <h6 className="mb-1 dash-card-subtitle color-font">
            For last month: {format(filter_date_form, 'MMMM yyyy')}
          </h6>
          <span className="dash-card-amount color-font">
            $
            {data?.total_earned ? (
              <NumericFormat
                displayType="text"
                value={parsedMoney(data?.total_earned)}
                thousandSeparator=","
                decimalSeparator="."
              />
            ) : (
              0
            )}
          </span>
          <br />
          <span className="dash-card-time color-font">
            on {format(nexrMonth, 'MMMM')} 1, {format(nexrMonth, 'yyyy')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AmountPayoutCard
