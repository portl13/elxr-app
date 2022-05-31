import React from 'react'
import { useRouter } from 'next/router'
import { Col, Row } from 'reactstrap'
import Layout from '../../../../components/layout/Layout'

import LooSkeletonCarrusel from '../../../../components/events/helpers/LooSkeletonCarrusel'
import LoopCardCarrousel from '../../../../components/events/real/LoopCardCarrousel'

import MessajeAlert from '../../../../components/ui/alert/MessajeAlert'
import useCategoryRealEvent from '../../../../hooks/useCategoryRealEvent'
import GeoPositionProvider from '../../../../context/GeoPositionContext'

const EventsByCategoryPage = ({ category }) => {
  const capitalize = (string) => {
    if (!string) return
    return string[0].toUpperCase() + string.slice(1)
  }

  const { data, error } = useCategoryRealEvent(capitalize(category))

  const isLoading = !data && !error

  const noEvent = data && data.items.length === 0
  return (
    <>
      {isLoading && <LooSkeletonCarrusel />}

      {data && <LoopCardCarrousel events={data.items} />}
      {noEvent && (
        <Col className="mb-5" xs="12">
          {' '}
          <MessajeAlert
            typeIcon={'heart'}
            messaje={`we cannot find ${category} events in your location or date`}
            type={'danger'}
            textAlert={'Sorry!'}
          />{' '}
        </Col>
      )}

      {error && (
        <Col className="mb-5" xs="12">
          {' '}
          <MessajeAlert
            typeIcon={'heart'}
            messaje={`we cannot find ${category} events in your location or date`}
            type={'danger'}
            textAlert={'Sorry!'}
          />{' '}
        </Col>
      )}
    </>
  )
}

export default function RealOnlineByCategory() {
  const router = useRouter()

  const { category } = router.query

  return (
    <GeoPositionProvider>
      <Layout>
        <Col className="mb-3" xs="12">
          <Row>
            <Col xs="12">
              <h2 className="text-capitalize">{category}</h2>
            </Col>

            <EventsByCategoryPage category={category} />
          </Row>
        </Col>
      </Layout>
    </GeoPositionProvider>
  )
}
