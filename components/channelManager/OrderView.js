import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getOrdersNotes, getSubscription } from "../../pages/api/channel.api";
import { UserContext } from "../../context/UserContext";
import { OrdersNotes } from "../../pages/api/channel.api";
import Router, { useRouter } from "next/router";
import DownloadOrderNotes from "./DownloadOrderNotes";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";
import { Alert } from "reactstrap";
import Loader from "../loader";
import { TIMEOUT } from "../../utils/constant";


const WOODLAND_CHANNEL = 'Woodland Channel';

const WOOCOMMERCE = 'WooCommerce';

function OrderView({ orderList, updateStatus, show, showLoader, setStatus, status }) {

  const alert = useAlert();
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [orderNotes, setOrderNotes] = useState([]);
  const [note, setNotes] = useState();
  const [showDownload, setShowDownload] = useState(false);
  const [response, setResponse] = useState([]);
  const [showLoaders, setShowLoaders] = useState(false);
  const [subscription, setOrdeSubscription] = useState();
  const [imageUrl, getImageFile] = useState();

  const itemsName = orderList.line_items?.map((item) => item.name);
  const itemImg = orderList.line_items?.map((item) => item.image_url);
  const itemPrice = orderList.line_items?.map((item) => item.price);
  const itemQnt = orderList.line_items?.map((item) => item.quantity);
  const totalItem = orderList.line_items?.map((item) => item.total);
  const commissionVal = orderList.line_items?.map((item) => item.commission_value);
  const subtotal = orderList.line_items?.map((item) => item.subtotal);
  const query = router.query;
  const id = parseInt(query.orders)


  useEffect(() => {
    if (orderList) {
      setStatus(orderList.status);
    }
  }, []);
  useEffect(() => {
    if (id) {
      fetchOrderNotes(id);
    }
  }, [id]);
  const fetchOrderNotes = (order_id) => {
    getOrdersNotes(user, order_id).then((res) => {
      setOrderNotes(res.data.data);
    });
  };

  useEffect(() => {
    if (id) {
      fetchSubscription(id);
    }
  }, [id]);
  const fetchSubscription = (order_id) => {
    getSubscription(user, order_id).then((res) => {
      setOrdeSubscription(res.data.data);
    });
  };


  const AddOrderNotes = (checkValue) => {
    if (checkError(checkValue)) {
      const formData = {
        note: note,
        note_file: imageUrl
      }
      setShowLoaders(true);
      OrdersNotes(user, id, formData).then((res) => {
        alert.success("Order notes created successfully.", TIMEOUT);
        setNotes("");
        setShowLoaders(false);
        fetchOrderNotes(id)

      })
    }

  }
  const checkError = () => {
    let checkValue = true;
    if (checkValue && !note) {
      alert.error("Please add note before submit.", TIMEOUT);
      checkValue = false;
    }
    return checkValue;
  };


  const subscriptionId = subscription?.subscriptions?.map((item) => item.id);
  const subscriptionstatus = subscription?.subscriptions?.map((item) => item.status);
  const nextPayment = subscription?.subscriptions?.map((item) => item.next_payment);
  const totalSubscription = subscription?.subscriptions?.map((item) => item.total);



  return (
    <>
      <div className="wcfm-collapse-content">
        <div className="wcfm-top-element-container">
          <h3>
            Order #{orderList.number}
            <span
              className={(orderList.status === "completed" ? "status-title" : "") ||
                (orderList.status === "processing" ? "status-processing-tag" : "") ||
                (orderList.status === "pending" ? "pending-status" : "") ||
                (orderList.status === "on-hold" ? "hold-status" : "")
              }>
              {orderList.status.charAt(0).toUpperCase() + orderList.status.slice(1)}
            </span>
          </h3>
          <div className="money-bill">
            <FontAwesomeIcon
              icon={faCartPlus}
            />
            Add New
            <div className="tooltip-panel">
              <em></em>
              Add New Order
            </div>
          </div>
        </div>

        <div className="billing-wrapper">
          <div className="overview-section">
            <div className="overview-panel">
              <div className="left-panel">Order date:</div>
              <div className="right-panel">
                {moment(orderList.date_created).format("MMMM DD, YYYY @ h:mm a")}
              </div>
            </div>
            <div className="overview-panel">
              <div className="left-panel">Order Status:</div>
              <div className="right-panel">
                <select onChange={(e) => setStatus(e.target.value)}
                  value={status}>
                  <option value="pending">Pending payment</option>
                  <option value="processing">Processing</option>
                  <option value="on-hold">On hold</option>
                  <option value="completed" > Completed</option>
                  <option value="shipped">Shipped</option>

                </select>

                <Button onClick={() => updateStatus()}>
                  {showLoader && <Loader />}Update
                </Button>

              </div>
              {show && (
                <Alert color="success" className="alert-tags">Order status updated.</Alert>
              )}


            </div>
          </div>
          <div className="billing-panel">
            <div className="billing-head">
              <div className="left-panel">Billing Details</div>
              <div className="right-panel">Shipping Details</div>
            </div>
            <div className="billing-section">
              <div className="left-panel">
                <p>

                  {orderList.billing?.first_name} {orderList.billing?.last_name}
                  <br />
                  {orderList.billing?.address_1}
                  <br />
                  {orderList.billing?.city}, OR {orderList.billing?.postcode}
                </p>
                <p>
                  <span>Email:</span>
                  <a href="">{orderList.billing?.email}</a>
                </p>
                <p>
                  <span>Phone:</span>
                  {orderList.billing?.phone}
                </p>
              </div>
              <div className="right-panel">
                <p>
                  No shipping address set.
                </p>
              </div>
            </div>
          </div>
          <h5>Related subscriptions</h5>
          <div className="wcfm-datatable">
            <div className="row-head">
              <div className="order-item-1">Subscription</div>
              <div className="order-item-2">Status</div>
              <div className="order-item-3">Next payment</div>
              <div className="order-item-4">Total</div>
              <div className="order-item-5"></div>
            </div>
            <div className="column-head">
              <div className="order-item-1 order-color-tag">#{subscriptionId}</div>
              <div className="order-item-2">{subscriptionstatus}</div>
              <div className="order-item-3">{nextPayment}</div>
              <div className="order-item-4">${totalSubscription}.00</div>
              <div className="order-item-5">
                <button
                  onClick={() => Router.push("/my-account?tab=subscriptions")}>View</button>

              </div>
            </div>
          </div>
        </div>
        <h4>Order Items</h4>
        <div className="billing-wrapper">
          <div className="wcfm-datatable">
            <div className="row-head">
              <div className="item-1"></div>
              <div className="item-2">Item</div>
              <div className="item-3">Cost</div>
              <div className="item-4">Qty</div>
              <div className="item-5">Total</div>
              <div className="item-6">Earning</div>
            </div>
            <div className="column-head">
              <div className="item-1">
                <img src={itemImg} alt="image" />
              </div>
              <div className="item-2">
                <a>{itemsName}</a>
              </div>
              <div className="item-3">{itemPrice}.00</div>
              <div className="item-4">×{itemQnt}</div>
              <div className="item-5">{totalItem}.00</div>
              <div className="item-6">{commissionVal}.00</div>
            </div>
          </div>
          <div className="billing-subtotal-panel">
            <div className="billing-subtotal-ui">
              <span className="subtotal-tag">Subtotal:</span>
              <span className="amount-tag">${subtotal}.00</span>
            </div>
            <div className="billing-subtotal-ui">
              <span className="subtotal-tag">Gross Total:</span>
              <span className="amount-tag">${totalItem}.00</span>
            </div>
            <div className="billing-subtotal-ui">
              <span className="subtotal-tag">Total Earning:</span>
              <span className="amount-tag">${commissionVal}.00</span>
            </div>
            <div className="billing-subtotal-ui">
              <span className="subtotal-tag">Admin Fee:</span>
              <span className="amount-tag">$0.00</span>
            </div>
          </div>
        </div>
        <h4>Order Notes</h4>
        <div className="order-notes-panel">
          <div className="notes-description">
            {/* orderNotes.filter(item => item.author !== WOOCOMMERCE).map((item) */}
            {orderNotes.map((item) => {
              return (
                <div className="col-full-panel">
                  <div className="left-col"> <span dangerouslySetInnerHTML={{ __html: item.note }}></span></div>
                  <div className="right-col">added on {moment(item.date_created).format("MMMM DD, YYYY [at] hh:mm a")} by {item.author}</div>

                </div>
              )
            })
            }

          </div>
          <div className="col-md-div">
            <label>Add note <span className="req"> *</span></label>
            <textarea
              type="text"
              value={note}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={1000}></textarea>
          </div>
          <div className="main-tag">Attachment(s)</div>
          <DownloadOrderNotes
            showDownload={showDownload}
            setShowDownload={setShowDownload}
            user={user}
            setResponse={setResponse}
            response={response}
            getImageFile={getImageFile}


          />

          <div className="upload-text">Please upload any of these file types: <span>jpg|jpeg|jpe, gif, png, pdf, doc, docx</span></div>
          <div className="bottom-section">
            <select>
              <option>Private Note</option>
              <option>Note to Customer</option>
            </select>
            <button className="add-button" onClick={() => AddOrderNotes()}>{showLoaders && <Loader />}Add</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default OrderView;
