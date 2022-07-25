import React from "react";

function EventDetails() {
  return (
    <div className="row">
      <div className="col-12 col-lg-9">
        <div className="card-general">
          <div className="ratio ratio-16x9 bg-primary "></div>
          <div className="bg-dark p-3">
            <div className="width-250">
              <div className="d-flex align-items-center bg-dark-back px-3 py-1 ">
                <i className="mr-3">icon</i>

                <div className="d-flex flex-column">
                  <span>Live in 4 days</span>
                  <span>July 21 at 3:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-info mt-4 px-md-3">
          <h4 className="font-weight-bold">Woodland Live Creator Stream</h4>
          <span>Schedules for</span>
          <span>July 24, 2022- 3pm PST</span>
          <p className="m-0">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
            deserunt recusandae nam nemo consequatur nulla illum impedit qui
            modi nobis eius id praesentium minima, nesciunt, ad, voluptates sed
            reprehenderit. Quos!
          </p>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border py-2 px-3 px-md-3 mt-4">
            <div className="d-flex flex-column flex-md-row">
              <div className="avatar-detail "></div>
              <div className="ml-md-3 mt-2 mt-md-0">
                <h4 className="m-0 font-weight-bold">ELECTRIC WOODLAND</h4>
                <span>Music . Fork . Celtie</span>
              </div>
            </div>
            <div className="d-flex mt-2">
              <div className="position-relative">
                <button
                  className="btn btn-borde btn-border-primary text-primary"
                >
                  <span>Follow</span>
                </button>
              </div>
              <div className="position-relative">
                <button
                  className="btn btn-create rounded-lg d-flex"
                >
                  <span>Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-3"></div>
    </div>
  );
}

export default EventDetails;
