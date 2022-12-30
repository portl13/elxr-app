import React from "react";
import { Modal, ModalBody } from "reactstrap";
import Link from "next/link";
import CloseIcon from "@icons/CloseIcon";

function AppointmentModal({ show, onHide, appointment }) {
  return (
    <Modal size="md" centered={true} isOpen={show} toggle={onHide}>
      <ModalBody>
        <div className="d-flex justify-content-between w-100 p-3">
          <h5 className={"modal-title"}>{appointment.product_title} </h5>
          <span onClick={() => onHide()} className="pointer">
            <CloseIcon className="icon-setting" />
          </span>
        </div>
        <div className="row p-3">
          <div className="col-5 p-3">Start:</div>
          <div className="col-7 p-3">{appointment.start_date}</div>
          <div className="w-100"></div>
          <div className="col-5 p-3">Duration:</div>
          <div className="col-7 p-3">{appointment.duration}</div>
          <div className="w-100"></div>
          <div className="col-5 p-3">Customer Name:</div>
          <div className="col-7 p-3">{appointment.customer_name}</div>
          <div className="w-100"></div>
          <div className="col-5 p-3">Customer Email:</div>
          <div className="col-7 p-3">{appointment.customer_email}</div>
          <div className="w-100"></div>
          <div className="col-5 p-3">Customer Phone:</div>
          <div className="col-7 p-3">{appointment.customer_phone}</div>
        </div>
        <div className="row p-3">
          <div className="col-6">
            <Link href={`/calendar-menu/appointment/${appointment.id}`}>
              <a className="btn m-0 btn-outline-primary d-block">Reschedule</a>
            </Link>
          </div>
          <div className="col-6">
            <Link href={`${appointment?.meet_link[0]?.admin_link || '#'}`}>
              <a className="m-0 btn btn-primary  w-100">Start Meeting</a>
            </Link>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default AppointmentModal;
