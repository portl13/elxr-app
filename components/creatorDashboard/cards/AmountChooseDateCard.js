import React, { useState } from 'react'
import useSWR from 'swr'
import { genericFetch } from '@request/dashboard'
import { format, startOfMonth, subMonths, lastDayOfMonth } from 'date-fns'
import { Modal } from 'reactstrap'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'
import { css } from '@emotion/core'
import { NumericFormat } from 'react-number-format'
const url = `${process.env.apiV2}/dashboard/sales-by-date/`

const formatDateFrom = (date) => {
  return format(date, 'yyyy-LL-dd')
}

const parsedMoney = (money) => {
  return (Math.round(money * 100) / 100).toFixed(2)
}

function AmountChooseDateCard({ token }) {
  const today = new Date()
  const prevMonth = subMonths(today, 1)

  const filter_date_form = startOfMonth(prevMonth)
  const filter_date_to = lastDayOfMonth(prevMonth)

  const [isOpen, setIsOpen] = useState(false)
  const [showDate, setShowDate] = useState(true)
  const [state, setState] = useState([
    {
      startDate: filter_date_form,
      endDate: filter_date_to,
      key: 'selection',
    },
  ])

  const { data } = useSWR(
    token
      ? [
          `${url}?filter_date_form=${formatDateFrom(
            state[0].startDate
          )}&filter_date_to=${formatDateFrom(state[0].endDate)}`,
          token,
        ]
      : null,
    genericFetch
  )

  return (
    <>
      <div className="w-100 creator-dash-card-blue h-100">
        <div className="row mx-0">
          <div className="col-12 d-flex align-items-center">
            <h5 className="mb-3 font-quicksand pt-3">SALES Analytics {showDate ? format(prevMonth, '- MMMM yyyy') : null}</h5>
            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="badge-primary font-size-12 rounded-pill py-1 px-2 ml-2 border-none"
              >
                Choose Date Range
              </button>
            </div>
          </div>
        </div>

        <div className="row mx-0">
          <div className={'col-6 col-md-3 dash-card-item'}>
            <h6 className="mb-1 dash-card-subtitle color-font">Gross Sales</h6>
            <span className="dash-card-amount color-font">
              {data?.total_gross_sales ? (
                <NumericFormat
                  displayType="text"
                  value={parsedMoney(data?.total_gross_sales)}
                  thousandSeparator=","
                  decimalSeparator="."
                  prefix='$'
                />
              ) : (
                0
              )}
            </span>
            <br />
            <span className="dash-card-time color-font">Last Month</span>
          </div>

          <div className={'col-6 col-md-3 dash-card-item'}>
            <h6 className="mb-1 dash-card-subtitle color-font">Net Earnings</h6>
            <span className="dash-card-amount color-font">
              {data?.total_earned ? (
                <NumericFormat
                  displayType="text"
                  value={parsedMoney(data?.total_earned)}
                  thousandSeparator=","
                  decimalSeparator="."
                  prefix='$'
                />
              ) : (
                0
              )}
            </span>
            <br />
            <span className="dash-card-time color-font">Last Month</span>
          </div>

          <div className={'col-6 col-md-3 dash-card-item'}>
            <h6 className="mb-1 dash-card-subtitle color-font">Items Sold</h6>
            <span className="dash-card-amount color-font">
              {data?.total_items_sold || 0}
            </span>
            <br />
            <span className="dash-card-time color-font">Last Month</span>
          </div>

          <div className={'col-6 col-md-3 dash-card-item'}>
            <h6 className="mb-1 dash-card-subtitle color-font">
              Orders Received
            </h6>
            <span className="dash-card-amount color-font">
              {data?.total_orders || 0}
            </span>
            <br />
            <span className="dash-card-time color-font">Last Month</span>
          </div>
        </div>
      </div>
      <Modal toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} centered>
        <div
          css={css`
            background: #fff;
            &.date-range-modal
              .rdrCalendarWrapper
              .rdrMonths
              .rdrDay
              .rdrDayNumber {
              background: transparent;
            }
            .rdrCalendarWrapper .rdrMonths .rdrDay .rdrDayNumber,
            .rdrCalendarWrapper .rdrMonths .rdrDay.rdrDayToday .rdrDayNumber,
            .rdrCalendarWrapper .rdrMonths .rdrDay .rdrDayNumber {
              background: transparent;
              width: unset !important;
              height: unset !important;
              box-shadow: unset !important;
            }
            & .rdrMonth {
              width: 100%;
            }
            .rdrCalendarWrapper
              .rdrMonths
              .rdrDay.rdrDayToday
              .rdrDayNumber
              span {
              color: #000;
            }
          `}
          className="date-range-modal d-flex flex-column"
        >
          <DateRange
            editableDateInputs={true}
            onChange={(item) => {
              setShowDate(false)
              setState([item.selection])
            }}
            moveRangeOnFirstSelection={false}
            maxDate={new Date()}
            ranges={state}
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-primary"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  )
}

export default AmountChooseDateCard
