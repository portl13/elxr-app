import React, { useState, useEffect } from 'react'
import InfinitScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Spinner, Col } from 'reactstrap'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { LoaderContainer, LoadingBtn } from '../livefeed/livefeed.style'
import LiveFeedCard from '../livefeed/LiveFeedCard'
import { v4 as uuidv5 } from 'uuid'

export default function ChannelLiveFeed(props) {
  const { user_id } = props

  const [loader, setLoader] = useState(true)
  const [initialData, setInitialData] = useState(true)
  const [result, setResult] = useState([])
  const [loadData, setLoadData] = useState(true)
  const [size, setSize] = useState(1)

  async function getActivity(scopeName, user_id, page = 1) {
    await axios(process.env.bossApi + '/activity/', {
      method: 'GET',
      //   headers: {
      //     Authorization: `Bearer ${user?.token}`,
      //   },
      params: {
        per_page: 20,
        page: page,
        scope: 'just-me',
        user_id: user_id,
      },
    }).then((res) => {
      setInitialData(true)
      setResult((data) => [...result, ...res.data])
      setLoadData(false)
      if (res.data.length === 0) {
        setLoader(false)
      } else {
        setLoader(true)
      }
    })
  }

  const loadMore = () => {
    setSize(size + 1)
    getActivity(null, size + 1)
  }

  const handleDelete = (childData) => {
    const actId = childData
    axios(process.env.bossApi + `/activity/${actId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
    setResult(result.filter((item) => item.id !== actId))
  }

  useEffect(() => {
    if (user_id) {
      getActivity('just-me', user_id)
    }
  }, [user_id])

  return (
      <Row className="ChannelLiveFeed">
        <Col md={12}>
          <h3 className="mt-5 mb-4">Latest Activity</h3>
          {loadData === true ? (
            <p css={LoaderContainer}>
              <span>
                <FontAwesomeIcon icon={faClock} />
              </span>
              Loading your updates. Please wait.
            </p>
          ) : null}
          {!loadData ? (
            <div className="d-flex flex-column flex-fill w-100">
              <InfinitScroll
                dataLength={result.length}
                next={() => loadMore()}
                hasMore={true}
                loader={
                  loader ? (
                    <LoadingBtn>
                      Loading ...{' '}
                      <Spinner
                        style={{ width: '1.2rem', height: '1.2rem' }}
                        color="primary"
                      />
                    </LoadingBtn>
                  ) : (
                    false
                  )
                }
              >
                {result.length
                  ? result.map((act) => (
                      <LiveFeedCard
                        key={`${act.id}-${uuidv5()}`}
                        activity={act}
                        parentCallback={handleDelete}
                        activityList={result}
                        setActivityList={setResult}
                      />
                    ))
                  : ''}

                {result && !result.length && (
                  <p style={{ textAlign: 'center' }}>No More Data</p>
                )}
              </InfinitScroll>
            </div>
          ) : null}
        </Col>
      </Row>
  )
}
