import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import MyBalance from "@components/my-wallet/MyBalance";
import { UserContext } from "@context/UserContext";
import {
  getBalance,
  transferAmount,
} from "@api/my-account/wallet.api";
import WalletTransfer from "@components/walletTranfers/WalletTransfer";
import useSWRImmutable from "swr/immutable";
import {genericFetch} from "@request/creator";
import Router from "next/router";

const url = process.env.bossApi + "/members?scope=personal&per_page=100&user_id="

function TransferPage() {
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
      setTimeout(() => Router.push('/wallet/resume'), [1900]);
    });
  }

  const { data: members } = useSWRImmutable(
      token ? [`${url}${user.id}`, token] : null,
      genericFetch
  )

  return (
    <MainLayout sidebar={<MainSidebar />} title={"Transfer"}>
      <BackButton />
      <div className="container container-80">
        <div className={"d-flex justify-content-end mb-4"}>
          <MyBalance />
        </div>
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
      </div>
    </MainLayout>
  );
}

export default TransferPage;
