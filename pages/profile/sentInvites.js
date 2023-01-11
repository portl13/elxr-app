import React from "react";

export const SentInvites = () => {
  return (
    <>
      <h2>Sent Invites</h2>
      <p>You have sent invitation emails to the following people:</p>
    
      <div className="d-none d-md-flex flex-column justify-content-around table-responsive-row mt-5">
        <div className="d-md-flex justify-content-between px-2">

        <div className="table-header client_name">
          <p className="table-header-item">Name</p>
        </div>
        <div className="table-header items text-center">
          <p className="table-header-item">Email</p>
        </div>
        <div className="table-header billing_address">
          <p className="table-header-item">Invited</p>
        </div>
        <div className="table-header puchased_date text-center">
          <p className="table-header-item">Status</p>
        </div>
        </div>

      </div>
        <div className="mt-4 mt-md-2 border-white font-color px-2 py-0">

        <div className="table-responsive-row px-0 px-md-2 d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-4 border-bottom">
          <div className="client_name d-flex justify-content-between align-items-center">
            <div><p className="m-0">Amalia</p></div>
          </div>
          <div className="d-flex justify-content-between justify-content-md-center items">
            <span className="d-md-none">Email</span>
            <p className="text-success m-0">amalia@gmail.com</p>
          </div>
          <div className="d-flex justify-content-between billing_address">
            <span className="d-md-none">Invited</span>
            <p className="text-right text-md-center max-width-140 m-0">Invited</p>
          </div>
          <div className="d-flex justify-content-between justify-content-md-center puchased_date">
            <span className="d-md-none">Status</span>
            <p className="m-0">Null</p>
          </div>
        </div>
          
        </div>
    </>
  );
};
