import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import { getAccountSetting, updateAccountSetting } from "@api/account.api";
import Login from "@components/my-settings/Login";
import MainSidebar from "@components/main/MainSidebar";
import MainLayout from "@components/main/MainLayout";
import BackButton from "@components/shared/button/BackButton";
import AccountDetail from "@components/my-settings/AccountDetail";

function LoginInformation() {
  const { user } = useContext(UserContext);
  const [setLoad, setSaveLoader] = useState(false);
  const [tabData, setTabData] = useState([]);
  const getSetting = () => {
    getAccountSetting(user, "general").then((res) => {
      setTabData(res.data);
    });
  };

  useEffect(() => {
    if (user) {
      getSetting();
    }
  }, [user]);
  return (
    <MainLayout title={"Login Information"} sidebar={<MainSidebar />}>
      <BackButton />
      <AccountDetail />
    </MainLayout>
  );
}

export default LoginInformation;
