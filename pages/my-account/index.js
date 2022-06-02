import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '@context/UserContext'
import Layout from '@components/layout/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import TabContentWrapper from '@pages/my-account/TabContentWrapper'
import MyAccountMenu from '@pages/my-account/MyAccountMenu'
import { myAccountWrapper } from "@components/my-account/MyAccountWrapper.style"


function AccountWrapper() {

  const router = useRouter();
  const query = router.query;
  const { tab = null, nav = null } = query;
  const { user, setUser } = useContext(UserContext);
  const [tabName, setTab] = useState(null);
  const [innerNav, setInnerNav] = useState(null);
  const status = user?.xprofile.groups["6"]?.hasOwnProperty("fields");

  useEffect(() => {
    if (tab) setTab(tab);
  }, [tab]);
  useEffect(() => {
    if (nav) {
      setInnerNav(nav);
    }
  }, [nav]);
  const handleRedirect = (e, id) => {
    e === "orders-view" || e === "my-wallet" || e === "wallet-withdrawl"
      ? router.push(`/my-account?tab=${e}&nav=${id}`)
      : router.push(`/my-account?tab=${e}`);
    setTab(e);
    if (id) setInnerNav(id);
  };

  return (
      <Layout
        leftMenu={
          <MyAccountMenu
            setTab={setTab}
            tab={tabName}
            user={user}
            handleRedirect={handleRedirect}
            setUser={setUser}
            status={status}
          />
        }
        menuMobile={{
          type: 'my-account',
          tab: tabName,
          status
        }}
        noMenu={false}
       
      >
        <Head>
          <title>WeShare | My Account</title>
        </Head>
        <div  css={myAccountWrapper} className="my-account-wrapper">
          <TabContentWrapper
            setTab={setTab}
            tab={tabName}
            user={user}
            handleRedirect={handleRedirect}
            setUser={setUser}
            status={status}
            innerNav={innerNav}
          />
        </div>
      </Layout>
  )
}
export default AccountWrapper
