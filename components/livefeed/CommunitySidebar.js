import React, { useState } from 'react'
import { ButtonActionConnect } from '@components/connect/connect.style'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ComunityCardSidebar from './ComunityCardSidebar'
import { LoadingBtn, MoreButton } from './livefeed.style'
import { Col, Row, Spinner } from 'reactstrap'
import useSWR from "swr";
import Router from "next/router";
import {genericFetch} from "@request/creator";

function CommunitySidebar() {
  const [type, setType] = useState('active')

  const {data, isLoading: loading} = useSWR(process.env.bossApi + `/groups/?page=1&per_page=30&scope=all&status=public&type=${type}`, genericFetch)

  return (
    <div className="card-bg-light-black mt-3 pt-2 px-4 pl-4">
      <button
          className={"btn p-0 color-font mt-4 text-capitalize font-size-22 mb-2"}
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
        data.map((community) => (
          <ComunityCardSidebar key={community.id} comunity={community} />
        ))}

      {!loading && (
        <MoreButton
          className="btn"
          onClick={() => Router.push('/communities')}
        >
          {' '}
          MORE <FontAwesomeIcon icon={faAngleRight} />{' '}
        </MoreButton>
      )}
    </div>
  )
}

export default CommunitySidebar
