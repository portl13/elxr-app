import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.Stripe_Key);
import { Elements } from "@stripe/react-stripe-js";
import WalletTopupPayment from "@components/my-wallet/WalletTopupPayment";
import { getPaymentItentWallet } from "@request/checkout";
import { UserContext } from "@context/UserContext";
import MyBalance from "@components/my-wallet/MyBalance";

function WalletTopup() {
  const { user } = useContext(UserContext);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#e0116d",
      colorBackground: "#ffffff",
      colorText: "#000000",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  const getPaymentItent = () => {
    setError("");
    if (!amount) {
      setError("enter an amount");
      return;
    }
    setLoading(true);
    getPaymentItentWallet(user, amount)
      .then(({ data }) => {
        setClientSecret(data.data.clientSecret);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setError("your topup could not be processed");
      });
  };

  const handleChange = (e) => {
    setError("");
    setAmount(e.target.value);
  };

  return (
    <div className=" p-2">
      <MyBalance />
      <div className=" w-100">
        <label>Enter amount</label>
        <input
          onChange={handleChange}
          name="amount"
          type="number"
          min={1}
          className="input-default-43"
        />
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <WalletTopupPayment />
        </Elements>
      )}
      {!clientSecret && (
        <div className="d-flex justify-content-end">
          <div onClick={() => getPaymentItent()} className="mt-4">
            <button className="btn-create  py-1 px-4" disabled={loading}>
              {!loading ? "Add" : "Loading"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default WalletTopup;
