import React, {useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutSuccess from "@components/checkout/CheckOutSuccess";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/core";
import {format} from "date-fns";
import {useCartMutation} from "@context/CartContext";
const stripePromise = loadStripe(process.env.Stripe_Key);

const wooUrl = `${process.env.woocomApi}/orders`;

const style = css`
  padding-top: 200px;
  .check-order {
    width: 20px;
    color: #1cd991;
    svg {
      width: 20px;
    }
  }

  .table.order{
    width: auto;
    color: var(--bg-font);
  }
  .table th, .table td{
    border: none;
    padding: .1rem 1rem;
  }
`;

function PageOrderReceived({ order }) {
  
  const { clearCart } = useCartMutation()

  useEffect(() => {
    clearCart()
  }, []);

  return (
    <MainLayout title={"elxr"} sidebar={<MainSidebar />}>
      <div className="bg-black bd-radius col-12">
        <div className="row">
          <div className="col-12">
            {!order ? (
              <Elements stripe={stripePromise}>
                <CheckOutSuccess />
              </Elements>
            ) : null}
            {order ? (
              <>
                <div css={style} className="container">
                  <div className="text-center mb-4">
                    <h4>
                      {" "}
                      <span className="check-order">
                        <FontAwesomeIcon icon={faCheckCircle} />{" "}
                      </span>{" "}
                      Your Order Confirmed
                    </h4>
                    <p>Thank you. Your order has been received.</p>
                  </div>

                  <table className="table order m-auto">
                    <thead>
                      <tr>
                        <th scope="col" className={"text-uppercase"}>order number:</th>
                        <th scope="col" className={"text-uppercase"}>date:</th>
                        <th scope="col" className={"text-uppercase"}>email:</th>
                        <th scope="col" className={"text-uppercase"}>total:</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{order.id}</th>
                        <td>{format(new Date(order.date_completed), 'MMMM dd, Y')}</td>
                        <td>{order?.billing?.email}</td>
                        <td>${order?.total}</td>
                      </tr>
                    </tbody>
                  </table>
                  <h3 className={"text-center mt-4 font-size-22"}>Thank you for shopping with us!</h3>
                  <p className={"text-center"}>
                    We'll be sending a confirmation email when the order is processed.
                  </p>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PageOrderReceived;

export async function getServerSideProps({ query }) {
  const { order = null } = query;

  if (order) {
    try {
      const { data } = await axios.get(
        `${wooUrl}/${order}?consumer_key=${process.env.WOO_CK}&consumer_secret=${process.env.WOO_CS}`
      );
      return {
        props: {
          order: data,
        },
      };
    } catch (e) {}
  }

  return {
    props: {
      order: null,
    },
  };
}
