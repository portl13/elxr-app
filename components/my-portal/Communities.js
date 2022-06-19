import React from "react";

function Communities() {
  return (
    <div className="container">
      <div className="d-flex  justify-content-between pt-3">
        <div>
          <h2 className="title-dashboard">Communities</h2>
        </div>
        <div className="d-flex  aling-items-center">
          <form action="">
            <input className="input-search" type="search" name="" id="" />
          </form>
          <div>
            <button className="btn bg-light btn-create">+ Create Client</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Communities;
