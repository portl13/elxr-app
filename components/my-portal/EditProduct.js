import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { getProductDetail } from "@api/channel.api";
import EditProductUi from "./EditProductUi";
function EditProduct({
  user,
  setTab,
  handleRedirect,
  hideProduct,
  setHide,
  productId,
}) {
  const router = useRouter();
  const query = router.query;
  const { id = null } = query;
  const [result, setResult] = useState("");
  useEffect(() => {
    if (id && !hideProduct) {
      fetchProductDetals(id);
    }
  }, [id]);
  useEffect(() => {
    if (productId) {
      fetchProductDetals(productId);
    }
  }, [productId]);
  const fetchProductDetals = (product_id) => {
    getProductDetail(user, product_id).then((res) => {
      setResult(res.data);
    });
  };
  return (
    <>
      <div className="wcfm-collapse-content">
        {!hideProduct && (
          <div className="wcfm-top-element-container">
            <h4 >Product Manager</h4>
          </div>
        )}
         
        <div className="wcfm-top-element-container pl-0">
          <h5 className="text-uppercase text-primary channel-title">Edit {!hideProduct ? "Product" : "Subscription Details"}</h5>
          {!hideProduct && (
            <div className="new-tag-panel">
              <Button
                type="button"
                onClick={() => handleRedirect("addproduct")}
              >
                <FontAwesomeIcon icon={faCube} />
                Add New
              </Button>
            </div>
          )}
        </div>
        <hr className="line-title w-100 mt-4 mb-1" />
        {result && (
          <EditProductUi
            handleRedirect={handleRedirect}
            product={result}
            user={user}
            hideProduct={hideProduct}
            setHide={setHide}
          />
        )}
      </div>
    </>
  );
}
export default EditProduct;
