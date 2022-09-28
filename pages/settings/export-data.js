import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import { getAccountSetting } from "@api/account.api";
import MySettingsLayout from "@components/my-settings/layout/MySettingsLayout";
import ExportData from "@components/my-settings/ExportData";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";

function ExportDataPage() {
  const { user, setUser } = useContext(UserContext);
  const [setLoad, setSaveLoader] = useState(false);
  const [tabData, setTabData] = useState([]);
  const [alertInfo, setAlertInfo] = useState(false);

  const getSetting = () => {
    getAccountSetting(user, "export").then((res) => {
      setTabData(res.data);
    });
  };

  const handleUpdateSetting = (fields) => {
    setSaveLoader(true);
    updateAccountSetting(user, tab, fields)
      .then((res) => {
        setSaveLoader(false);
        if (res.error && res.error.nochange)
          alert.error(res.error.nochange, TIMEOUT);
        setTimeout(() => setAlertInfo(false), [2000]);
        try {
          setUser(null);
          router.push("/");
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
    <MainLayout sidebar={<MainSidebar />} title={"Export Data"}>
      <BackButton />
      <div className="container container-80">
        <ExportData
          handleUpdateSetting={handleUpdateSetting}
          setLoad={setLoad}
          tabData={tabData}
        />
      </div>
    </MainLayout>
  );
}

export default ExportDataPage;
