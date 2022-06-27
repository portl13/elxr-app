import Meta from '@components/layout/Meta'
import {
  faArrowLeft,
  faUser,
  faWallet,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import React from 'react'

function LayoutMyAccount({ children }) {
  return (
    <div>
      <Meta />
      <Head>
        <title>MY ACCOUNT</title>
      </Head>
      <div className="container px-3 px-md-5 pt-5">
        <div className="contain-icon-back d-flex align-items-center">
          <span className="contain-icon">
            <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          </span>
          <span className="back">Back</span>
        </div>
        <div className="contain-title">
          <h1 className="create-communities-title">MY ACCOUNT</h1>
        </div>
        <div className="row py-5">
          <div className="col-3">
            <div className="border-white">
              <div className="d-flex flex-column">
                <div className="contain-btn">
                  <a className="btn btn-transparent w-100 border-small px-5 py-3">
                    <span className="contain-icons"></span>
                    Edit Profile
                  </a>
                </div>
                <div className="contain-btn">
                  <a className="btn btn-transparent w-100 border-small px-5 py-3">
                    <span className="contain-icons"></span>
                    My Wallet
                  </a>
                </div>
                <div className="contain-btn">
                  <a className="btn btn-transparent w-100 border-small px-5 py-3">
                    <span className="contain-icons"></span>
                    Settings
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutMyAccount
