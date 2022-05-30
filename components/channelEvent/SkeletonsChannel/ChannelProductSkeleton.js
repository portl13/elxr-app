import React from 'react'
import { ChannelProductStyle } from '../ChannelProduct.style'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function ChannelProductSkeleton() {
  return (
    <SkeletonTheme color="#555" highlightColor="#5b5b5d">
      <ChannelProductStyle>
        <span className="channel-product-content">
          <div className="ratio-1x1 ratio">
            <Skeleton height={700} />
          </div>
          <div className="channel-product-body py-4">
            <Skeleton width="80" />
            <span className="channel-product-price">
              <Skeleton width={60} />
            </span>
          </div>
        </span>
        <Skeleton height={50} width={430}/>
      </ChannelProductStyle>
    </SkeletonTheme>
  )
}
