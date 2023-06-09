import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '@context/UserContext'
import Layout from '@components/layout/Layout'
import { getChannel } from '@api/channel.api'
import { Spinner } from 'reactstrap'
import Head from 'next/head'
import ChannelHeaderDetails from '@components/my-portal/ChannelHeaderDetails'
import ChannelMedia from '@components/my-portal/ChannelMedia'
import ChannelProduct from '@components/my-portal/ChannelProduct'

function ChannelWrapper() {
  const { user } = useContext(UserContext)
  const [headerDetails, setResultValue] = useState()

  function channelHeader() {
    getChannel(user).then((res) => {
      setResultValue(res.data)
    })
  }

  useEffect(() => {
    if (user) {
      channelHeader()
    }
  }, [user])

  return (
    <>
      <Layout>
        <Head>
          <title>Channel Detail - elxr</title>
        </Head>
        <div className="col-12 bg-black bd-radius">
          {!headerDetails && (
            <div className="spinner-wrapper">
              <Spinner className="spinner-image" color="primary" />
            </div>
          )}
          {headerDetails && (
            <ChannelHeaderDetails channelHeaderDetail={headerDetails} />
          )}
          {headerDetails && <ChannelMedia />}
          {headerDetails && <ChannelProduct />}
        </div>
      </Layout>
    </>
  )
}
export default ChannelWrapper
