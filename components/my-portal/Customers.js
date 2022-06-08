import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCube } from "@fortawesome/free-solid-svg-icons";
import CustomerList from "./CustomerList";
import { Input } from "reactstrap";
import {
  getCustomerList,
  updateProduct,
  deleteProduct,
} from "@api/channel.api";
import { LoaderContainer } from "../livefeed/livefeed.style";
import { wcfmStyle } from "@components/my-account/Wcfm.style";
export default function Products({ user, handleRedirect }) {
  const [page, setPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [count, setCount] = useState(0);
  const [length, setLength] = useState(0);
  const [loader, setLoader] = useState(true);
  const [loadData, setLoadData] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [spin, setSpin] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [spinId, setSpinId] = useState();

  const getCustomer = (arg = searchText) => {
    const formData = {
      start: 0,
      length: 100,
      search: arg,
    };

    getCustomerList(user, formData).then((res) => {
      setCustomers(res.data.data);
      setLength(res.data.data.length);
      setLoadData(true);
      if (res.data.data.length === 0) {
        setLoader(false);
      } else {
        setLoader(true);
      }
    });
  };
  useEffect(() => {
    getCustomer();
  }, [user]);
  // function emptyStates() {
  //   setPage(1);
  //   setCustomers([]);
  //   setCount(0);
  //   setLength(0);
  //   setLoadData(false);
  //   setLoader(true);
  // }
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setCustomers([]);
      setLength(0);
      setLoader(true);
      setLoadData(false);
      getCustomer();
    } else {
      const search = e.target ? e.target.value : e;
      setSearchText(search);
    }
  };
  const handleClear = () => {
    setSearchText("");
    getCustomer("");
  };

  // function updateProducts(childData, pName, rPrice, sPrice, type) {
  //   setCloseModal(false);
  //   const formData = {
  //     name: pName,
  //     ...(type === "simple" && { regular_price: rPrice }),
  //     ...(type === "simple" && { sale_price: sPrice }),
  //   };
  //   updateProduct(user, formData, childData)
  //     .then((res) => {
  //       var index = customers.findIndex((item) => item.id == childData);
  //       customers[index].name = res.data.name;
  //       customers[index].price_html = res.data.price_html;
  //       customers[index].regular_price = res.data.regular_price;
  //       customers[index].sale_price = res.data.sale_price;
  //       setCustomers(customers);
  //       setSpin(false);
  //       setSuccess(true);
  //       setTimeout(() => {
  //         setCloseModal(true);
  //         setSuccess(false);
  //       }, [1200]);
  //     })
  //     .catch(() => {
  //       setError(true);
  //       setSpin(false);
  //     });
  // }
  // function updateView(id, view) {
  //   const formData = {
  //     meta_data: [
  //       {
  //         key: "_wcfm_product_views",
  //         value: view + 1,
  //       },
  //     ],
  //   };
  //   updateProduct(user, formData, id)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch(() => console.log("error"));
  // }
  // function deleteProducts(childData) {
  //   setCloseModal(false);
  //   deleteProduct(user, childData)
  //     .then((res) => {
  //       setCustomers(customers.filter((item) => item.id !== childData));
  //       setCount(count - 1);
  //       setLength(length - 1);
  //       setCloseModal(true);
  //       setSpin(false);
  //     })
  //     .catch(() => console.log("error"));
  // }
  // function updateFeature(childData, value) {
  //   setSpinId(childData);
  //   setSpin(true);
  //   setCloseModal(false);
  //   const formData = {
  //     featured: value,
  //   };
  //   updateProduct(user, formData, childData)
  //     .then((res) => {
  //       var index = customers.findIndex((item) => item.id == childData);
  //       customers[index].featured = res.data.featured;
  //       setCustomers(customers);
  //       setSpin(false);
  //       setCloseModal(true);
  //     })
  //     .catch(() => console.log("error"));
  // }
  return (
    <section css={wcfmStyle}>
      <div className="wcfm-collapse-content">
        <div className="wcfm-top-element-container pl-0">
          {/* <h4>Manage Customers</h4> */}
          <h4 className="text-uppercase text-primary channel-title">
            Customers
          </h4>
          {/* <div className="new-tag-panel">
            <Button type="button" onClick={() => handleRedirect("addproduct")}>
              <FontAwesomeIcon icon={faCube} />
              Add New
            </Button>
          </div> */}
        </div>
        <hr className="line-title w-100 mt-4 mb-1" />
        <div className="wcfm-tabWrap mtop30 mt-0">
          <div className="tabWrap-header">
            <div className="dataTables_length"></div>
            <div className="search-tag">
              <label>Search:</label>
              <Input
                type="search"
                value={searchText}
                onChange={handleSearch}
                onKeyDown={handleSearch}
                onClick={handleClear}
              />
            </div>
          </div>
          <div className="wcfm-datatable">
            <div className="row-head">
              <div className="customer-div-1">Name</div>
              <div className="customer-div-2">Username</div>
              <div className="customer-div-3">Email</div>
              <div className="customer-div-4">Location</div>
              <div className="customer-div-5">Orders</div>
              <div className="customer-div-6">Money Spent</div>
              <div className="customer-div-7">Last Order</div>
              <div className="customer-div-8">Actions</div>
            </div>
            {loadData === false ? (
              <p css={LoaderContainer}>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                Loading Customer. Please wait.
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
            {customers &&
              customers.map((cust) => (
                <CustomerList
                key={cust.id}
                  customer={cust}
                  id={cust.id}
                  handleRedirect={handleRedirect}
                />
              ))}
            {length === 1 ? (
              <p className="text-left viewing-ui">Showing {length} customer</p>
            ) : length > 1 ? (
              <p className="text-left viewing-ui">
                Showing 1-{length} of {length} customer
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
