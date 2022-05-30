import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Col, Row } from 'reactstrap'
import Layout from '../../../../components/layout/Layout'
import { useRouter } from 'next/router'
import ChannelProdutcDetail from '../../../../components/channelEvent/ChannelProdutcDetail'
import useWcfm from '../../../../hooks/useWcfm'
import ChannelProductRelated from '../../../../components/channelEvent/ChannelProductRelated'
import ChannelProductSkeleton from '../../../../components/channelEvent/SkeletonsChannel/ChannelProductSkeleton'

export default function ProductChannelPage() {
  const { query } = useRouter()

  const [relatedProductsIDs, setRelatedProductsIDs] = useState(null)

  const [idProduct, setIdProduct] = useState(null)

  const request = { method: 'GET', params: {} }

  const options = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  }

  useEffect(() => {
    if (query?.id) {
      setIdProduct(`products/${query?.id}`)
    }
  }, [query])

  const { data } = useWcfm(idProduct, request, options)

  useEffect(() =>{
    if (relatedProductsIDs) {
      return
    }
    if(data?.related_ids){
      const { related_ids } = data
      setRelatedProductsIDs(related_ids)
    }
  },[data])

  return (
    <Layout>
      <Head>
        <title>WeShare | Channel</title>
      </Head>
      <Col xs="12">{data && <ChannelProdutcDetail product={data} />}</Col>
      <Col xs={12}>
        <h3 className="mt-5 mb-4">Related Products</h3>
      </Col>
      <div className="row">
        {relatedProductsIDs &&
        relatedProductsIDs.map((id) => (
          <Col key={id} md={4} lg={3}>
            <ChannelProductRelated id={id} />
          </Col>
        ))}
      </div>
    </Layout>
  )
}
