import {
  faEllipsisH,
  faPlus,
  faSearch,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Communities() {
  return (
    <div className="container">
      <div className="d-flex  justify-content-between  pt-3 mb-5">
        <div>
          <h2 className="title-dashboard">Communities</h2>
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
          <div className="btn-create-client">
            <span className="btn-contain-icon">
              <FontAwesomeIcon className="btn-create-icon" icon={faPlus} />
            </span>
            <button className="btn btn-create">Create a Community</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card-general ">
            <div className="ratio ratio-16x9 bg-primary card-head">
              <img src="" alt="" />
            </div>
            <div className="card-info">
              <div className="avatar-contain d-flex justify-content-between">
                <div className="card-avatar">
                  <img src="" alt="" />
                </div>
                <span>
                  <FontAwesomeIcon className="avatar-icon" icon={faEllipsisH} />
                </span>
              </div>
              <div>
                <h3 className="card-title">
                  <a className="text-white" href="">
                    Home Sweet Dome
                  </a>
                </h3>
                <div>
                  <span className="card-members-icon">
                    <FontAwesomeIcon
                      className="member-icon"
                      icon={faUserFriends}
                    />
                  </span>
                  <span className="card-members-info">32 Members</span>
                </div>
                <span className="card-fecha-creacion">
                  Created on May 05, 2022
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Communities;
