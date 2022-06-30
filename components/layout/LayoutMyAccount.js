import React from 'react'
import Meta from '@components/layout/Meta'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import UserIcon from '@icons/UserIcon'
import WalletIcon from '@icons/WalletIcon'
import SettingIcon from '@icons/SettingIcon'

function LayoutMyAccount({ children }) {
  const router = useRouter()
  return (
    <div>
      <Meta />
      <Head>
        <title>MY ACCOUNT</title>
      </Head>
      <div className="container px-3 px-md-5 pt-5">
        <div
          onClick={() => {
            router.back()
          }}
          className="contain-icon-back d-flex align-items-center pointer"
        >
          <span className="contain-icon">
            <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          </span>
          <span className="back">Back</span>
        </div>
        <div className="contain-title mt-5">
          <h1 className="my-account-title">MY ACCOUNT</h1>
        </div>
        <div className="row py-5">
          <div className="d-none d-md-block col-3">
            <div className="border-white">
              <div className="contain-btn mb-2">
                <button
                  onClick={() => router.replace('/dashboard/my-account')}
                  className={`btn btn-transparent d-flex w-100 border-small  py-3 ${
                    router.asPath === '/dashboard/my-account' ? 'active' : ''
                  }`}
                >
                  <span className="contain-icons">
                    <UserIcon className={'my-account-icon'} />
                  </span>
                  <span className='font-size-17'>Edit Profile</span>
                </button>
              </div>
              <div className="contain-btn mb-2">
                <button
                  onClick={() => router.replace('/dashboard/wallet')}
                  className={`btn btn-transparent d-flex w-100 border-small  py-3 ${
                    router.asPath === '/dashboard/wallet' ? 'active' : ''
                  }`}
                >
                  <span className="contain-icons">
                    <WalletIcon className={'my-account-icon'} />
                  </span>
                  <span  className='font-size-17'>My Wallet</span>
                </button>
              </div>
              <div className="contain-btn">
                <button className="btn btn-transparent d-flex w-100 border-small  py-3">
                  <span className="contain-icons">
                    <SettingIcon className={'my-account-icon'} />
                  </span>
                  <span  className='font-size-17'>Settings</span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-9 container-my-account">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default LayoutMyAccount
