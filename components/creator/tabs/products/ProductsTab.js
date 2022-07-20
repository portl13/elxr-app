import React, { useState } from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import useSWR from 'swr'
import { getFetchPublic } from '@request/creator'
import ProductCard from '@components/creator/cards/ProductCard'
import usePortlApi from '@hooks/usePortlApi'

const productsUrl = `${process.env.courseUrl}/wcfmmp/v1/products/?id=`

function ProductsTab({ creator_id }) {
  const [page, setPage] = useState(1)
  const { data: products, isLoading } = usePortlApi(
    `channel/product/?id=${creator_id}&page=${page}&per_page=12`
  )
  return (
    <div className="row mt-5">
      {isLoading && <SpinnerLoader />}
      {products &&
        products.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      {products && products.length === 0 && (
        <h3 className="col display-4">You have not created any product yet</h3>
      )}
    </div>
  )
}

export default ProductsTab
