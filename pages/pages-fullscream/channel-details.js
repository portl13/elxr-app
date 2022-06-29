import Meta from "@components/layout/Meta";
import { faClock, faEllipsisH, faPlus, faTools, faTv, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";

function ChannelDetails() {
  return (
    <div>
      <Meta />
      <Head>
        <title>CHANNEL DETAILS</title>
      </Head>
      <div>
        <div className="channel-details"></div>
        <div className="container">
          <div className="d-flex flex-column flex-md-row">
            <div className="contain-channel-img margin-negative">
              {/* <img src="" alt="" /> */}
            </div>
            <div className="pl-md-3">
              <div className="d-flex align-items-center pl-md-2 font-size-12 mt-2">
                <h1 className="m-0 font-weight-bold line-height-1 font-size-34">
                  BURN OUT WEEK
                </h1>
                <div className="bg-success border-radius-35 py-1 px-2 ml-md-4 ">
                  <span>
                    <FontAwesomeIcon className="icon-unlock" icon={faUnlock} />
                  </span>
                  <span className="pl-1">Open</span>
                </div>
              </div>
              <div className="pl-2">
                <span className="text-muted font-size-12">
                  Created on May 05, 2022
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-4">
              <div className="d-none d-md-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <div>
                    <button className="btn btn-create py-1 px-2 mr-2">
                      Videos
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-transparent font-weight-500 py-1 px-2">
                      About
                    </button>
                  </div>
                </div>
                <div className="d-flex ">
                  <div className="position-relative">
                    <span> <FontAwesomeIcon className="icon-setting icon-button" icon={faPlus} /> </span>
                    <button className="btn btn-borde pl-4">
                      Upload Video
                    </button>
                  </div>
                  <div className="position-relative">
                  <span> <FontAwesomeIcon className="icon-setting icon-button text-primary" icon={faClock} /> </span>
                    <button className="btn btn-borde btn-border-primary pl-4">
                      Schedule Session
                    </button>
                  </div>
                  <div className="position-relative">
                  <span> <FontAwesomeIcon className="icon-setting icon-button-golive" icon={faTv} /> </span>
                    <button className="btn btn-create rounded-lg ">
                      Go Live
                    </button>
                  </div>
                  <div className="mx-3 d-flex align-items-center">
                  <span> <FontAwesomeIcon className="icon-setting" icon={faEllipsisH} /> </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mt-5">
                <article className="card-general">
                    <div className="ratio ratio-16x9">
                        {/* <img src="" alt="" /> */}
                    </div>
                    <div className="p-3">
                        <div>
                            <span className="badge badge-primary mb-1">Video</span>
                        </div>
                        <div>
                            <h5 className="m-0 font-size-12 font-weight-bold">Burger-Joint Cheeseburger</h5>
                            <p className="m-0 font-size-12">With beef, pork, salmon, turkey and chicken burger recipes from...</p>
                        </div>
                    </div>

                </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelDetails;
