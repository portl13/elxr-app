import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faClock,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";
import { TIMEOUT } from "../../utils/constant";
import { Button, Input } from "reactstrap";
import OrderList from "./OrderList";
import { getOrderDetails } from "../../pages/api/channel.api";
import { LoaderContainer } from "../livefeed/livefeed.style";
import moment from "moment";
import DatePicker from "react-datepicker";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { wcfmStyle } from "@components/my-account/Wcfm.style";
export default function Orders({ user, handleRedirect, innerNav }) {
  const alert = useAlert();
  const [status, setStatus] = useState(innerNav);
  const [result, setResult] = useState([]);
  const [length, setLength] = useState(0);
  const [loadData, setLoadData] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectDate, setSelectDate] = useState(false);
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [callDatePicker, setCallDatePicker] = useState(false);


  const data = {
    order_status: status,
    start: 0,
    length: 1000,
    ...(searchText !== "" && { search: searchText }),
    ...(start_date && { filter_date_form: start_date }),
    ...(end_date && { filter_date_to: end_date }),
  };
  const getOrders = () => {
    getOrderDetails(user, data).then((res) => {
      setResult(res.data.data);
      setLoadData(true);
      setLength(res.data.data.length);
    });
  };
  useEffect(() => {
    if (end_date || end_date === null) {
      setResult([]);
      setLength(0);
      setLoadData(false);
    }
    getOrders();
  }, [status, end_date]);
  function emptyStates() {
    setResult([]);
    setLength(0);
    setLoadData(false);
    setSearchText("");
    setSelectDate(false);
    setStartDate(null);
    setEndDate(null);
    setCallDatePicker(false);
  }
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setResult([]);
      setLength(0);
      setLoadData(false);
      getOrders();
    } else {
      const search = e.target ? e.target.value : e;
      setSearchText(search);
    }
  };
  function getTimeValue(e) {
    var start =
      e.target.value !== null ? e.target.value.map((d) => d)[0] : null;
    var end = e.target.value !== null ? e.target.value.map((d) => d)[1] : null;
    setStartDate(start !== null ? moment(start).format("YYYY-MM-DD") : null);
    setEndDate(end !== null ? moment(end).format("YYYY-MM-DD") : null);


  }


  return (
    <section css={wcfmStyle}>
      <div className="wcfm-collapse-content">
        <div className="wcfm-top-element-container pl-0">
          <h4 className="text-uppercase text-primary channel-title">Orders</h4>
        </div>
        <hr className="line-title w-100 mt-4 mb-1" />
        <div className="wcfm-top-element-container">
          <ul className="wcfm_products_menus">
            <li className={status === "all" && "active"}>
              <Button
                onClick={() => {
                  setStatus("all");
                  emptyStates();
                  handleRedirect("order", "all");
                }}
              >
                All
              </Button>
            </li>
            <li className={status === "pending" && "active"}>
              |
              <Button
                onClick={() => {
                  setStatus("pending");
                  emptyStates();
                  handleRedirect("order", "pending");
                }}
              >
                Pending
              </Button>
            </li>
            <li className={status === "processing" && "active"}>
              |
              <Button
                onClick={() => {
                  setStatus("processing");
                  emptyStates();
                  handleRedirect("order", "processing");
                }}
              >
                Processing
              </Button>
            </li>
            <li className={status === "on-hold" && "active"}>
              |
              <Button
                onClick={() => {
                  setStatus("on-hold");
                  emptyStates();
                  handleRedirect("order", "on-hold");
                }}
              >
                On hold
              </Button>
            </li>
            <li className={status === "completed" && "active"}>
              |
              <Button
                onClick={() => {
                  setStatus("completed");
                  emptyStates();
                  handleRedirect("order", "completed");
                }}
              >
                Completed
              </Button>
            </li>
            <li className={status === "refunded" && "active"}>
              |
              <Button
                onClick={() => {
                  setStatus("refunded");
                  emptyStates();
                  handleRedirect("order", "refunded");
                }}
              >
                Refunded
              </Button>
            </li>
            {/* <li className={status === "shipped" && "active"}>
              |
              <Button
                onClick={() => {
                  setStatus("shipped");
                  emptyStates();
                  handleRedirect("order", "shipped");
                }}
              >
                Shipped
              </Button>
            </li> */}

          </ul>
          <div className="new-tag-panel">
            <Button
              type="button"
              onClick={() => alert.success("Coming Soon..", TIMEOUT)}
            >
              <FontAwesomeIcon icon={faCartPlus} />
              Add New
            </Button>
          </div>
        </div>
        <div className="wcfm-tabWrap mtop30">
          <div className="tabWrap-header">
            <div className="dataTables_length">
              {/* <Button className="btn-tag">Print</Button>
              <Button className="btn-tag">PDF</Button>
              <Button className="btn-tag">Excel</Button>
              <Button className="btn-tag">CSV</Button> */}
              <Button className="filter-button"
                onClick={() => alert.success("Coming Soon..", TIMEOUT)}>Filter by category</Button>
              {!selectDate && (
                <Button
                  className="range-button"
                  onClick={() => setSelectDate(true)}
                >
                  Choose Date Range
                </Button>
              )}
              {selectDate && (
                <div className="control-pane">
                  <link
                    href="https://cdn.syncfusion.com/ej2/material.css"
                    rel="stylesheet"
                    onLoad={() => {
                      setCallDatePicker(true);
                    }}
                  />
                  <style jsx global>{`
                    .customCSS .e-calendar .e-content .e-weekend span {
                      color: red;
                    }
                  `}</style>
                  {callDatePicker && (
                    <div className="control-section">
                      <div className="daterangepicker-control-section">
                        <DateRangePickerComponent
                          cssclassName="customCSS"
                          width="200px"
                          format="yyyy/MM/dd"
                          onChange={(e) => getTimeValue(e)}
                          
                        ></DateRangePickerComponent>
                        {/* <DatePicker
                          // selected={startDate}
                          //cssclassName="customCSS"
                          width="200px"
                          format="yyyy/MM/dd"
                          showPreviousMonths
                          onChange={(e) => getTimeValue(e)}
                          monthsShown={2}
                        /> */}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* <select>
                <option>Filter by prod..</option>
              </select>{" "}
              <select>
                <option>Show all</option>
              </select> */}
            </div>
            <div className="search-tag">
              <label>Search:</label>
              <Input
                type="search"
                value={searchText}
                onChange={handleSearch}
                onKeyDown={handleSearch}
              />
            </div>
          </div>
          <div className="wcfm-datatable">
            <div className="row-head">
              <div className="order-div-1">
                <span className="order-tag">
                  <FontAwesomeIcon icon={faEllipsisH} />
                  <span className="tooltip-panel">
                    Status<em></em>
                  </span>
                </span>
              </div>
              <div className="order-div-2">Order</div>
              <div className="order-div-3">Purchased</div>
              <div className="order-div-4">Billing Address</div>
              <div className="order-div-5">Shipping Address</div>
              <div className="order-div-6">Gross Sales</div>
              <div className="order-div-7">Earning</div>
              <div className="order-div-8">Date</div>
              <div className="order-div-9">Actions</div>
            </div>
            {loadData === false ? (
              <p css={LoaderContainer}>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                Loading Orders. Please wait.
              </p>
            ) : null}
            {length === 0 && loadData ? (
              <p css={LoaderContainer}>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                No Results.{" "}
              </p>
            ) : null}
            {loadData === true ? (
              <div className="d-flex flex-column flex-fill w-100">
                {result &&
                  result.map((order, index) => {
                    return (
                      <>
                        <OrderList
                          index={index}
                          order={order}
                          user={user}
                          id={order.id}
                          handleRedirect={handleRedirect}
                        />
                      </>
                    );
                  })}
              </div>
            ) : null}
            {length === 1 ? (
              <p className="text-left viewing-ui">Showing {length} order</p>
            ) : length > 1 ? (
              <p className="text-left viewing-ui">
                Showing 1-{length} of {length} orders
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
