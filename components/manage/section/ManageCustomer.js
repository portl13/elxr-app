import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "@context/UserContext"
import useSWR from "swr"
import { genericFetch } from "@request/dashboard"
import LupaIcon from "@icons/LupaIcon"
import { Spinner } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import Pagination from "@components/shared/pagination/Pagination"
import InputDashSearch from "@components/shared/form/InputDashSearch"

const channelApi = process.env.baseUrl + "/wp-json/portl/v1/"

function ManageCustomer() {
  const { user } = useContext(UserContext)
  const { token = null } = user?.token ? user : {}
  const limit = 20
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")

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
        <div className="row d-flex  justify-content-between mb-5">
          <div className="col-12 col-md-6">
            <h4 className="list-nav-item-title pl-0">Customers</h4>
          </div>
          <div className="col-12 col-md-3">
            <InputDashSearch
              value={search}
              name={"search"}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="table custom-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Location</th>
              <th scope="col">Orders</th>
              <th scope="col">Money Spent</th>
              <th scope="col">Last Order</th>
            </tr>
          </thead>
          <tbody className="customer-table-body">
            {customers &&
              customers.data &&
              customers.data?.map((customer) => (
                <tr>
                  <td data-label="Name" scope="row">
                    {customer.name}
                  </td>
                  <td data-label="Username">{customer.username}</td>
                  <td data-label="Email">{customer.email}</td>
                  <td data-label="Location">{customer.location}</td>
                  <td data-label="Orders">{customer.orders}</td>
                  <td data-label="Money Spent">
                    {formatMoney(customer.money_spent)}
                  </td>
                  <td data-label="Last Order">{customer.last_order_id}</td>
                </tr>
              ))}
          </tbody>
        </table>

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

export default ManageCustomer
