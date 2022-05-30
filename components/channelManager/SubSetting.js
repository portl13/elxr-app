import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { getProductDetails } from "../../pages/api/channel.api";
import { LoaderContainer } from "../livefeed/livefeed.style";
import EditProduct from "../../components/channelManager/EditProduct";
function SubSetting({ user, handleRedirect, setHide, hide }) {
  const [result, setResult] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const data = {
    page: 1,
    per_page: 1,
    status: "any",
    type: "subscription",
  };
  const getProducts = () => {
    getProductDetails(user, data)
      .then((res) => {
        setResult(res.data);
        setLoadData(true);
        setHide(true);
      })
      .catch(() => {
        console.log("error");
      });
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {!loadData && (
        <p css={LoaderContainer}>
          <span>
            <FontAwesomeIcon icon={faClock} />
          </span>
          Loading Screen.
        </p>
      )}
      {loadData && result && (
        <EditProduct
          user={user}
          handleRedirect={handleRedirect}
          hideProduct={hide}
          setHide={setHide}
          productId={result.map((d) => d.id)[0]}
        />
      )}
    </>
  );
}
export default SubSetting;
