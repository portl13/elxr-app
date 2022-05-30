import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { StoreWrapperCard } from './StoreVendorsCard.style'

export default function StoreVendorsCardSkeleton() {
  return (
    <>
      <SkeletonTheme color="#555" highlightColor="#5b5b5d">
        <StoreWrapperCard>
          <div className="store-content">
          <Skeleton height={200}/> 
          </div>
          <div className="store-footer">
            <div className="store-avatar lft">
            <Skeleton height={80} width={80}/>
            </div>

            <div className="store-data-container rgt">
              <div className="store-data">
                <h2>
                
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
            <Skeleton className="skeleton-store" width={50} height={30}/> 
          </div>
        </StoreWrapperCard>
      </SkeletonTheme>
    </>
  )
}
