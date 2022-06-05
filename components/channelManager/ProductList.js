import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";
import {
  faEye,
  faLink,
  faStar,
  faCopy,
  faEdit,
  faArchive,
  faTrashAlt,
  faStarOfDavid,
} from "@fortawesome/free-solid-svg-icons";
import { removeSpecailChar } from "../../utils/constant";
import QuickEdit from "./QuickEdit";
import DeleteProduct from "./DeleteProduct";
import { Spinner } from "reactstrap";
import { addProduct } from "../../pages/api/channel.api";
function ProductList({
  index,
  product,
  user,
  parentCallback,
  id,
  spin,
  setSpin,
  closeModal,
  parentView,
  error,
  setError,
  success,
  parentDelete,
  markFeature,
  spinId,
  setSpinId,
  handleRedirect,
}) {
  const [item, setItem] = useState();
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [view, setView] = useState(null);
  const [feature, setFeature] = useState(product.featured);
  const [spinLoad, setSpinLoad] = useState(false);
  useEffect(() => {
    category();
  }, []);
  useEffect(() => {
    if (closeModal) {
      setShow(false);
      setDeleteModal(false);
      setFeature(!product.featured);
    }
  }, [closeModal]);
  useEffect(() => {
    let obj = product.meta_data.find((o) => o.key === "_wcfm_product_views");
    if (obj !== undefined) {
      setView(obj.value);
    } else {
      setView("0");
    }
  }, [id]);
  const extractContent = (s) => {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };
  const category = () => {
    var cat = product.categories.find((d) => d.name === "Uncategorized")
      ? ""
      : product.categories.map((d) => d.name);
    setItem(cat);
  };
  const duplicateProduct = (productDetail) => {
    setSpinLoad(true);
    var updateMeta = productDetail.meta_data;
    var removeIndex = updateMeta.findIndex(function (o) {
      return o.key === "_wcfm_product_views";
    });
    if (removeIndex !== -1) {
      updateMeta.splice(removeIndex, 1);
    }
    const formData = {
      name: productDetail.name.concat(" (Copy)"),
      slug: productDetail.slug,
      type: productDetail.type,
      status: "draft",
      featured: productDetail.featured,
      catalog_visibility: productDetail.catalog_visibility,
      description: productDetail.description,
      short_description: productDetail.short_description,
      price: productDetail.price,
      regular_price: productDetail.regular_price,
      sale_price: productDetail.sale_price,
      on_sale: productDetail.on_sale,
      purchasable: productDetail.purchasable,
      virtual: productDetail.virtual,
      downloadable: productDetail.downloadable,
      tax_status: productDetail.tax_status,
      tax_class: productDetail.tax_class,
      manage_stock: productDetail.manage_stock,
      shipping_required: productDetail.shipping_required,
      shipping_taxable: productDetail.shipping_taxable,
      meta_data: updateMeta,
      categories:
        productDetail.categories.length === 0 ? [] : productDetail.categories,
      tags: productDetail.tags,
      images: productDetail.images,
      attributes: productDetail.attributes,
      default_attributes: productDetail.default_attributes,
      variations: productDetail.variations,
      grouped_products: productDetail.grouped_products,
      related_ids: productDetail.related_ids,
      stock_status: productDetail.stock_status,
      product_units: productDetail.product_units,
      wcfm_product_policy_data: productDetail.wcfm_product_policy_data,
      showAdditionalInfoTab: productDetail.showAdditionalInfoTab,
      store: productDetail.store,
      _links: productDetail._links,
    };
    addProduct(user, formData)
      .then((res) => {
        handleRedirect("editproduct", res.data.id);
        setSpinLoad(false);
      })
      .catch(() => console.log("error"));
  };
  return (
    <>
      <div className="column-head">
        <div className="col-div-1"> 
          <input type="checkbox" />
        </div>
        <div className="col-div-2">
          <a href="">
            <img
              src={
                product.images.map((d) => d.src)[0] === undefined
                  ? "https://data.portl.live/wp-content/uploads/woocommerce-placeholder-150x150.png"
                  : product.images.map((d) => d.src)[0]
              }
              className="img-avatar"
              alt="image"
            />
          </a>
        </div>
        <div className="col-div-3" data-label="Name">
          {product.name.match(/.{1,10}/g).join("\n")}
        </div>
        <div className="col-div-5" data-label="Status">
          <span
            className={
              product.status === "publish" ? "publish-tag" : "draft-tag"
            }
          >
            {product.status === "publish"
              ? "Published"
              : product.status === "draft"
              ? "Draft"
              : product.status === "pending"
              ? "Pending"
              : "Private"}
          </span>
        </div>
        <div className="col-div-6 instock" data-label="Stock">
          {product.stock_status === "instock" && "In stock"}
        </div>
        {extractContent(product.price_html).split(" ")[1] === undefined ||
        extractContent(product.price_html).split(" ")[1] === "" ? (
          <div className="col-div-7" data-label="Price">
            <div className="col-div-7-info">
              {extractContent(product.price_html)}  
            </div>
          </div>
        ) : (
          <div className="col-div-7" data-label="Price">
            <div className="double-price-tag">
              <span className="red-price">
                {extractContent(product.price_html).split(" ")[0]}
              </span>
              <span className="green-price">
                {extractContent(product.price_html).split(" ")[1]}
              </span>
              <span>
                {extractContent(product.price_html)
                  .split(" ")
                  .splice(2)
                  .join("\n")}
              </span>
            </div>
          </div>
        )}
        <div className="col-div-8">
          <div className="col-div-8-cotegoria">
            Categories
          </div>
          <div className="col-div-8-info">
            <span className="category-tag">{item && item.join(",\n")}</span>
          </div>
        </div>
        <div className="col-div-10 view_count" data-label="views">{view}</div>
        <div className="col-div-11" data-label="Date">
          {moment(
            product.date_created !== null 
              ? product.date_created
              : product.date_modified
          ).format("MMMM DD, YYYY")}
        </div>
        <div className="col-div-12">
          <span onClick={() => setShow(true)}>
            <FontAwesomeIcon icon={faLink} />
            <span className="tooltip-panel">
              Quick Edit<em></em>
            </span>
          </span>
          <Link href={`/products/${removeSpecailChar(product.name)}/${id}`}>
            <span onClick={() => parentView(id, parseInt(view))}>
              <FontAwesomeIcon icon={faEye} />
              <span className="tooltip-panel">
                View<em></em>
              </span>
            </span>
          </Link>
          {product.status === "publish" && (
            <>
              <span
                onClick={() => {
                  markFeature(id, feature);
                }}
              >
                <FontAwesomeIcon
                  icon={!product.featured ? faStar : faStarOfDavid}
                />
                <span className="tooltip-panel">
                  {!product.featured ? "Mark Featured" : "Not Featured"}
                  <em></em>
                </span>
                {spin && spinId === id && (
                  <Spinner style={{ width: "1.2rem", height: "1.2rem" }} />
                )}
              </span>
            </>
          )}
          <span onClick={() => duplicateProduct(product)}>
            <FontAwesomeIcon icon={faCopy} />
            <span className="tooltip-panel">
              Duplicate<em></em>
            </span>
            {spinLoad && (
              <Spinner style={{ width: "1.2rem", height: "1.2rem" }} />
            )}
          </span>
          <span onClick={() => handleRedirect("editproduct", id)}>
            <FontAwesomeIcon icon={faEdit} />
            <span className="tooltip-panel">
              Edit<em></em>
            </span>
          </span>
          {product.status === "publish" && (
            <span>
              <FontAwesomeIcon
                icon={faArchive}
                onClick={() => alert("Coming Soon..")}
              />
              <span className="tooltip-panel">
                Archive Product<em></em>
              </span>
            </span>
          )}
          <span onClick={() => setDeleteModal(true)}>
            <FontAwesomeIcon icon={faTrashAlt} />
            <span className="tooltip-panel">
              Delete<em></em>
            </span>
          </span>
        </div>
      </div>
      {show && (
        <QuickEdit
          show={show}
          setShow={setShow}
          id={id}
          parentCallback={parentCallback}
          product={product}
          spin={spin}
          setSpin={setSpin}
          error={error}
          setError={setError}
          success={success}
        />
      )}
      {deleteModal && (
        <DeleteProduct
          show={deleteModal}
          setDeleteModal={setDeleteModal}
          id={id}
          parentDelete={parentDelete}
          spin={spin}
          setSpin={setSpin}
        />
      )}
    </>
  );
}
export default ProductList;
