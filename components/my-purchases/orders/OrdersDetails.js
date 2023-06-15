import React, { useState, useEffect, useContext } from "react"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { useAlert } from "react-alert"

import { UserContext } from "@context/UserContext"
import { getOrdersNotes } from "@api/channel.api"
import { OrdersNotes } from "@api/channel.api"
import { TIMEOUT } from "@utils/constant"
import Loader from "@components/loader"
import Router from "next/router"
import { subscriptionsStyle } from "@components/my-purchases/Subcriptions"
import { convertToUTC } from "@utils/dateFromat"
import { addMonths, format } from "date-fns"

function getDateSuffix(date) {
  const dt = moment(date).date().toString().slice(-1)
  if (dt === "1") {
    return "st"
  } else if (dt === "2") {
    return "nd"
  } else if (dt === "3") {
    return "rd"
  } else {
    return "th"
  }
}
// TODO: set new handleRedirect
function Ordersdetails({ handleRedirect = () => {}, id, order }) {
  const alert = useAlert()
  const { user } = useContext(UserContext)
  //const [ordersResult, setOrdersResult] = useState(null)
  const ordersResult = order
  const [orderNotes, setOrderNotes] = useState([])
  const [note, setNotes] = useState()
  const [showLoaders, setShowLoaders] = useState(false)
  const [image, setImage] = useState()

  useEffect(() => {
    if (user) {
      fetchOrderNotes(id)
    }
  }, [user, id])

  const fetchOrderNotes = (id) => {
    // TODO: check error 404
    getOrdersNotes(user, id)
      .then((res) => {
        setOrderNotes(res.data.data)
      })
      .catch((e) => console.log(e))
  }

  const checkError = () => {
    let checkValue = true
    if (checkValue && !note) {
      alert.error("Please add note before submit.", TIMEOUT)
      checkValue = false
    }
    return checkValue
  }

  function onFormSubmit(e, checkValue) {
    if (checkError(checkValue)) {
      e.preventDefault()
      setShowLoaders(true)
      fileUpload(image).then((res) => {
        alert.success("Order notes created successfully.", TIMEOUT)
        setNotes("")
        //setImage("")
        setShowLoaders(false)
        fetchOrderNotes(id)
      })
    }
  }

  function fileUpload(file) {
    const formData = new FormData()
    formData.append("note_file", file)
    formData.append("note", note)
    return OrdersNotes(user, id, formData)
  }

  return (
    <section css={subscriptionsStyle}>
      <div className="account-subscription-panel fx-d flex-column">
        <h3>
          View Order
          <span>
            {" "}
            Order #<em>{ordersResult?.id}</em> was placed on{" "}
            <em>
              {moment(ordersResult?.date)
                .subtract(1, "days")
                .format("MMMM DD, YYYY")}
            </em>{" "}
            and is currently <em>{ordersResult?.status}</em>.
          </span>
        </h3>

        {ordersResult && (
          <div className="status-wrapper">
            <h2>Order details</h2>
            <div className="table-ui">
              <div className="related-head">
                <div className="related-head-item img"></div>
                <div className="related-head-item product">PRODUCT</div>
                <div className="related-head-item qty">QTY</div>
                <div className="related-head-item total">TOTAL</div>
              </div>
              {ordersResult.order_details.map((item) => {
                return (
                  <div key={item.id} className="related-coloun-tag">
                    {item.image ? (
                      <div className="col-view-1 col-product">
                        <img src={item.image} alt="image" />
                      </div>
                    ) : null}
                    <div className="col-view-2 col-product">
                      <a
                        className="product-name"
                        onClick={() =>
                          Router.push("/subscription-detail?id=51779")
                        }
                      >
                        {ordersResult.order_details.map((d) => d.name)}
                      </a>{" "}
                      <div>
                        SKU: {item.sku ? <span> {item.sku} </span> : "N/A"}
                      </div>
                    </div>
                    <div className="col-view-3 col-product" data-label="QTY">
                      <span>{item.quantity}</span>
                    </div>
                    <div className="col-view-4 col-product" data-label="TOTAL">
                      <span>${item.total}.00</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="subtotal-ui">
              <div className="subtotal-tag">
                SUBTOTAL: <span> ${ordersResult?.sub_total}.00 </span>
              </div>
              <div className="subtotal-tag">
                TOTAL: <span> ${ordersResult?.total} </span>
              </div>
            </div>
          </div>
        )}

        <div className="status-wrapper">
          <h2>Add your note</h2>
          <div className="upload-panel">
            <div className="data-panel-12">
              <div className="left-panel">
                Add note <span className="req">*</span>
              </div>
              <div className="right-panel">
                <textarea
                  className={"input-search"}
                  value={note}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={1000}
                ></textarea>
              </div>
            </div>
            <div className="data-panel-12">
              <div className="left-panel">Upload File</div>
              <div className="right-panel">
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0])
                  }}
                />
              </div>
            </div>
            <div className="data-panel-12">
              <button
                className="submit-button"
                onClick={(e) => onFormSubmit(e)}
              >
                {showLoaders && <Loader />}Submit
              </button>
            </div>
          </div>
        </div>

        {orderNotes.length > 0 && (
          <div className="status-wrapper">
            <h2>Order updates</h2>
            <ol>
              {orderNotes.map((item) => {
                return (
                  <li key={item.id}>
                    <div className="main-tag">
                      <div className="meta">
                        <span
                          dangerouslySetInnerHTML={{ __html: item.note }}
                        ></span>
                      </div>
                      <div className="description-text">
                        {moment(item.date_created).format("dddd")}{" "}
                        {moment(item.date_created).format(
                          `MMMM DD[${getDateSuffix(
                            item.date_created
                          )}], YYYY [at] hh:mm a`
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        )}

        {ordersResult?.subscriptions.length > 0 && (
          <div className="status-wrapper">
            <h2>Related subscriptions</h2>
            <div className="table-ui">
              <div className="related-head-subscription">
                <div className="related-head-subscription-item">
                  SUBSCRIPTION
                </div>
                <div className="related-head-subscription-item">STATUS</div>
                <div className="related-head-subscription-item">
                  NEXT PAYMENT{" "}
                </div>
                <div className="related-head-subscription-item">TOTAL</div>
                <div className="related-head-subscription-item"></div>
              </div>
              {ordersResult.subscriptions.map((item) => {
                return (
                  <div key={item.id} className="related-coloun-tag">
                    <div
                      className="col-related-subscription"
                      data-label="SUBSCRIPTION"
                    >
                      <a href="#"># {item.id} </a>
                    </div>
                    <div
                      className="col-related-subscription"
                      data-label="STATUS"
                    >
                      <span> {item.status}</span>
                    </div>
                    <div
                      className="col-related-subscription"
                      data-label="NEXT PAYMENT"
                    >
                      <span>
                        {item.last_payment !== 0
                          ? format(
                              addMonths(
                                new Date(
                                  convertToUTC(convertToUTC(item.last_payment))
                                ),
                                1
                              ),
                              "MMM dd, yyyy"
                            )
                          : "not applicable"}
                      </span>
                    </div>
                    <div
                      className="col-related-subscription"
                      data-label="TOTAL"
                    >
                      <span>{item.total}</span>
                    </div>
                    <div className="col-related-subscription">
                      <a
                        className="view-button"
                        onClick={() =>
                          handleRedirect(
                            "subscriptions",
                            ordersResult?.subscriptions.map((d) => d.id)
                          )
                        }
                      >
                        View
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="status-wrapper">
          <h2>Billing address</h2>
          <div className="address-panel">
            <div className="address-tag mt-3">
              <span>
                {" "}
                {ordersResult?.billing.first_name}{" "}
                {ordersResult?.billing.last_name}
              </span>
              <span> {ordersResult?.billing.company}</span>
              <span> {ordersResult?.billing.address_1}</span>
              <span>
                {" "}
                {ordersResult?.billing.city}, {ordersResult?.billing.state}{" "}
                {ordersResult?.billing.postcode}
              </span>
            </div>
            <div className="contact-tag  mt-3">
              <span>
                {" "}
                <FontAwesomeIcon icon={faPhone} /> {ordersResult?.billing.phone}
              </span>
              <span>
                {" "}
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                {ordersResult?.billing.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Ordersdetails
