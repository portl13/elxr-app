import React, { useContext, useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";
import { TIMEOUT } from "@utils/constant";
import Link from "next/link";
import { subscriptionsStyle } from "@components/my-purchases/Subcriptions";
import axios from "axios";
import { UserContext } from "@context/UserContext";
import { useRouter } from "next/router";

const myAccountApi = process.env.myAccount + "/subscription";

function SubscriptionCard({ result }) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const token = user?.token;
  const alert = useAlert();

  const [loading, setLoading] = useState(false);

  const cancellerSubscription = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${myAccountApi}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await router.replace(`/purchases/subscriptions`);
    } catch (e) {
      alert.error("Subscription not been cancelled", TIMEOUT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div css={subscriptionsStyle} className={"account-subscription-wrapper"}>
      <div className={"account-subscription-wrapper flex-column"}>
        <div className="status-wrapper">
          <div className="col-full-12">
            <div className="main-panel">Status</div>
            <div className="main-panel text-capitalize">
              {result?.status}
            </div>
          </div>
          <div className="col-full-12">
            <div className="main-panel">Start date</div>
            <div className="main-panel">
              {moment(result?.start_date).fromNow()}
            </div>
          </div>
          <div className="col-full-12">
            <div className="main-panel">Last order date</div>
            <div className="main-panel">
              {moment(result?.last_order_date_created).fromNow()}
            </div>
          </div>
          <div className="col-full-12">
            <div className="main-panel">Next payment date</div>
            <div className="main-panel">
              {moment(result?.next_payment).fromNow()}
            </div>
          </div>
          {/*<div className="col-full-12">*/}
          {/*  <div className="main-panel">Trial end date</div>*/}
          {/*  <div className="main-panel">*/}
          {/*    {moment(result?.trial_end).fromNow()}*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="col-full-12">
            <div className="main-panel">Payment</div>
            <div className="main-panel">
              <span data-is_manual="yes">Via Manual Renewal</span>
            </div>
          </div>
          <div className="col-full-12">
            <div className="main-panel">Actions</div>
            <div className="main-panel">
              <button onClick={() => cancellerSubscription(result.id)}>
                {loading ? "Canceling" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
        <div className="status-wrapper">
          <h2>Subscription totals</h2>
          <div className="col-head">
            <div className="col-card-1">Product</div>
            <div className="col-card-2">Total</div>
          </div>
          <div className="col-tag">
            <div className="col-card-1">
              <a href={"#"}>{result?.product.map((d) => d.name)}</a>{" "}
              <span className="white-color">
                × {result?.product.map((d) => d.qty)}
              </span>{" "}
            </div>
            <div className="col-card-2 white-color">
              <span>
                <span>$</span>
                {result?.total}
              </span>{" "}
              / month{" "}
            </div>
          </div>
          <div className="col-tag">
            <div className="col-card-1">Subtotal:</div>
            <div className="col-card-2">
              <span>
                <span>$</span>
                {result?.total}
              </span>
            </div>
          </div>
          <div className="col-tag">
            <div className="col-card-1">Total:</div>
            <div className="col-card-2">
              <span>
                <span>$</span>
                {result?.total}
              </span>
            </div>
          </div>
        </div>
        <div className="status-wrapper">
          <h2>Related orders</h2>
          <div className="table-ui">
            <div className="related-head">
              <div className="related-head-item">Order</div>
              <div className="related-head-item">Date</div>
              <div className="related-head-item">Status</div>
              <div className="related-head-item">Total</div>
              <div className="related-head-item"></div>
            </div>
            {result?.related_orders &&
              result?.related_orders.map((item) => (
                <div key={item.id} className="related-coloun-tag">
                  <div className="col-related-subscription" data-label="Order">
                    <a href="#">#{item.id} </a>
                  </div>
                  <div className="col-related-subscription" data-label="Date">
                    <span>{item.date}</span>
                  </div>
                  <div className="col-related-subscription" data-label="Status">
                    <span>{item.status}</span>
                  </div>
                  <div className="col-related-subscription" data-label="Total">
                    <span>
                      {`$ ${item.total.total} for ${item.total.item_count} item`}
                    </span>
                  </div>
                  <div className="col-related-subscription">
                    <Link href={`/my-purchases/order/${item.id}`}>
                      <a className="view-button"> View</a>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="status-wrapper">
          <h2>Billing address</h2>
          <div className="address-panel">
            <div className="address-tag mt-3">
              <span>
                {result?.billing.first_name} {result?.billing.last_name}
              </span>
              <span>{result?.billing.company}</span>
              <span>{result?.billing.address_1}</span>
              <span>{`${result?.billing.city},${result?.billing.state} ${result?.billing.postcode}`}</span>
            </div>
            <div className="contact-tag mt-3">
              <span>
                <FontAwesomeIcon icon={faPhone} />
                {result?.billing.phone}
              </span>
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
                {result?.billing.email}
              </span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SubscriptionCard;
