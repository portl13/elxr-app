import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getFetchPublic } from '@request/creator'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide'
import { OPTIONS_SPLIDE_CREATOR_PRO } from '@utils/constant'

import ProCard from '../card/ProCard'
import { useEffect } from 'react'
import { chuckSize } from '@utils/chuckSize'

const url = `${process.env.apiV2}/creator?page=1&per_page=5`

function SectionPro() {
  const [creatorsChunks, setCreatorsChunks] = useState([])

  const {
    data: creators,
    error,
    isLoading,
  } = useSWR(`${url}`, getFetchPublic, {
    revalidateOnFocus: false,
  })

  useEffect(() => {
    if (creators && creators.users.length > 0) {
      setCreatorsChunks(chuckSize(creators.users, 5))
    }
  }, [creators])

  if (creators?.user?.length === 0) {
    return ''
  }

  return (
    <>
      <section className={'section-light'}>
        <div className="row mb-2 d-flex flex-row align-items-center  justify-content-between">
          <div className="section-pro col-12 col-md-8 col-lg-9">
            <div className=" d-flex flex-row align-items-center  justify-content-center">
              {creatorsChunks &&
                creatorsChunks?.map((creators, index) => (
                  <ProCard key={index} creators={creators} />
                ))}
            </div>
          </div>
          <div className=" col-12 col-md-4 col-lg-3 mb-3 mt-3 mt-lg-0 d-flex flex-column align-items-lg-start">
            <div>
              <h4 className="section-event-title-ligth font-size-28 text-white mb-0">
                World class professionals
              </h4>
              <span className="sub-title-event text-white">
                Are you ready to be part of wellness revolution?
              </span>
            </div>
            <div className="d-flex align-items-start justify-content-start mt-3">
              <span>
                <Link href="/channels">
                  <a
                    className={` text-capitalize btn-get-started nowrap mr-md-0 px-2 mb-3`}
                  >
                    GET STARTED
                  </a>
                </Link>
              </span>
            </div>
          </div>
        </div>
        {isLoading && <SpinnerLoader />}
      </section>
    </>
  )
}

export default SectionPro
