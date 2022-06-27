import React from 'react'
import { Spinner } from 'reactstrap'

function ProductLoading() {
  return (
    <div className="p-5 justify-content-center d-flex">
      <span className='text-center'>
        <Spinner animation="grow" variant="primary" />
      </span>
    </div>
  )
}

export default ProductLoading
