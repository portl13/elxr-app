import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCube,
  faTrash,
  faImage,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import ProductList from "./ProductList";
import { Input, Spinner, Button } from "reactstrap";
import InfinitScroll from "react-infinite-scroll-component";
import {
  getProductDetails,
  updateProduct,
  deleteProduct,
} from "@api/channel.api";
import { LoaderContainer, LoadingBtn } from "@components/livefeed/livefeed.style";
import { wcfmStyle } from "@components/my-account/Wcfm.style";
export default function Products({ user, handleRedirect, id }) {

  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [length, setLength] = useState(0);
  const [loader, setLoader] = useState(true);
  const [filter, setFilter] = useState("simple");
  const [loadData, setLoadData] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [spin, setSpin] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [spinId, setSpinId] = useState();

  const data = {
    page: page,
    per_page: 20,
    status: id,
    //type: filter,
    ...(searchText !== "" && { search: searchText }),
  };

  const totalProduct = "x-wp-total";

  const getProducts = (pages, isEmpty = false) => {
    let product = [...result];
    let listLen = length;
    let productList = isEmpty ? [] : product;
    let listLength = isEmpty ? 0 : listLen;
    isEmpty && setPage(pages);    
    getProductDetails(user, data)
      .then((res) => {
        let list = [...productList, ...res.data];
        setResult(list);
        var total =
          res.headers[totalProduct] != undefined
            ? res.headers[totalProduct]
            : null;
        page === 1 && setCount(total);
        for (var i = 1; i <= page; i++) {
          setLength(listLength + parseInt(res.data.length));
        }
        setLoadData(true);
        if (res.data.length === 0) {
          setLoader(false);
        } else {
          setLoader(true);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    getProducts();
  }, [id, page, filter]);

  function emptyStates() {
    setPage(1);
    setResult([]);
    setCount(0);
    setLength(0);
    setLoadData(false);
    setLoader(true);
  }

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setResult([]);
      setLength(0);
      setLoader(true);
      setLoadData(false);
      getProducts(1, true);
    } else {
      const search = e.target ? e.target.value : e;
      setSearchText(search);
    }
  };

  function updateProducts(childData, pName, rPrice, sPrice, type) {
    setCloseModal(false);
    const formData = {
      name: pName,
      ...(type === "simple" && { regular_price: rPrice }),
      ...(type === "simple" && { sale_price: sPrice }),
    };
    updateProduct(user, formData, childData)
      .then((res) => {
        var index = result.findIndex((item) => item.id == childData);
        result[index].name = res.data.name;
        result[index].price_html = res.data.price_html;
        result[index].regular_price = res.data.regular_price;
        result[index].sale_price = res.data.sale_price;
        setResult(result);
        setSpin(false);
        setSuccess(true);
        setTimeout(() => {
          setCloseModal(true);
          setSuccess(false);
        }, [1200]);
      })
      .catch(() => {
        console.log("error");
        setError(true);
        setSpin(false);
      });
  }

  function updateView(id, view) {
    const formData = {
      meta_data: [
        {
          key: "_wcfm_product_views",
          value: view + 1,
        },
      ],
    };
    updateProduct(user, formData, id)
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => console.log("error"));
  }

  function deleteProducts(childData) {
    setCloseModal(false);
    deleteProduct(user, childData)
      .then((res) => {
        setResult(result.filter((item) => item.id !== childData));
        setCount(count - 1);
        setLength(length - 1);
        setCloseModal(true);
        setSpin(false);
      })
      .catch(() => console.log("error"));
  }

  function updateFeature(childData, value) {
    setSpinId(childData);
    setSpin(true);
    setCloseModal(false);
    const formData = {
      featured: value,
    };
    updateProduct(user, formData, childData)
      .then((res) => {
        var index = result.findIndex((item) => item.id == childData);
        result[index].featured = res.data.featured;
        setResult(result);
        setSpin(false);
        setCloseModal(true);
      })
      .catch(() => console.log("error"));
  }

  return (
    <section css={wcfmStyle}>
      <div className="wcfm-collapse-content">
        <div className="wcfm-top-element-container pl-0">
          <h4 className="text-uppercase text-primary channel-title">Product Manager</h4>
        </div>
        <hr className="line-title w-100 mt-4 mb-1" />
        <div className="wcfm-top-element-container">
          <ul className="wcfm_products_menus">
            <li className={id === "any" ? "active" : ""}>
              <Button
                onClick={() => {
                  emptyStates();
                  setFilter("simple");
                  setSearchText("");
                  handleRedirect("store","product", "any");
                }}
              >
                All{" "}
                {count !== null &&
                  id === "any" &&
                  count !== 0 &&
                  `(${count})`}
              </Button>
            </li>
            <li className={id === "publish" ? "active" : ""}>
              |
              <Button
                onClick={() => {
                  emptyStates();
                  setFilter("simple");
                  setSearchText("");
                  handleRedirect("store","product", "publish");
                }}
              >
                Published
                {count !== null &&
                  id === "publish" &&
                  count !== 0 &&
                  `(${count})`}
              </Button>
            </li>
            <li className={id === "draft" ? "active" : ""}>
              |
              <Button
                onClick={() => {
                  emptyStates();
                  setFilter("simple");
                  setSearchText("");
                  handleRedirect("store","product", "draft");
                }}
              >
                Draft
                {count !== null &&
                  id === "draft" &&
                  count !== 0 &&
                  `(${count})`}
              </Button>
            </li>
            <li className={id === "pending" ? "active" : ""}>
              |
              <Button
                onClick={() => {
                  emptyStates();
                  setFilter("simple");
                  setSearchText("");
                  handleRedirect("store","product", "pending");
                }}
              >
                Pending
                {count !== null &&
                  id === "pending" &&
                  count !== 0 &&
                  `(${count})`}
              </Button>
            </li>
            <li className={id === "private" ? "active" : ""}>
              |
              <Button
                onClick={() => {
                  emptyStates();
                  setFilter("simple");
                  setSearchText("");
                  handleRedirect("store","product", "private");
                }}
              >
                Archived
                {count !== null &&
                  id === "private" &&
                  count !== 0 &&
                  `(${count})`}
              </Button>
            </li>
          </ul>
          <div className="new-tag-panel">
            <Button type="button" onClick={() => handleRedirect("addproduct")}>
              <FontAwesomeIcon icon={faCube} />
              Add New
            </Button>
          </div>
        </div>
        <div className="wcfm-tabWrap mtop30">
          <div className="tabWrap-header">
            <div className="dataTables_length end align-md-items-center">
              <span>
                Show
              </span>
              <select>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span>
                entries
              </span>
            </div>
            <div className="dataTables_length d-flex  flex-column flex-md-row  columna">
              <select className="mx-0 mx-md-1 form-control mb-2 mb-md-0">
                <option>Filter by category</option>
              </select>
              <Input
              className="mx-0 mx-md-1"
                type="select"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  emptyStates();
                }}
              >
                <option value="simple">Simple Product</option>
                <option value="variable">Variable Product</option>
                <option value="grouped">Grouped Product</option>
                <option value="external">External/Affiliate Product</option>
              </Input>
              <Button className="bulk-button">Bulk Edit</Button>
              <a href="" className="delete-button">
                <FontAwesomeIcon icon={faTrash} />
                <span className="tooltip-panel">
                  Delete<em></em>
                </span>
              </a>
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
              <div className="col-div-1">
                <input type="checkbox" />
              </div>
              <div className="col-div-2">
                <FontAwesomeIcon icon={faImage} />
                <span className="tooltip-panel">
                  Image<em></em>
                </span>
              </div>
              <div className="col-div-3">Name</div>
              <div className="col-div-5">Status</div>
              <div className="col-div-6">Stock</div>
              <div className="col-div-7">Price</div>
              <div className="col-div-8">Taxonomies</div>
              <div className="col-div-10">
                <FontAwesomeIcon icon={faEye} />
                <span className="tooltip-panel">
                  Views<em></em>
                </span>
              </div>
              <div className="col-div-11">Date</div>
              <div className="col-div-12">Actions</div>
            </div>
            {loadData === false ? (
              <p css={LoaderContainer}>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                Loading Products. Please wait.
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
                <InfinitScroll
                  dataLength={result.length}
                  next={() => result.length && setPage(page + 1)}
                  hasMore={true}
                  loader={
                    loader ? (
                      <LoadingBtn>
                        Loading ...{" "}
                        <Spinner
                          style={{ width: "1.2rem", height: "1.2rem" }}
                          color="primary"
                        />
                      </LoadingBtn>
                    ) : (
                      <p style={{ textAlign: "center" }}>No More Data</p>
                    )
                  }
                >
                  {result &&
                    result.map((product, index) => {
                      return (
                          <ProductList
                            index={index}
                            product={product}
                            user={user}
                            parentCallback={updateProducts}
                            id={product.id}
                            key={product.id}
                            spin={spin}
                            setSpin={setSpin}
                            closeModal={closeModal}
                            parentView={updateView}
                            error={error}
                            setError={setError}
                            success={success}
                            parentDelete={deleteProducts}
                            markFeature={updateFeature}
                            spinId={spinId}
                            setSpinId={setSpinId}
                            handleRedirect={handleRedirect}
                          />
                      );
                    })}
                </InfinitScroll>
              </div>
            ) : null}
            {length === 1 ? (
              <p className="text-left viewing-ui">Showing {length} product</p>
            ) : length > 1 ? (
              <p className="text-left viewing-ui">
                Showing 1-{length} of {count} products
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
