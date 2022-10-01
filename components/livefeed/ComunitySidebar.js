import React, { useState } from 'react'
import { ButtonActionConnect } from '@components/connect/connect.style'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useAxios from 'axios-hooks'
import ComunityCardSidebar from './ComunityCardSidebar'
import { liveFeedTitle, LoadingBtn, MoreButton } from './livefeed.style'
import { Col, Row, Spinner } from 'reactstrap'

function ComunitySidebar() {
  const [type, setType] = useState('active')

  const [{ data, loading, error: groupsError }, refetch] = useAxios({
    url: process.env.bossApi + '/groups/',
    params: { page: 1, per_page: 30, scope: 'all', type: type },
  })

  return (
    <div className="card-bg-light-black mt-3 pt-2 px-4 pl-4">
      <button
          className={"btn p-0 text-white mt-4 text-capitalize font-size-22 mb-2"}
        onClick={() => Router.push('/communities-details')}
      >
        Communities
      </button>

      <Row className="mb-1">
        <Col xs="12">
          <ButtonActionConnect
            active={type === 'popular'}
            onClick={() => setType('popular')}
            className="font-size-12"
          >
            Popular
          </ButtonActionConnect>

          <ButtonActionConnect
            active={type === 'active'}
            onClick={() => setType('active')}
            className="font-size-12"
          >
            Active
          </ButtonActionConnect>

          <ButtonActionConnect
            active={type === 'newest'}
            onClick={() => setType('newest')}
            className="font-size-12"
          >
            Newest
          </ButtonActionConnect>
        </Col>
      </Row>
      {loading && (
        <LoadingBtn>
          Loading community ..{' '}
          <Spinner
            style={{ width: '1.2rem', height: '1.2rem' }}
            color="primary"
          />
        </LoadingBtn>
      )}
      {!loading &&
        data &&
        data.map((comunity) => (
          <ComunityCardSidebar key={comunity.id} comunity={comunity} />
        ))}
      {!loading && (
        <MoreButton
          className="btn"
          onClick={() => Router.push('/communities-details')}
        >
          {' '}
          MORE <FontAwesomeIcon icon={faAngleRight} />{' '}
        </MoreButton>
      )}
    </div>
  )
}

export default ComunitySidebar
