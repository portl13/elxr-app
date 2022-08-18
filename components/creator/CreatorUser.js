import SubscriptionButton from '@components/shared/button/SubscriptionButton'
import ScrollTags from '@components/shared/slider/ScrollTags'
import ClockIcon from '@icons/ClockIcon'
import React, { useState } from 'react'
import CreatorCategory from './CreatorCategory'
import CreatorSocialList from './CreatorSocialList'

const tabs = [
  {
    tab: 'home',
    label: 'Home',
  },
  {
    tab: 'channels',
    label: 'Channels',
  },
  {
    tab: 'events',
    label: 'Events',
  },
  {
    tab: 'videos',
    label: 'Videos',
  },
  {
    tab: 'podcasts',
    label: 'Podcasts',
  },
  {
    tab: 'courses',
    label: 'Courses',
  },
  {
    tab: 'communities',
    label: 'Communities',
  },
  {
    tab: 'blog',
    label: 'Blog',
  },
  {
    tab: 'products',
    label: 'Products',
  },
  {
    tab: 'about',
    label: 'About',
  },
]

function CreatorUser({ creator, tab, setTab, user, creator_id }) {
  
  return (
    <>
      <div className="d-flex flex-column flex-md-row">
        <div
          style={{
            backgroundImage: `url(${
              creator?.vendor_shop_logo ? creator?.vendor_shop_logo : ''
            })`,
          }}
          className="contain-channel-img margin-negative bg-gray position-relative cover-bg"
        ></div>
        <div className="pl-md-3 pt-2">
          <div className="d-flex align-items-center pl-md-2 font-size-12 mt-2">
            <h1 className="m-0 font-weight-bold line-height-1 font-size-34 mr-3">
              {creator && creator.vendor_shop_name && creator.vendor_shop_name}
            </h1>
          </div>
          <div className="pl-2 pt-2">
            {creator_id && (
              <CreatorCategory id={creator_id} />
            )}
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="col-12 mt-4">
          <div className="d-flex justify-content-end align-items-center">
            <div className="d-flex mr-4">
              {creator && <CreatorSocialList social={creator.social} />}
            </div>
            <div className="d-flex">
              <div className="position-relative mr-3">
                <button
                  // onClick={() =>
                  //   router.push(`/dashboard/channel/${id}/create-event`)
                  // }
                  className="btn btn-borde btn-border-primary text-primary"
                >
                  <span>Follow</span>
                </button>
              </div>
              <div className="position-relative">
                <SubscriptionButton
                  user={user}
                  vendor_id={creator?.vendor_id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <ScrollTags>
          {tabs.map((item) => (
            <button
              key={item.tab}
              onClick={() => setTab(item.tab)}
              className={`${
                tab === item.tab ? 'active' : ''
              } btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
            >
              {item.label}
            </button>
          ))}
        </ScrollTags>
      </div>
    </>
  )
}

export default CreatorUser
