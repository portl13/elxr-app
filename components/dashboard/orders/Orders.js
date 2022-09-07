import React, { useContext, useState } from 'react'
import LupaIcon from '@icons/LupaIcon'
import OptionIcons from '@icons/OptionIcons'
import OrderTable from './OrderTable'
import { UserContext } from '@context/UserContext'
import  useDebounce  from '@hooks/useDebounce'

function Orders() {
  const { user } = useContext(UserContext)
  const [search, setSearch] = useState('')
  const debounceTerm = useDebounce(search, 500)
  return (
    <div className="container ">
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <div>
          <h2 className="title-dashboard">Orders</h2>
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
                value={search}
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
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
      <OrderTable search={debounceTerm} user={user} />
    </div>
  )
}

export default Orders
