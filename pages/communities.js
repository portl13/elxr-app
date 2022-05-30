import Layout from '../components/layout/Layout'
import CardCommunity from '../components/layout/CardCommunity'
import { Col, Row } from 'reactstrap'
import Head from 'next/head'
import LooSkeletonCarrusel from '../components/events/helpers/LooSkeletonCarrusel'
import MessajeAlert from '../components/ui/alert/MessajeAlert'
import Router from 'next/router'
import { ButtonSmall } from '../components/ui/button/ButtonSmall'
import useAxios from 'axios-hooks'

export default function pagaCommunity() {

  const [{ data, error, loading }] = useAxios({
    url: process.env.bossApi + '/groups',
    params: { page: 1, per_page: 30 }
  })

  return (
    <Layout>
      <Head>
        <title>WeShare | communities</title>
      </Head>
      <Col className="d-flex justify-content-between mb-4" xs="12">
        <h2>Communities</h2>
        <ButtonSmall onClick={() => Router.push('/create-community')} className="btn">
          Create Community
        </ButtonSmall>
      </Col>
      {loading && <LooSkeletonCarrusel numberCard={10} />}
      <Col xs="12">
        <Row>
          {data && data.map(community => (
            <CardCommunity key={community.id} community={community} />
          ))}
        </Row>
      </Col>
      {error && <Col xs="12"> <MessajeAlert
        type="warning"
        textAlert="Not available at the moment"
        messaje=""
        typeIcon={"heart"} /> </Col>}
    </Layout>
  )
}
