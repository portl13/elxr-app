import React, { useContext, useEffect, useState } from "react";
import { Col } from "reactstrap";
import Head from "next/head";
import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import { UserContext } from "../../../context/UserContext";
import { getProductDetail } from "../../api/channel.api.js";
import ProductData from "@components/my-portal/ProductData";
const ProductWrapper = () => {
  const router = useRouter();
  const query = router.query;
  const { id = null } = query;
  const { user } = useContext(UserContext);
  const [result, setResult] = useState("");
  useEffect(() => {
    if (id) {
      fetchProductDetals(id);
    }
  }, [id]);
  const fetchProductDetals = (product_id) => {
    getProductDetail(user, product_id).then((res) => {
      setResult(res.data);
    });
  };
  return (
    <Layout>
      <Head>
        <title>elxr | Products</title>
      </Head>
      <Col xs="12">{result && <ProductData 
      result={result}
      user={user} 
      />}</Col>
    </Layout>
  );
};
export default ProductWrapper;
