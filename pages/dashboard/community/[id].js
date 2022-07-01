import React from "react";
import Meta from "@components/layout/Meta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowLeftIcon from "@icons/ArrowLeftIcon";
import PlusIcon from "@icons/PlusIcon";
import { Link } from "material-ui-core";
import Head from "next/head";
import LupaIcon from "@icons/LupaIcon";

function CommunytyPageDetail() {
  return (
    <div>
      <Meta />
      <Head>
        <title>COMMUNITY DETAILS</title>
      </Head>
      <>
        <div style={{}} className="channel-details cover-bg position-relative">
          <div className="back-icon-channels pointer">
            <Link href="/dashboard/community">
              <a>
                <ArrowLeftIcon className="back-icon p-0" />
              </a>
            </Link>
          </div>
        </div>
        <div className="container container-80">
          <div className="d-flex flex-column flex-md-row">
            <div className="contain-channel-img margin-negative bg-gray position-relative">
              {/* {channel && channel.channel_logo && (
                <img src={channel.channel_logo} alt={channel.channel_name} />
              )} */}
            </div>
            <div className="pl-md-3 pt-2">
              <div className="d-flex align-items-center pl-md-2 font-size-12 mt-2">
                <h1 className="m-0 font-weight-bold line-height-1 font-size-34 mr-3">
                  Nombre
                </h1>
                <div>
                  {/* {channel &&
                    channel.channel_privacy &&
                    channel.channel_privacy === 'public' && (
                      <div className="badge badge-pill badge-success d-flex">
                        <span className="badge-icon">
                          <FontAwesomeIcon icon={faLockOpen} />
                        </span>
                        <span className="badge-title">open</span>
                      </div>
                    )}

                  {channel &&
                    channel.channel_privacy &&
                    channel.channel_privacy === 'private' && (
                      <div className="badge badge-pill badge-danger d-flex">
                        <span className="badge-icon">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span className="badge-title">close</span>
                      </div>
                    )} */}
                </div>
              </div>
              <div className="pl-2">
                <span className="text-muted font-size-12">Created on</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-4">
              <div className="d-none d-md-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <div>
                    <button className="btn btn-create py-1 px-2 mr-2">
                      Feeds
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-transparent font-weight-500 py-1 px-2">
                      Topics
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-transparent font-weight-500 py-1 px-2">
                      About
                    </button>
                  </div>
                </div>
                {/* <div className="d-flex ">
                  <div className="position-relative">
                    <button className="btn btn-borde d-flex">
                      <i className="btn-icon-container">
                        <PlusIcon className="btn-icon" />
                      </i>
                      <span>Upload Video</span>
                    </button>
                  </div>
                  <div className="position-relative">
                    <button
           
                      className="btn btn-borde btn-border-primary text-primary"
                    >
                      <i className="btn-icon-container">
                        <ClockIcon className="btn-icon text-primary" />
                      </i>
                      <span>Schedule Session</span>
                    </button>
                  </div>
                  <div className="position-relative">
                    <button
             
                      className="btn btn-create rounded-lg d-flex"
                    >
                      <i className="btn-icon-container">
                        <TvIcon className="btn-icon" />
                      </i>
                      <span>Go Live</span>
                    </button>
                  </div>
                  <div className="mx-3 d-flex align-items-center">
                    <span>
                      <FontAwesomeIcon
                        className="icon-setting"
                        icon={faEllipsisH}
                      />
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8"></div>
            <div className="col-12 col-md-4">
              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-borde border-0 mr-0 pr-0">
                  <i>
                    <PlusIcon className="icon-setting " />
                  </i>
                  <span>Add New</span>
                </button>
              </div>
              <form action="">
                <div className="input-search-contain  w-100">
                  <span className="input-search-icon">
                    <LupaIcon className="input-search-icon-svg" />
                  </span>
                  <input
                    className="input-search w-100"
                    type="search"
                    name="search"
                    placeholder="Search"
                  />
                </div>
              </form>
              <div className="d-flex flex-column ">
                <div className="d-flex justify-content-between py-3 border-bottom ">
                  <div className="d-flex align-items-end">
                    <div className="img-member bg-primary"></div>
                    <span className="font-size-12 text-muted ml-2">
                      michael_clayton
                    </span>
                  </div>
                  <button className="btn btn-borde border-0 mr-0 pr-0 font-size-12 text-muted">
                    Remove
                  </button>
                </div>
              </div>
              
                <div className="photo-galery">
                    
                </div>

            
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default CommunytyPageDetail;
