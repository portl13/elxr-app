import React, { useState } from "react";
import FollowButton from "@components/shared/button/FollowButton";
import { clean } from "@utils/cleanHtml";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

function ChannelFeaturedVideo({ channel, about, user }) {
  const [open, setOpen] = useState(false);
  const formatAbout = `${
    about && about?.length < 200 ? about : about?.slice(0, 200)
  } `;

  return (
    <>
      <section className={"creator-header"}>
        <div className="container container-creator">
          <div className="row">
            <div className="col-12 col-md-6">
              <div
                style={{
                  backgroundImage: `url(${channel?.channel_cover?.full})`,
                  borderRadius: 15,
                }}
                className={"ratio ratio-16x9 bg-gray cover-bg"}
              ></div>
            </div>

            <div
              className={`col-md-6 mt-3 mt-md-0 d-flex flex-column align-items-center`}
            >
              <div
                style={{
                  backgroundImage: `url(${
                    channel?.channel_logo ? channel?.channel_logo : ""
                  })`,
                }}
                className="contain-channel-img big bg-gray position-relative cover-bg"
              ></div>
              <h2 className={"font-size-22 mt-2"}>{channel.channel_name}</h2>
              <div className="d-flex mb-4 mt-2">
                <div className="position-relative mr-3">
                  {channel && channel?.vendor_id && (
                    <FollowButton
                      className={"btn btn-follow-button"}
                      user_id={channel.vendor_id}
                    />
                  )}
                </div>
                <div className="position-relative">
                  {/*{creator ? (*/}
                  {/*  <SubscriptionButtonCreator*/}
                  {/*    user={user}*/}
                  {/*    vendor_id={creator?.vendor_id}*/}
                  {/*    subscription_id={creator?.subscription_id}*/}
                  {/*    is_subscriber={creator?.is_subscribed}*/}
                  {/*    is_following={creator?.is_following}*/}
                  {/*    className={"btn btn-subscription-button"}*/}
                  {/*  />*/}
                  {/*) : null}*/}
                </div>
              </div>
              {about ? (
                <div>
                  {clean(formatAbout)}
                  {about?.length > 200 ? (
                    <span
                      className="pointer text-primary"
                      onClick={() => setOpen(true)}
                    >
                      more...
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <Modal size={"lg"} isOpen={open} centered toggle={() => setOpen(!open)}>
        <ModalHeader>About</ModalHeader>
        <ModalBody>
          <div
            className={"text-font"}
            dangerouslySetInnerHTML={{ __html: about }}
          />
        </ModalBody>
      </Modal>
    </>
  );
}

export default ChannelFeaturedVideo;
