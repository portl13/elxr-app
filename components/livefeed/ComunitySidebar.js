
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

    <div className="bg-black bd-radius px-2 pl-4">
      <ButtonActionConnect
        css={liveFeedTitle}
        onClick={() => Router.push('/communities-details')}
      >
        Communities
      </ButtonActionConnect>

      <Row className="mb-3">
        <Col  xs="12">
          <ButtonActionConnect
            active={type === 'newest'}
            onClick={() => setType('newest')}
          >
            Newest
          </ButtonActionConnect>
          <ButtonActionConnect
            active={type === 'active'}
            onClick={() => setType('active')}
          >
            Active
          </ButtonActionConnect>
          <ButtonActionConnect
            active={type === 'popular'}
            onClick={() => setType('popular')}
          >
            Popular
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
      {data &&
        data.map((comunity) => (
          <ComunityCardSidebar key={comunity.id} comunity={comunity} />
        ))}
      <MoreButton
        className="btn"
        onClick={() => Router.push('/communities-details')}
      >
        {' '}
        MORE <FontAwesomeIcon icon={faAngleRight} />{' '}
      </MoreButton>
    </div>
  )
}

export default ComunitySidebar
