import React, { useState } from 'react'
import { StoreWrapperCard } from './StoreVendorsCard.style'
import Link from 'next/link'
import { stringToSlug } from '../../lib/stringToSlug'
import axios from 'axios'

export default function StoreVendorsCard(props) {
  const { avatar, background, name, id } = props

  return (
    <StoreWrapperCard>
      <div className="store-content">
        <div
          className="store-info"
          style={{
            backgroundImage: `url(${background})`,
          }}
        ></div>
      </div>
      <div className="store-footer">
        <div className="store-avatar lft">
          <img src={avatar} alt="Logo" />
        </div>

        <div className="store-data-container rgt">
          <div className="store-data">
            <h2>
              <Link href={`/channel/${stringToSlug(name)}/${id}?key=timeline&tab=personal`}>
                <a>{name}</a>
              </Link>
              <div className="wcfm_vendor_badges"></div>{' '}
            </h2>

            <div className="bd_rating">
              <div className="spacer"></div>
              <div className="spacer"></div>
            </div>

            <div className="wcfm-clearfix"></div>
          </div>
        </div>
        <div className="spacer"></div>
        <Link href={`/channel/${stringToSlug(name)}/${id}?key=timeline&tab=personal`}>
          <a className="wcfmmp-visit-store">
            Visit <span>Store</span>
          </a>
        </Link>
        {/* <button
          onClick={() => createdChannel()}
          className="wcfmmp-visit-store"
        >
          {text}
        </button> */}
        {/* <button
          onClick={() => createdStream()}
          className="wcfmmp-visit-store"
        >
          {text}
        </button> */}
      </div>
    </StoreWrapperCard>
  )
}
