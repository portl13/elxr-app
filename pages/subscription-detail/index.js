import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import { Spinner } from "reactstrap";
import { useRouter } from "next/router";
import { UserContext } from "../../context/UserContext";
import { getChannelPolicy, getProductDetail } from "../api/channel.api.js";
import Header from "./Header";

function SubscriptionDetailWrapper() {
  const router = useRouter();
  const query = router.query;
  const id = query.id;
  const { user } = useContext(UserContext);
  const [status, setStatus] = useState("description");
  const [channelPolicy, setChannelPolicy] = useState();
  const [result, setResult] = useState();
  const formData = {
    user_id: user?.id,
  };

  useEffect(() => {
    if (id) {
      fetchProductDetals(id);
    }
  }, [id]);
  useEffect(() => {
    if (user) {
      ChannelPolicy();
    }
  }, [user]);
  const fetchProductDetals = (product_id) => {
    getProductDetail(user, product_id).then((res) => {
      setResult(res.data);
    });
  };
  function ChannelPolicy() {
    getChannelPolicy(user, formData).then((res) => {
      setChannelPolicy(res.data);
    });
  }

  return (
    <Layout>
      <Head>
        <title>WeShare</title>
      </Head>
      {!result && (
        <Spinner
          style={{ width: "1.2rem", height: "1.2rem" }}
          color="primary"
        />
      )}
      {result && (
        <Header
          result={result}
          channelPolicy={channelPolicy}
          status={status}
          setStatus={setStatus}
        />
      )}
    </Layout>
  );
}
export default SubscriptionDetailWrapper;
