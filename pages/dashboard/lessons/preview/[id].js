import Meta from '@components/layout/Meta'
import { UserContext } from '@context/UserContext'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { genericFetch } from '@request/dashboard'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import useSWR from 'swr'

const courseApi = `${process.env.baseUrl}/wp-json/buddyboss-app/learndash/v1/lessons`

function PreviewLessons({ id }) {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const token = user?.token
  const { data: lesson } = useSWR(
    token ? [`${courseApi}/${id}/`, token] : null,
    genericFetch
  )
  return (
    <>
      <Meta />
      <Head>
        <title>LESSON PREVIEW</title>
      </Head>
      <div className="modal-full-scream">
        <div className="container px-3 px-md-5 pt-5">
          <div className="d-flex align-items-center pointer">
            <span onClick={() => router.back()} className="text-white">
              <span className="contain-icon">
                <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
              </span>
              <span className="back">Back</span>
            </span>
          </div>
          <div className="container container-80 pb-3">
            <div className="row">
              <div className="col-12">
                <div className="contain-title">
                  <h1 className="create-communities-title">
                    {lesson?.content?.title}
                  </h1>
                </div>
              </div>
              <div className="col-12">
                <div
                  dangerouslySetInnerHTML={{
                    __html: lesson?.content?.rendered,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PreviewLessons

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { id },
  }
}
