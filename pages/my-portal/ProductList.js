import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import DeleteProduct from "../../components/channelManager/DeleteProduct";
import Router from "next/router";
import array_change_key_case from "locutus/php/array/array_change_key_case";
function AllProductList({
  productItem,
  parentDelete,
  spin,
  setSpin,
  id,
  closeModal,productResult,
  addCart
}) {
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);


  useEffect(() => {
    if (closeModal) {
      setDeleteModal(false);
    }
  }, [closeModal]);


  




const handleCart=(productItem)=>{
  addCart(productItem)

}

  return (
    <>
      <li>
        <div className="icon-tag">
          <a>
            <FontAwesomeIcon icon={faLink} />
          </a>
          <span>|</span>
          <a>
            <FontAwesomeIcon icon={faEdit} />
          </a>
          <span>|</span>
          <a>
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => {
                setDeleteModal(true);
              }}
            />
          </a>
        </div>
        <div className="sale-tag">SALE</div>
        <div className="image-tag">
          <img src={productItem?.images[0]?.src} alt="image" />
        </div>
        <div className="text-tag">{productItem?.name}</div>
        <div className="dollar-cut-tag">
          <span className="cut-tag">${productItem?.regular_price}</span>
          <span className="highlighted-text">${productItem?.price}</span>
        </div>
        <div className="button-panel">
          {show && (
            <div
              className="button-tag"
              onClick={() => Router.push("/viewcart")}
            >
              View cart
            </div>
          )}
          <div className="button-tag" onClick={() => {setShow(true);handleCart(productItem)}}>
            Add to cart
          </div>
        </div>
      </li>
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
export default AllProductList;
