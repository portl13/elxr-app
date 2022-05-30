import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  Label,
  Input,
  Spinner,
  Alert,
} from "reactstrap";
import { uploadModal } from "../../components/livefeed/photo.style";
export default function QuickEdit({
  show,
  setShow,
  id,
  parentCallback,
  product,
  spin,
  setSpin,
  error,
  setError,
  success,
}) {
  const [pName, setPName] = useState(product.name);
  const [rPrice, setRPrice] = useState(product.regular_price);
  const [sPrice, setSPrice] = useState(product.sale_price);
  const [msg, setMsg] = useState(false);
  function updateProduct() {
    setSpin(true);
    parentCallback(id, pName, rPrice, sPrice, product.type);
  }
  function retailPrice(e) {
    const exp = /^\d*\.?\d{0,2}$/;
    if (e.target.value === "" || exp.test(e.target.value)) {
      setRPrice(e.target.value);
    }
  }
  function sellPrice(e) {
    const exp = /^\d*\.?\d{0,2}$/;
    if (e.target.value === "" || exp.test(e.target.value)) {
      setSPrice(e.target.value);
    }
  }
  function getName(e) {
    var value =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setPName(value);
  }
  return (
    <>
      <Modal
        className="modal-dialog-centered modal-sm quick-dialog"
        isOpen={show}
        css={uploadModal}
      >
        <ModalBody>
          <h4>
            Quick Update
            <span
              onClick={() => {
                setShow(false);
              }}
            >
              +
            </span>
          </h4>
          <div className="col-12-tag error-tag">
            <Label>Product Name *</Label>
            <Input
              type="text"
              value={pName}
              maxLength="100"
              onChange={(e) => {
                getName(e);
                setMsg(false);
              }}
            />
          </div>
          {product.type === "simple" && (
            <div className="col-12-tag">
              <Label>Regular Price</Label>
              <Input
                type="text"
                value={rPrice}
                onChange={(e) => retailPrice(e)}
                maxLength="10"
              />
            </div>
          )}
          {product.type === "simple" && (
            <div className="col-12-tag">
              <Label>Sale Price</Label>
              <Input
                type="text"
                value={sPrice}
                onChange={(e) => sellPrice(e)}
                maxLength="10"
              />
            </div>
          )}
          {msg && <Alert color="danger">Product name cannot be blank.</Alert>}
          {error && (
            <Alert color="warning">SKU must be unique identifier.</Alert>
          )}
          {success && (
            <Alert color="success">Product update successfully.</Alert>
          )}
          <div className="button-tag">
            <Button
              color="secondary-text"
              onClick={() => {
                setShow(false);
                setSpin(false);
                setError(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="yes-btn"
              onClick={() => {
                pName === "" ? setMsg(true) : updateProduct();
              }}
            >
              {spin && (
                <Spinner style={{ width: "1.2rem", height: "1.2rem" }} />
              )}
              {""}Yes
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
