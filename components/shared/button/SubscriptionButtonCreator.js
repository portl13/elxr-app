import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import { getChannelSubscription } from "@api/channel.api";
import { useCartMutation } from "@context/CartContext";
import { TIMEOUT } from "@utils/constant";
import {Modal, ModalBody, Spinner} from "reactstrap";
import SpinnerLoader from "../loader/SpinnerLoader";
import ReactPlayer from "react-player";
import CloseIcon from "@icons/CloseIcon";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";
import { Stream } from "@cloudflare/stream-react";
import EmptyList from "@components/shared/ui/EmptyList";
import { genericFetch } from "@request/dashboard";
import axios from "axios";
import { followMember } from "@api/member.api";

const urlCheck = process.env.apiURl + "/subscription-check/";
const myAccountApi = process.env.myAccount + "/subscription";
const subscriptionsUrl =
  process.env.baseUrl + "/wp-json/wc/v1/subscriptions?customer=";

function SubscriptionButtonCreator({
  user,
  text = "Subscribe",
  vendor_id,
  className = "btn btn-create rounded-lg d-flex",
  subscription_id,
  is_subscriber,
  is_following,
}) {
  const router = useRouter();
  const alert = useAlert();
  const { addProduct } = useCartMutation();
  const [open, setOpen] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notSubscription, setNotSubscription] = useState(false);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);

  const subscribe = async (subscription, isSubscription) => {
    if (!user) {
      alert.show("You must be logged in to join this channel", TIMEOUT);
      return;
    }

    if (!isSubscription) {
      alert.show("This channel does not have a subscription", TIMEOUT);
      return;
    }

    if (!is_following) {
      await handleFollowMember(user)
    }

    addProduct({
      id: subscription.id,
      name: subscription.title,
      price: Number(subscription.price),
      quantity: 1,
    });

    await router.push("/page-checkout");
  };

  const handleFollowMember = async (user) => {
    setIsLoadingCheckout(true)
    const formData = {
      user_id: user.id,
      action: "follow",
    };
    try {
      await followMember(user, formData);
    } catch (e) {
      console.log(e);
    }finally {
      setIsLoadingCheckout(false)
    }
  };

  const getSubscription = () => {
    if (!user || notSubscription) return;
    setIsLoading(true);
    getChannelSubscription(vendor_id, user)
      .then(({ data }) => {
        let subscription = data.data;
        setSubscription(subscription);
      })
      .catch((e) => {
        setNotSubscription(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const openModal = () => {
    if (!user) {
      alert.show("You must be logged in to join this channel", TIMEOUT);
      return;
    }
    setOpen(!open);
  };

  const UnSubscribe = async () => {
    setIsLoading(true);
    try {
      let id;
      const data = await genericFetch(
        `${subscriptionsUrl}${user.id}&product=${subscription_id}`,
        user.token
      );

      if (data.length > 0) {
        id = data[0].id;
      }

      if (!id) return;

      await axios.delete(`${myAccountApi}/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setIsSubscriber(false);
    } catch (e) {
      alert.error("Subscription not been cancelled", TIMEOUT);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      getSubscription();
    }
  }, [open]);

  useEffect(() => {
    if (is_subscriber) {
      setIsSubscriber(is_subscriber);
    }
  }, [is_subscriber]);

  return (
    <>
      <button
        onClick={!isSubscriber ? openModal : UnSubscribe}
        className={className}
      >
        <span className={isLoading ? "mr-2" : ""}>
          {isSubscriber ? "Unsubscribe" : "Subscribe"}
        </span>
        {isSubscriber && isLoading && (
          <SpinnerLoader
            color={"light"}
            pd={"p-0"}
            height={"20px"}
            width={"20px"}
          />
        )}
      </button>
      <Modal isOpen={open} toggle={() => setOpen(!open)} centered={true}>
        <ModalBody>
          {isLoading && <SpinnerLoader />}
          {subscription ? (
            <>
              <div className="d-flex justify-content-end">
                <span onClick={() => setOpen(!open)}>
                  <CloseIcon className="dashboard-icon pointer" />
                </span>
              </div>
              {subscription?.video_preview &&
                !onlyLettersAndNumbers(subscription?.video_preview) && (
                  <div
                    style={{
                      backgroundImage: `url(${
                        !subscription?.video_preview ? subscription?.image : ""
                      })`,
                    }}
                    className="ratio ratio-16x9 cover-bg"
                  >
                    {subscription?.video_preview &&
                      !onlyLettersAndNumbers(subscription?.video_preview) && (
                        <ReactPlayer
                          width={"100%"}
                          height={"100%"}
                          url={subscription?.video_preview}
                          controls={true}
                        />
                      )}
                  </div>
                )}

              {subscription?.video_preview &&
                onlyLettersAndNumbers(subscription?.video_preview) && (
                  <div>
                    <Stream
                      controls
                      src={subscription.video_preview}
                      height={"100%"}
                      width={"100%"}
                      responsive={false}
                      className={"ratio ratio-16x9"}
                    />
                  </div>
                )}
              <article className="main-subscription">
                <div className="subscription-avatar mt-2">
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      backgroundImage: `url(${
                        subscription?.image ? subscription.image : null
                      })`,
                    }}
                    className={"bg-cover"}
                  ></div>
                </div>
                <div className="subscription-content">
                  <h3 className="subscription-title">{subscription.title}</h3>
                </div>
                <div className="subscription-description">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: subscription.description,
                    }}
                  />
                </div>
              </article>
              <div className="subscription-footer mt-3 mb-1">
                <div className="subscription-price text-primary font-size-22">
                  <span>Subscription Price: </span>
                  <span>${subscription.price}</span>
                  <span>/month</span>
                </div>
              </div>
              <button
                onClick={() => subscribe(subscription, true)}
                className="btn btn-create rounded-lg mt-3 w-100 text-center"
              >
                {isLoadingCheckout ? <Spinner size={"sm"} color={"light"} /> : "subscribe"}
              </button>
            </>
          ) : null}
          {notSubscription ? (
            <EmptyList text={"This channel does not have a subscription"} />
          ) : null}
        </ModalBody>
      </Modal>
    </>
  );
}

export default SubscriptionButtonCreator;
