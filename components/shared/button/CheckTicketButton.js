import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import CloseIcon from "@icons/CloseIcon";
import axios from "axios";
import { genericFetchPost } from "@request/dashboard";

const url = process.env.apiV2;

function CheckTicketButton({
  text = "Redeem Ticket",
  product_id,
  mutate,
  user,
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const openModal = () => {
    setToken("")
    setOpen(!open);
  }

  const onChange = (e) => {

    setError("");
    setToken(e.target.value);
  };

  const sendTicket = async () => {
    if (!token) {
      setError("Code Required");
      return;
    }
    setLoading(true)
    try {
      const data = await genericFetchPost(`${url}/ticket/check`, user?.token, {
        token,
        product_id,
      });

      if (data.status) {
        await mutate();
        setOpen(false)
        return;
      }
      setError("Ticket is not valid");
    } catch (e) {
      setError("An error occurred while verifying your ticket");
    }finally {
      setLoading(false)
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className={"btn btn-borde btn-border-primary text-primary"}
      >
        <span>{text}</span>
      </button>
      <Modal isOpen={open} toggle={() => setOpen(!open)} centered={true}>
        <ModalBody>
          <div className="d-flex justify-content-end mb-2">
            <span onClick={() => setOpen(!open)}>
              <CloseIcon className="dashboard-icon pointer" />
            </span>
          </div>
          <h2 className={"font-size-22"}>Enter ticket code</h2>
          <div className="redeem">
            <div className={`input-search mr-0 border-radius-35 `}>
              <label className="w-100 upload-info mb-0" htmlFor={name}>
                <div className="d-flex justify-content-between">
                  <span>
                    Code
                    <span className="text-red">*</span>
                  </span>
                  {error && (
                    <span className="invalid-feedback d-inline-block w-auto m-0">
                      {error}
                    </span>
                  )}
                </div>
                <input
                  className="bg-transparent border-0 text-white w-100 mr-0"
                  name={"code"}
                  type={"text"}
                  value={token}
                  placeholder={"Ticket code"}
                  onChange={onChange}
                />
              </label>
            </div>
          </div>
          <button
            onClick={sendTicket}
            className="btn btn-create rounded-lg mt-3 w-100 text-center"
          >
            {loading ? "Checking" : "Redeem"}
          </button>
        </ModalBody>
      </Modal>
    </>
  );
}

export default CheckTicketButton;
