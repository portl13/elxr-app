import { faClock, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Events() {
  return (
    <div className="container">
      <div className="d-flex  justify-content-between  pt-3 ">
        <div>
          <h2 className="title-dashboard">Events</h2>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <form action="">
            <div className="input-search-contain">
              <span className="input-search-icon">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                className="input-search"
                type="search"
                name=""
                id=""
                placeholder="Search"
              />
            </div>
          </form>
        </div>
      </div>
      <div>
        <div className="d-flex">
          <div className="px-1">
            <button className="btn btn-transparent text-capitalize ">
              All
            </button>
          </div>
          <div className="px-1">
            <button className="btn btn-transparent text-capitalize ">
              Food & Drink
            </button>
          </div>
          <div className="px-1">
            <button className="btn btn-transparent text-capitalize ">
              Yoga
            </button>
          </div>
          <div className="px-1">
            <button className="btn btn-transparent text-capitalize ">
              Music
            </button>
          </div>
          <div className="px-1">
            <button className="btn btn-transparent text-capitalize ">
              Art
            </button>
          </div>
          <div className="px-1">
            <button className="btn btn-transparent text-capitalize ">
              Comedy
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card-general">
            <div className="ratio ratio-16x9 bg-primary">
              <img src="" alt="" />
            </div>
            <div className="card-info p-0">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column text-center p-2">
                  <span className="display-3">19</span>
                  <span className="upload-info">MAY</span>
                </div>
                <div className=" p-2">
                  <div>
                    <span className="font-size-12 bg-primary px-1">Music</span>
                    <h5 className="font-size-12">
                      Nacional Baseball Association Touch Base
                    </h5>
                  </div>
                  <div>
                    <div>
                      <span>
                        {" "}
                        <FontAwesomeIcon
                          className="icon-clock"
                          icon={faClock}
                        />{" "}
                      </span>
                      <span className="font-size-12">12:30 am - 1:30 pm</span>
                    </div>
                    <div>
                      <span>
                        {" "}
                        <FontAwesomeIcon
                          className="icon-clock"
                          icon={faClock}
                        />{" "}
                      </span>
                      <span className="font-size-12 ">
                        Hosted by: Gianna Fares
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card-general">
            <div className="ratio ratio-16x9 bg-primary">
              <img src="" alt="" />
            </div>
            <div className="card-info p-0">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column text-center p-2">
                  <span className="display-3">09</span>
                  <span className="upload-info">MAY</span>
                </div>
                <div className=" p-2">
                  <div>
                    <span className="font-size-12 bg-primary px-1">Food & Drink</span>
                    <h5 className="font-size-12">
                      'Ella Fitzgerald SongBooks, Part II: Duke Ellington' Webinar
                    </h5>
                  </div>
                  <div>
                    <div>
                      <span>
                        {" "}
                        <FontAwesomeIcon
                          className="icon-clock"
                          icon={faClock}
                        />{" "}
                      </span>
                      <span className="font-size-12">12:30 am - 1:30 pm</span>
                    </div>
                    <div>
                      <span>
                        {" "}
                        <FontAwesomeIcon
                          className="icon-clock"
                          icon={faClock}
                        />{" "}
                      </span>
                      <span className="font-size-12 ">
                        Hosted by: Gianna Fares
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
