import React, { useContext } from "react";
import useSWR from "swr";
import { UserContext } from "@context/UserContext";
import { genericFetch } from "@request/dashboard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import WalletList from "@components/my-wallet/WalletList";

const url = `${process.env.myAccount}/wallet/transactions`;

function WalletBalance() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const { data } = useSWR(token ? [url, token] : null, genericFetch);

  const isLoading = !data;

  return (
    <>
      {isLoading && <SpinnerLoader />}
      {data && data.data && <WalletList result={data.data} />}
    </>
  );
}

export default WalletBalance;
