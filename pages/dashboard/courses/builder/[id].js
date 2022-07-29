import LessonBuilderForm from '@components/dashboard/courses/LessonBuilderForm'
import Meta from '@components/layout/Meta'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

function LessonBuilder({ id }) {
  return (
    <>
      <Meta />
      <Head>
        <title>LESSON BUILDER</title>
      </Head>
      <div className="modal-full-scream">
        <div className="container px-3 px-md-5 pt-5">
          <div className="d-flex align-items-center">
            <Link href={'/dashboard/courses'}>
              <a className="text-white">
                <span className="contain-icon">
                  <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
                </span>
                <span className="back">Back</span>
              </a>
            </Link>
          </div>
          <div className="container container-80">
            <div className="row mb-4">
              <div className="col-12">
                <div className="contain-title">
                  <h1 className="create-communities-title">LESSON BUILDER</h1>
                </div>
              </div>
            </div>
            <LessonBuilderForm id={id} />
          </div>
        </div>
      </div>
    </>
  )
}

export default LessonBuilder

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { id },
  }
}
