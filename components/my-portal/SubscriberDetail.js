import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import {
  getSubscriberDetail,
  updateSubscriberStatus,
} from "../../pages/api/channel-subscriber.api";
import { useRouter } from "next/router";
import { UserContext } from "../../context/UserContext";
import SubscriberWrapper from "./SubscriberWrapper";
function SubscriberDetail({ handleRedirect }) {
  const router = useRouter();
  const query = router.query;
  const id = parseInt(query.nav);
  const { user } = useContext(UserContext);
  const [result, setResult] = useState("");
  const [show, setShow] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    if (id) {
      fetchSubscriberDetals(id);
    }
  }, [id]);
  const fetchSubscriberDetals = (subscriber_id) => {
    getSubscriberDetail(user, subscriber_id).then((res) => {
      setResult(res.data.data);
    });
  };
  function updateStatus(subId, status) {
    const formData = {
      subscription_id: subId,
      subscription_status: status,
    };
    setShowLoader(true);
    updateSubscriberStatus(user, formData).then((res) => {
      console.log(res.data);
      setShowLoader(false);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, [1500]);
      result.subscription_status = status;
      setResult(result);
    });
  }
  return (
    <>
      <Head>
        <title>elxr | Subcriber Detail</title>
      </Head>
      {result && (
        <SubscriberWrapper
          subscriberData={result}
          handleRedirect={handleRedirect}
          updateStatus={updateStatus}
          show={show}
          showLoader={showLoader}
        />
      )}
    </>
  );
}
export default SubscriberDetail;
