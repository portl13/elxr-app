import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import { useCartMutation } from "@context/CartContext";
import { TIMEOUT } from "@utils/constant";
import { getChannelSubscription } from "@api/channel.api";
import { Modal, ModalBody } from "reactstrap";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import CloseIcon from "@icons/CloseIcon";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";
import ReactPlayer from "react-player";
import { Stream } from "@cloudflare/stream-react";
import axios from "axios";
const wooUrl = process.env.woocomApi;

function TicketButton({
  user,
  text = "Buy Ticket",
  productID,
  event_id,
  author,
}) {
  const router = useRouter();
  const alert = useAlert();
  const { addProduct } = useCartMutation();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);

  const buy = (product, isSubscription) => {
    if (!user) {
      alert.show("You must be logged", TIMEOUT);
      return;
    }

    if (!isSubscription) {
      alert.show("An error occurred try again.", TIMEOUT);
      return;
    }

    addProduct({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      type: "ticket",
    });

    router.push("/page-checkout");
  };

  const getSubscription = () => {
    if (!user) return;
    if (!productID) {
      axios
        .get(
          `${process.env.apiURl}/channel/tikcket/${author}?tikcket=${event_id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        .then(({ data }) => {
          setProduct(data.data);
        })
        .catch((e) => {
          buy(null, false);
        });

      return;
    }

    axios
      .get(`${wooUrl}/products/${productID}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then(({ data }) => {
        setProduct(data);
      })
      .catch((e) => {
        buy(null, false);
      });
  };

  useEffect(() => {
    if (open) {
      getSubscription();
    }
  }, [open]);

  const openModal = () => {
    if (!user && !productID) {
      alert.show("You must be logged in to join this channel", TIMEOUT);
      return;
    }
    setOpen(!open);
  };

  return (
    <>
      <button
        onClick={openModal}
        className={"btn btn-create rounded-lg d-flex"}
      >
        <span>{text}</span>
      </button>
      <Modal isOpen={open} toggle={() => setOpen(!open)} centered={true}>
        <ModalBody>
          {!product && <SpinnerLoader />}
          {product ? (
            <>
              <div className="d-flex justify-content-end">
                <span onClick={() => setOpen(!open)}>
                  <CloseIcon className="dashboard-icon pointer" />
                </span>
              </div>

              <article className="main-subscription">
                <div className="subscription-avatar">
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      backgroundImage: `url(${
                        product && product?.images?.length >= 1
                          ? product.images[0]?.woocommerce_thumbnail
                          : null
                      })`,
                    }}
                    className={"bg-cover"}
                  ></div>
                </div>
                <div className="subscription-content">
                  <h3 className="subscription-title">{product.name}</h3>
                </div>
                <div className="subscription-description">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  />
                </div>
              </article>
              <div className="subscription-footer mt-3 mb-1">
                <div className="subscription-price text-primary font-size-22">
                  <span>Ticket Price: </span>
                  <span>${product.price}</span>
                </div>
              </div>
              <button
                onClick={() => buy(product, true)}
                className="btn btn-create rounded-lg mt-3 w-100 text-center"
              >
                Buy
              </button>
            </>
          ) : null}
        </ModalBody>
      </Modal>
    </>
  );
}

export default TicketButton;
