import React, { useContext, useState, useEffect } from "react";
import MainLayout from "@components/main/MainLayout";
import SidebarWallet from "@components/my-wallet/sidebar/SidebarWallet";
import WalletTransfer from "@components/walletTranfers/WalletTransfer";
import { getBalance, transferAmount } from "@api/my-account/wallet.api";
import { UserContext } from "@context/UserContext";
import Head from "next/head";
import {genericFetch} from "@request/creator";
import useSWRImmutable from "swr/immutable";

const url =
  process.env.bossApi + "/members?scope=personal&per_page=100&user_id=";

function PageTransfer() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const [balance, setBalance] = useState(null);
  const [load, setLoad] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (user) {
      getWalletBalance();
    }
  }, [user]);

  function getWalletBalance() {
    getBalance(user).then((res) => setBalance(res.data.data));
  }

  function submit(userId, amount, note) {
    setLoad(true);
    const formData = {
      transfer_user_id: parseInt(userId),
      transfer_amount: parseFloat(amount),
      transfer_note: note,
    };
    transferAmount(user, formData).then((res) => {
      setLoad(false);
      setBalance(null);
      getWalletBalance();
      setUserId("");
      setAmount("");
      setNote("");
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), [1500]);
    });
  }

  const { data: members } = useSWRImmutable(
      token ? [`${url}${user.id}`, token] : null,
      genericFetch
  )

  return (
    <>
      <Head>
        <title>My Wallet</title>
      </Head>
      <MainLayout sidebar={<SidebarWallet />}>
        <WalletTransfer
          load={load}
          submit={submit}
          successMsg={successMsg}
          user={user}
          balance={balance}
          amount={amount}
          setAmount={setAmount}
          note={note}
          setNote={setNote}
          userId={userId}
          setUserId={setUserId}
          members={members}
        />
      </MainLayout>
    </>
  );
}

export default PageTransfer;
