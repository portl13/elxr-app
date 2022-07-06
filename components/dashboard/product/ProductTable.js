import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import ProductRow from './ProductRow'
import ProductLoading from './ProductLoading'
import { getProducts } from '@request/dashboard'
import Pagination from '../Pagination'
const baseApi = `${process.env.woocomApi}/products`

function ProductTable({ user, search }) {
  const limit = 20
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('publish')
  const [totalItems, setTotalItems] = useState(null)

  const { token = null } = user?.token ? user : {}

  const { data: products, error } = useSWR(
    token
      ? [
          `${baseApi}?page=${page}&per_page=${limit}&status=${status}&search=${search}`,
          token,
        ]
      : null,
    getProducts
  )

  const isLoading = !products && !error

  useEffect(() => {
    if (products) setTotalItems(products.headers['x-wp-total'])
  }, [products])

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
  }

  return (
    <>
      <div className="d-flex justify-content-center justify-content-md-start mt-4 mb-5">
        <div className="p-1">
          <button
            onClick={() => setStatus('publish')}
            className={`btn btn-transparent ${
              status === 'publish' ? 'active' : ''
            }`}
          >
            Published
          </button>
        </div>
        <div className="p-1">
          <button
            onClick={() => setStatus('draft')}
            className={`btn btn-transparent ${
              status === 'draft' ? 'active' : ''
            }`}
          >
            Drafted
          </button>
        </div>
        <div className="p-1">
          <button
            onClick={() => setStatus('private')}
            className={`btn btn-transparent ${
              status === 'private' ? 'active' : ''
            }`}
          >
            Private
          </button>
        </div>
      </div>
      <div className="d-none d-md-flex justify-content-around table-responsive-row px-3 mb-3">
        <div className="table-header product">
          <span className="table-header-item">Product Name</span>
        </div>
        <div className="table-header stock">
          <span className="table-header-item">Stock</span>
        </div>
        <div className="table-header price">
          <span className="table-header-item">Price</span>
        </div>
        <div className="table-header category">
          <span className="table-header-item">Category</span>
        </div>
        <div className="table-header views">
          <span className="table-header-item">Views</span>
        </div>
        <div className="table-header date">
          <span className="table-header-item">Date</span>
        </div>
        <div className="table-header status">
          <span className="table-header-item">Status</span>
        </div>
        <div className="table-header action">
          <span className="table-header-item">Action</span>
        </div>
      </div>
      <div className=" border-white px-0">
        {isLoading && <ProductLoading />}
        {products?.data?.length === 0 && (
          <div className="p-5 justify-content-center d-flex">
            <h5 className="text-center text-uppercase">
              no products available
            </h5>
          </div>
        )}
        {products &&
          products?.data?.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
      </div>
      {totalItems && (
        <Pagination
          onPageChange={handlePageClick}
          pageCount={Math.ceil(totalItems / limit)}
        />
      )}
    </>
  )
}

export default ProductTable
