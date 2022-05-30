import React from 'react'
import { Row, Col } from 'reactstrap'
import ChannelProduct from './ChannelProduct'
import ChannelProductSkeleton from './SkeletonsChannel/ChannelProductSkeleton'

export default function ChannelProductsLoop(props) {
  const { products, isLoading } = props
  const skeleton = ['one', 'two', 'three', 'four']
  return (
    <Row>
      {isLoading && skeleton.map((r) => (
        <Col key={r} md={4} lg={4}>
          <ChannelProductSkeleton />
        </Col>
      ))}
      {products &&
        products.map((product) => (
          <Col key={product.id} md={4} lg={4} className="mb-4">
            <ChannelProduct product={product} />
          </Col>
        ))}
    </Row>
  )
}
