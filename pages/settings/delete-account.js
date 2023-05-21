import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import { getAccountSetting, updateAccountSetting } from "@api/account.api";
import MySettingsLayout from "@components/my-settings/layout/MySettingsLayout";
import DeleteAccount from "@components/my-settings/DeleteAccount";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";

const url = `${process.env.apiURl}/user/delete`

function DeleteAccountPage() {
  const { user, logOut } = useContext(UserContext);
  const token = user?.token
  const [setLoad, setSaveLoader] = useState(false);
  const [tabData, setTabData] = useState([]);
  const [alertInfo, setAlertInfo] = useState(false);

  const getSetting = () => {
    getAccountSetting(user, "delete-account").then((res) => {
      setTabData(res.data);
    });
  };

  const handleUpdateSetting = async () => {
    setSaveLoader(true)
    try {
      await axios.delete(`${url}/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      await logOut()
      router.push('/')
    } catch (error) {
    } finally {
      setSaveLoader(false)
    }
  }

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
