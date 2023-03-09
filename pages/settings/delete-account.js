import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import { getAccountSetting, updateAccountSetting } from "@api/account.api";
import MySettingsLayout from "@components/my-settings/layout/MySettingsLayout";
import DeleteAccount from "@components/my-settings/DeleteAccount";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";

function DeleteAccountPage() {
  const { user, logOut } = useContext(UserContext);
  const [setLoad, setSaveLoader] = useState(false);
  const [tabData, setTabData] = useState([]);
  const [alertInfo, setAlertInfo] = useState(false);

  const getSetting = () => {
    getAccountSetting(user, "delete-account").then((res) => {
      setTabData(res.data);
    });
  };

  const handleUpdateSetting = (fields) => {
    setSaveLoader(true);
    updateAccountSetting(user, "delete-account", fields)
      .then((res) => {
        setSaveLoader(false);
        if (res.error && res.error.nochange)
          alert.error(res.error.nochange, TIMEOUT);
        setTimeout(() => setAlertInfo(false), [2000]);
        try {
          logOut();
        } catch (error) {}
      })
      .catch(() => {
        setSaveLoader(false);
      });
  };

  useEffect(() => {
    if (user) {
      getSetting();
    }
  }, [user]);

  return (
    <MainLayout sidebar={<MainSidebar />} title={"Delete Account"}>
      <BackButton />
      <div className="container container-80">
        <DeleteAccount
          handleUpdateSetting={handleUpdateSetting}
          setLoad={setLoad}
          tabData={tabData}
          user={user}
        />
      </div>
    </MainLayout>
  );
}

export default DeleteAccountPage;
