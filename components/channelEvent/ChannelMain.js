import React, { useState, useEffect } from 'react'
import { Col, Row } from 'reactstrap'
import ChannelHeader from './ChannelHeader'
import ChannelTabs from './ChannelTabs'
import ChannelProductsLoop from './ChannelProductsLoop'
import usePortlApi from '../../hooks/usePortlApi'
import ChannelHeaderSkeleton from './SkeletonsChannel/ChannelHeaderSkeleton'
import ChannelAbout from './ChannelAbout'
import ChannelPolicie from './ChannelPolicie'
import ChannelFollowers from './ChannelFollowers'

export default function ChannelMain(props) {
  const { vendor_id, setChannelData } = props
  const [tab, setTab] = useState(1)
  const [totalFollowers, setTotalFollowers] = useState(null)

  
  const { data: dataStore, isLoading: isLoadingStore } = usePortlApi(
    `channel?user_id=${vendor_id}`
  )
  const { data: dataProduct, isLoading: isLoadingProduct } = usePortlApi(
    `channel/product/?id=${vendor_id}&per_page=4`
  )
  const { data: dataFollowers, isLoading: isLoadingFollowers } = usePortlApi(
    `channel/followers?user_id=${vendor_id}`
  )

  useEffect(()=>{
    if (!dataStore) return
    setChannelData(dataStore)
  },[dataStore])

  useEffect(() => {
    if (!dataFollowers) return
    setTotalFollowers(dataFollowers?.data?.length)
  }, [dataFollowers])

  return (
    <section className="container ChannelMain">
      <Row>
        <Col md={12}>
          {isLoadingStore && <ChannelHeaderSkeleton />}
          {dataStore && <ChannelHeader channel={dataStore} followers={dataFollowers} />}
          <div className="d-flex pb-2 justify-content-center">
         </div>
        </Col>
      </Row>
      <ChannelTabs {...{ tab, setTab, totalFollowers,  channel: dataStore}} />
      {tab === 1 && (
        <ChannelProductsLoop
          products={dataProduct}
          isLoading={isLoadingProduct}
        />
      )}
      {tab === 2 && (
        <ChannelAbout data={dataStore} isLoading={isLoadingStore} />
      )}
      {tab === 3 && (
        <ChannelPolicie data={dataStore} isLoading={isLoadingStore} />
      )}
      {tab === 4 && (
        <ChannelFollowers data={dataFollowers} isLoading={isLoadingFollowers} />
      )}
    </section>
  )
}
