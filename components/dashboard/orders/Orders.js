import React, { useContext } from 'react'
import LupaIcon from '@icons/LupaIcon'
import OptionIcons from '@icons/OptionIcons'
import OrderTable from './OrderTable'
import { UserContext } from '@context/UserContext'

function Orders() {
  const { user } = useContext(UserContext)
  return (
    <div className="container ">
      <div className="d-flex  justify-content-between">
        <div>
          <h2 className="title-dashboard">Digital Products</h2>
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
          <div className=" contain-icon-border ml-3 mr-0">
            <span>
              <OptionIcons className="icon-setting" />
            </span>
          </div>
        </div>
      </div>

      <OrderTable user={user} />
    </div>
  )
}

export default Orders
