import React, { useContext } from 'react'
import { faPlus, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserContext } from '@context/UserContext'
import ProductTable from './ProductTable'
import LupaIcon from '@icons/LupaIcon'
import OptionIcons from '@icons/OptionIcons'
import PlusIcon from '@icons/PlusIcon'
import Link from 'next/link'

function Products() {
  const { user } = useContext(UserContext)

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
                name=""
                placeholder="Search"
              />
            </div>
          </form>
          <div className=" contain-icon-border mx-3">
            <span>
              <OptionIcons className="icon-setting" />
            </span>
          </div>
          <div className="btn-create-client">
            <span className="btn-contain-icon">
              <PlusIcon className="btn-create-icon" />
            </span>
            <Link href={'/dashboard/products/add-product'}>
              <a className="btn btn-create">Add New Product</a>
            </Link>
          </div>
        </div>
      </div>
      <ProductTable user={user} />
    </div>
  )
}

export default Products
