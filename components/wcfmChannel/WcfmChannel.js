import React from 'react'
import { Row, Col } from 'reactstrap'
import useWcfm from '../../hooks/useWcfm'
import StoreVendorsCard from './StoreVendorsCard'
import StoreVendorsCardSkeleton from './StoreVendorsCardSkeleton'
import usePortlApi from '../../hooks/usePortlApi'

export default function WcfmChannel() {
  // store-vendors
  const { data, isLoading } = usePortlApi('channels')

  const loadingCard = [...Array(6)]

  return (
    <Row>
      {data &&
        data.map((store) => (
          <Col key={store.vendor_id} xs={12} md={6} lg={4}>
            <StoreVendorsCard
              name={store.vendor_shop_name}
              avatar={store.vendor_shop_logo}
              background={store.vendor_banner}
              id={store.vendor_id}
            />
          </Col>
        ))}
      {isLoading &&
        loadingCard.map((loading) => (
          <Col key={loading} xs={12} md={6} lg={4}>
            <StoreVendorsCardSkeleton />
          </Col>
        ))}
    </Row>
  )
}
