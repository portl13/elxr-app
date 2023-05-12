import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../../../context/UserContext";
import { getNotificationDetails } from "../../../../pages/api/notification.api";
import { setNotifications } from "../../../../store/features/dash-info/dash-info-slice";
import { TIMEOUT } from "../../../../utils/constant";
import CenterLoader from "../../../CenterLoader/index";
import NoData from "../../../Nodata/index";
import GradientButton from "../../../ui/button/GradientButton";

const Notifications = () => {
  const Router = useRouter();
  const { user } = useContext(UserContext);
  const alert = useAlert();
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { notifications = [] } = useSelector((state) => state.dashInfo);

  const getNotifications = () => {
    setLoader(true);
    let data = { per_page: 20 };
    getNotificationDetails(user, data).then((res) => {
      let data = res?.data?.filter((i) => i.component != "messages");
      dispatch(setNotifications(data.reverse()));
      setLoader(false);
    });
  };

  useEffect(() => {
    if (user?.id) {
      getNotifications();
    }
  }, []);

  const extractContent = (s) => {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };
  const handleRedirect = (item) => {
    const action = item?.action;
    if (action === "new_message")
      Router.push(`/messages/compose/message/${user.id}`);
    //dispatch(setCommunityUserId(user.id));
    if (action === "update_reply" || action === "comment_reply")
      Router.push(`/activity/${item.item_id}`);
    if (
      action === "member_promoted_to_admin" ||
      action === "membership_request_rejected" ||
      action === "member_promoted_to_mod"
    )
      Router.push(`/group/group_detail/${item.item_id}?tab=feeds`);
    if (action === "membership_request_accepted")
      Router.push(
        `/profile/${user.name}/${item.user_id}?key=connections&tab=connection`
      );
    if (action === "group_invite")
      Router.push(
        `/profile/${user.name}/${item.user_id}?key=community&tab=invitation`
      );
    if (action === "bbp_new_reply") getDiscussionId(item.link_url, user);
  };

  const handleConnectionAccept = (item) => {
    const id = item?.secondary_item_id;
    axios
      .patch(
        process.env.bossApi + `/friends/${id}`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        getNotifications();
        alert.success("Connection added", TIMEOUT);
      });
  };

  const handleConnectionDecline = (item) => {
    const id = item?.secondary_item_id;
    console.log(user?.token);
    axios
      .delete(process.env.bossApi + `/friends/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        getNotifications();
        alert.success("Request declined.", TIMEOUT);
      });
  };
  return (
    <div className="dashboard-card notification-card">
      <div>
        <div className="dashboard-card-subtitle">ACTION ITEMS</div>
        <div className="dashboard-card-title">Notification</div>
      </div>
      {!loader && notifications.length === 0 && (
        <NoData text={"No Notifications yet!"} />
      )}
      <div className="notification-list-wrap">
        {/* NOTE - Notification row repeat upto 4 */}
        {loader && (
          <div className="full-page-loader">
            <CenterLoader />
          </div>
        )}
        {!loader &&
          notifications.slice(0, 4).map((item) => {
            return (
              <div
                className="notification-list-row pointer"
                onClick={() => handleRedirect(item)}
              >
                <div className="d-flex">
                  <div className="points-label">
                    <img src={item?.avatar_urls?.full} alt="icon" />
                  </div>
                  <div>
                    <div className="notification-title">
                      {extractContent(item?.description?.rendered)}
                    </div>
                    <div className="notification-time">
                      {moment(item?.date, "YYYYMMDD").fromNow()}
                    </div>
                    {item.action === "friendship_request" && (
                      <div className="d-flex align-items-center">
                        <button
                          className="decline-btn"
                          onClick={() => handleConnectionDecline(item)}
                        >
                          Decline
                        </button>
                        <GradientButton
                          style={{}}
                          type="button"
                          onClick={() => handleConnectionAccept(item)}
                        >
                          Accept
                        </GradientButton>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {notifications.length > 4 && (
        <div className="all-notification-btn">
          <a href="/notifications">See all</a>
        </div>
      )}
    </div>
  );
};

export default Notifications;
