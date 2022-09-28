import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "@context/UserContext";
import {getAccountSetting, updateAccountSetting} from "@api/account.api";
import Notifications from "@components/my-settings/Notifications";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import {myAccountWrapper} from "@components/my-account/MyAccountWrapper.style";
import {MySettingsStyle} from "@components/my-settings/MySettingsStyle";
import BackButton from "@components/shared/button/BackButton";

function EmailPreferences() {
    const { user, setUser } = useContext(UserContext)
    const [setLoad, setSaveLoader] = useState(false)
    const [tabData, setTabData] = useState([])
    const [alertInfo, setAlertInfo] = useState(false)

    const getSetting = () => {
        getAccountSetting(user, 'notifications').then((res) => {
            setTabData(res.data)
        })
    }

    const handleUpdateSetting = (fields) => {
        setSaveLoader(true)
        updateAccountSetting(user, 'notifications', fields)
            .then((res) => {
                setSaveLoader(false)
                if (res.error && res.error.nochange)
                    alert.error(res.error.nochange, TIMEOUT)
                setTimeout(() => setAlertInfo(false), [2000])
                try {
                    setUser(null)
                    router.push('/')
                } catch (error) {}
            })
            .catch(() => {
                setSaveLoader(false)
            })
    }

    useEffect(() => {
        if (user) {
            getSetting()
        }
    }, [user])

    return (
        <MainLayout sidebar={<MainSidebar />} title={"Email Preferences"}>
            <div css={myAccountWrapper}>
                    <BackButton />
                <div css={MySettingsStyle} className={"container container-80 bg-new p-4"}>
                    <Notifications
                        handleUpdateSetting={handleUpdateSetting}
                        setLoad={setLoad}
                        tabData={tabData}
                    />
                </div>
            </div>
        </MainLayout>
    )
}

export default EmailPreferences;