import React, { useEffect, useState } from "react";
import { getAddress } from "../api/my-account/address.api";
import { Spinner } from "reactstrap";
import AddressCard from "./AddressCard";
import { getShippingAddress } from "../api/my-account/address.api";

function Address({ user, handleRedirect }) {
  const [result, setResult] = useState();
  const [shippingAdress, setShippingAddress] = useState()
  //const [spin,setSpin] = useState(false)

  useEffect(() => getAddressDetail(), []);
  function getAddressDetail() {
    getAddress(user)
      .then((res) => setResult(res.data.data))
      .catch((error) => console.log(error));
  }
  function getShippingAddressData() {
    getShippingAddress(user).then((res) => {
      setShippingAddress(res.data.data);
    })
  }
  useEffect(() => {
    getShippingAddressData()
  }, []);
  return (
    <>

      {!result && (
        <Spinner
          style={{ width: "1.2rem", height: "1.2rem" }}
          color="primary"
        />
      )}
      {result && shippingAdress && <AddressCard
        result={result}
        shippingAdress={shippingAdress}
        handleRedirect={handleRedirect}
      />}

    </>
  );
}
export default Address;
