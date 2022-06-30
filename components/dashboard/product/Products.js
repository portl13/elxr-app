import React, { useContext, useState } from 'react'
import { UserContext } from '@context/UserContext'
import ProductTable from './ProductTable'
import LupaIcon from '@icons/LupaIcon'
import OptionIcons from '@icons/OptionIcons'
import PlusIcon from '@icons/PlusIcon'
import Link from 'next/link'
import useDebounce from '@hooks/useDebounce'

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
          <form action="">
            <div className="input-search-contain">
              <span className="input-search-icon">
                <LupaIcon className="input-search-icon-svg" />
              </span>
              <input
                className="input-search"
                type="search"
                name="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>
          <div className=" contain-icon-border mx-3">
            <span>
              <OptionIcons className="icon-setting" />
            </span>
          </div>
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
