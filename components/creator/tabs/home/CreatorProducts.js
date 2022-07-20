import React from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import useSWR from 'swr'
import { getFetchPublic } from '@request/creator'

const productsUrl = `${process.env.courseUrl}/wcfmmp/v1/products/?author=`


function CreatorProducts({ creator_id }) {
  const { data: products } = useSWR(`${productsUrl}${creator_id}&per_page=4`, getFetchPublic)
  
  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14 mb-3">PRODUCTS</h4>
      </div>
      {/* {isLoading && <SpinnerLoader />} */}
    </div>
  )
}

export default CreatorProducts
