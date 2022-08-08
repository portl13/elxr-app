import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '@context/UserContext'
import LupaIcon from '@icons/LupaIcon'
import { Spinner } from 'reactstrap'
import useSWR from 'swr'
import { genericFetch } from '@request/dashboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import Pagination from '@components/shared/pagination/Pagination'

const channelApi = process.env.baseUrl + '/wp-json/portl/v1/'

function Customer() {
  const { user } = useContext(UserContext)
  const { token = null } = user?.token ? user : {}
  const limit = 20
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')

  const { data: customers, error } = useSWR(
    token
      ? [
          `${channelApi}customers/?length=${limit}&start=${
            (page - 1) * limit
          }&search=${search}`,
          token,
        ]
      : null,
    genericFetch
  )

  console.log(
    '🚀 ~ file: Customer.js ~ line 21 ~ Customer ~ customers',
    customers
  )

  const isLoading = !customers && !error

  const formatMoney = (value) => {
    return Number(value).toFixed(2)
  }

  useEffect(() => {
    if (customers && customers.total_items) {
      setTotal(customers.total_items)
    }
  }, [customers])

  return (
    <>
      <div className="container">
        <div className="d-flex  justify-content-between mb-5">
          <div>
            <h2 className="title-dashboard">Customers</h2>
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
                />
              </div>
            </form>
          </div>
        </div>

        <div className="d-none d-md-flex justify-content-around table-responsive-row px-3">
          <div className="table-header name">
            <p className="table-header-item">Name</p>
          </div>
          <div className="table-header username">
            <p className="table-header-item">Username</p>
          </div>
          <div className="table-header items email_customer">
            <p className="table-header-item">Email</p>
          </div>
          <div className="table-header location">
            <p className="table-header-item">Location</p>
          </div>
          <div className="table-header orders text-center">
            <p className="table-header-item">Orders</p>
          </div>
          <div className="table-header money_spent d-flex justify-content-md-center">
            <p className="table-header-item">Money Spent</p>
          </div>
          <div className="table-header last_order d-flex justify-content-md-center">
            <p className="table-header-item">Last Order</p>
          </div>
          <div className="table-header actions d-flex justify-content-md-end">
            <p className="table-header-item">Actions</p>
          </div>
        </div>

        <div className=" border-white px-0 pb-0">
          {isLoading && (
            <div className="p-5 justify-content-center d-flex">
              <span className="text-center">
                <Spinner animation="grow" variant="primary" />
              </span>
            </div>
          )}

          {customers?.length === 0 && (
            <div className="p-5 justify-content-center d-flex">
              <h5 className="text-center text-uppercase">no customers</h5>
            </div>
          )}
          {customers &&
            customers.data &&
            customers.data?.map((customer) => (
              <div
                key={customer.id}
                className="table-responsive-row d-flex flex-column flex-md-row  align-items-md-center py-4 px-3  border-bottom customer-table"
              >
                <div className="d-flex justify-content-between name d-md-block">
                  <span className="d-md-none">Name</span>
                  <p className="m-0">{customer.name}</p>
                </div>
                <div className="d-flex justify-content-between username d-md-block">
                  <span className="d-md-none">Username</span>
                  <p className="m-0">{customer.username}</p>
                </div>
                <div className="d-flex justify-content-between email_customer d-md-block">
                  <span className="d-md-none">Email</span>
                  <p className="m-0">{customer.email}</p>
                </div>
                <div className="d-flex justify-content-between location d-md-block">
                  <span className="d-md-none">Location</span>
                  <p className="m-0">{customer.location}</p>
                </div>
                <div className="d-flex justify-content-between orders d-md-block ">
                  <span className="d-md-none">Orders</span>
                  <p className="m-0">{customer.orders}</p>
                </div>
                <div className="d-flex justify-content-between money_spent d-md-block">
                  <span className="d-md-none">Money Spent</span>
                  <p className="m-0">{formatMoney(customer.money_spent)}</p>
                </div>
                <div className="d-flex justify-content-between last_order d-md-block">
                  <span className="d-md-none">Last Order</span>
                  <p className="m-0">{customer.last_order_id}</p>
                </div>
                <div className="d-flex justify-content-between actions d-md-block text-center">
                  <span className="d-md-none"></span>
                  <p className="m-0">
                    <span>
                      <FontAwesomeIcon
                        className="icon-setting"
                        icon={faEllipsisH}
                      />
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-end">
            <Pagination
              totalCount={total || 0}
              onPageChange={setPage}
              currentPage={page}
              pageSize={limit}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Customer
