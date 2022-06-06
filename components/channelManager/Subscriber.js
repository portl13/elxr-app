import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { LoaderContainer } from '../livefeed/livefeed.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import SubscriberList from './SubscriberList'
import { getSubscribers } from '../../pages/api/channel-subscriber.api'
import moment from 'moment'
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars'
import { TIMEOUT } from '../../utils/constant'
import { useAlert } from 'react-alert'
import { wcfmStyle } from '@components/my-account/Wcfm.style'
export default function Subscriber({ user, handleRedirect, innerNav }) {
  const alert = useAlert()
  const [status, setStatus] = useState(innerNav)
  const [result, setResult] = useState([])
  const [loader, setLoader] = useState(true)
  const [length, setLength] = useState(0)
  const [selectDate, setSelectDate] = useState(false)
  const [start_date, setStartDate] = useState(null)
  const [end_date, setEndDate] = useState(null)
  const [callDatePicker, setCallDatePicker] = useState(false)
  const formData = {
    length: 1000,
    start: 0,
    subscription_status: status,
    ...(start_date && { filter_date_form: start_date }),
    ...(end_date && { filter_date_to: end_date }),
  }
  function getSubscriberList() {
    getSubscribers(user, formData)
      .then((res) => {
        setResult(res.data.data)
        setLoader(false)
        setLength(res.data.data.length)
      })
      .catch(() => {})
  }
  useEffect(() => {
    if (end_date || end_date === null) {
      setResult([])
      setLength(0)
      setLoader(true)
    }
    getSubscriberList()
  }, [user, status, end_date])
  function emptyStates() {
    setResult([])
    setLength(0)
    setLoader(true)
    setSelectDate(false)
    setStartDate(null)
    setEndDate(null)
    setCallDatePicker(false)
  }
  function getTimeValue(e) {
    var start = e.target.value !== null ? e.target.value.map((d) => d)[0] : null
    var end = e.target.value !== null ? e.target.value.map((d) => d)[1] : null
    setStartDate(start !== null ? moment(start).format('YYYY-MM-DD') : null)
    setEndDate(end !== null ? moment(end).format('YYYY-MM-DD') : null)
  }
  return (
    <section css={wcfmStyle}>
      <div className="wcfm-collapse-content">
        <div className="wcfm-top-element-container pl-0">
          <h4 className="text-uppercase text-primary channel-title">
            Subscribers
          </h4>
        </div>
        <hr className="line-title w-100 mt-4 mb-1" />
        <div className="wcfm-top-element-container">
          <ul className="wcfm_products_menus">
            <li className={status === 'all' ? 'active' : ''}>
              <Button
                onClick={() => {
                  setStatus('all')
                  emptyStates()
                  handleRedirect('subscriber', 'all')
                }}
              >
                All
              </Button>
            </li>
            <li className={status === 'active' ? 'active' : ''}>
              |
              <Button
                onClick={() => {
                  setStatus('active')
                  emptyStates()
                  handleRedirect('subscriber', 'active')
                }}
              >
                Active
              </Button>
            </li>
            <li className={status === 'on-hold' ? 'active' : ''}>
              |
              <Button
                onClick={() => {
                  setStatus('on-hold')
                  emptyStates()
                  handleRedirect('subscriber', 'on-hold')
                }}
              >
                On Hold
              </Button>
            </li>
            <li className={status === 'cancelled' ? 'active' : ''}>
              |
              <Button
                onClick={() => {
                  setStatus('cancelled')
                  emptyStates()
                  handleRedirect('subscriber', 'cancelled')
                }}
              >
                Cancelled
              </Button>
            </li>
            <li className={status === 'expired' ? 'active' : ''}>
              |
              <Button
                onClick={() => {
                  setStatus('expired')
                  emptyStates()
                  handleRedirect('subscriber', 'expired')
                }}
              >
                Expired
              </Button>
            </li>
          </ul>
        </div>
        <div className="wcfm-tabWrap mtop30">
          <div className="tabWrap-header">
            <div className="dataTables_length">
              <div className="dataTables_length-info">
                <span>Show</span>
                <select>
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>

              {/* entries */}
              {/* <select>
                <option>Filter by category</option>
                
              </select> */}
              <div className="form-row w-100 mt-3">
                <div className="col-6">
                  {' '}
                  <Button
                    className="filter-button m-0"
                    onClick={() => alert.success('Coming Soon..', TIMEOUT)}
                  >
                    Filter by category
                  </Button>
                </div>
                <div className="col-6">
                  {!selectDate && (
                    <Button
                      className="range-button"
                      onClick={() => setSelectDate(true)}
                    >
                      Choose Date Range
                    </Button>
                  )}
                </div>
              </div>
              {selectDate && (
                <div className="control-pane">
                  <link
                    href="https://cdn.syncfusion.com/ej2/material.css"
                    rel="stylesheet"
                    onLoad={() => {
                      setCallDatePicker(true)
                    }}
                  />
                  <style jsx global>{`
                    .customCSS .e-calendar .e-content .e-weekend span {
                      color: red;
                    }
                  `}</style>
                  {callDatePicker && (
                    <div className="control-section">
                      <div className="daterangepicker-control-section">
                        <DateRangePickerComponent
                          cssclassName="customCSS"
                          width="200px"
                          format="yyyy/MM/dd"
                          onChange={(e) => getTimeValue(e)}
                        ></DateRangePickerComponent>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="wcfm-datatable">
            <div className="row-head">
              <div className="subscription-col-1">
                <span className="subscription-tag">
                  <FontAwesomeIcon icon={faEllipsisH} />
                  <span className="tooltip-panel">
                    Status<em></em>
                  </span>
                </span>
              </div>
              <div className="subscription-col-2">Subscription</div>
              <div className="subscription-col-3">Order</div>
              <div className="subscription-col-4">Items</div>
              <div className="subscription-col-5">Total</div>
              <div className="subscription-col-6">Start Date</div>
              <div className="subscription-col-7">Trial End</div>
              <div className="subscription-col-8">Next Payment</div>
              <div className="subscription-col-9">Last Order</div>
              <div className="subscription-col-10">End Date</div>
              <div className="subscription-col-11">Actions</div>
            </div>
            {loader && (
              <p css={LoaderContainer}>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                Loading Subscribers. Please wait.
              </p>
            )}
            {!loader && length === 0 && (
              <p css={LoaderContainer}>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                No Results.{' '}
              </p>
            )}
            {result &&
              result.map((subscriber, index) => {
                return (
                  <SubscriberList
                    index={index}
                    subscriber={subscriber}
                    user={user}
                    id={subscriber.subscription_id}
                    key={subscriber.subscription_id}
                    handleRedirect={handleRedirect}
                  />
                )
              })}
            {length === 1 ? (
              <p className="text-left viewing-ui">
                Showing {length} subscriber
              </p>
            ) : length > 1 ? (
              <p className="text-left viewing-ui">
                Showing 1-{length} of {length} subscribers
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
