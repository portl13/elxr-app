import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import Products from '@components/dashboard/product/Products'

function ProductsPage() {
  return (
    <DashBoard title="Products" > 
      <Products />
    </DashBoard>
  )
}

export default ProductsPage