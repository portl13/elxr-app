import React, { useContext, useState } from 'react'
import { UserContext } from '@context/UserContext'
import ProductTable from './ProductTable'

import OptionIcons from '@icons/OptionIcons'
import PlusIcon from '@icons/PlusIcon'
import Link from 'next/link'
import useDebounce from '@hooks/useDebounce'
import InputDashSearch from '@components/shared/form/InputDashSearch'

function Products() {
  const { user } = useContext(UserContext)
  const [search, setSearch] = useState('')
  const debounceTerm = useDebounce(search, 500)
  return (
    <div className="container ">
      <div className="d-flex  justify-content-between">
        <div>
          <h2 className="title-dashboard">Products</h2>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <InputDashSearch
            value={search}
            name={'search'}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="btn-create-client">
            <Link href={'/dashboard/products/add-product'}>
              <a className="btn btn-create">
                <i>
                  <PlusIcon className="btn-create-icon" />
                </i>
                <span>Add New Product</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <ProductTable search={debounceTerm} user={user} />
    </div>
  )
}

export default Products
