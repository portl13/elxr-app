import Layout from "@components/layout/Layout";
import Meta from "@components/layout/Meta";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";

function AddCommunity() {
  return (
    <>
      <Meta />
      <Head>
        <title>Create Community</title>
      </Head>
      <div className="modal-full-scream">
        <div className="container px-3 px-md-5 pt-5">
          <div className="d-flex align-items-center">
            <span className="contain-icon">
              <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
            </span>
            <span className="back">Back</span>
          </div>
          <div className="contain-title">
            <h1 className="create-communities-title">CREATE A COMMUNITY</h1>
          </div>
          <div className="row mt-5">
            <div className="col-12">
              <div className="upload-contain d-flex flex-column justify-content-center align-items-center ">
                <div className="upload-image border-moteado d-flex justify-content-center align-items-center">
                  <div className="upload-image-info text-center pb-5 pb-md-0">
                    <span className="upload-contain-icon ">
                      <FontAwesomeIcon
                        className="upload-image-icon"
                        icon={faPlus}
                      />
                    </span>
                    <p className="upload-cover-info">Upload cover image</p>
                    <span className="upload-info">10 mb max, png or jpeg</span>
                  </div>
                </div>
                <div className="d-flex w-100 ">
                  <div className="avatar-upload-contain text-center ">
                    <div className="avatar-upload">
                      <div className="avatar-contain-img">
                        <img src="" alt="" />
                      </div>
                      <span className="avatar-contain-icon">
                        <FontAwesomeIcon
                          className="upload-image-icon"
                          icon={faPlus}
                        />
                      </span>
                    </div>
                    <div>
                      <p className="mb-0 mt-2">Upload profile image</p>
                      <span className="upload-info">
                        10 mb max, png or jpeg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 ">
            <form action="">
              <div className="d-flex flex-column flex-md-row justify-content-between">
                <div className="input-search pb-0 border-radius-35 w-100 w-md-50  mb-3">
                  <label className="w-100 w-md-50 upload-info mb-0" htmlFor="name">
                    Community Name <span className="text-red">*</span>
                    <input
                      className="bg-transparent py-0 text-white border-0 w-100"
                      type="name"
                    />
                  </label>
                </div>
                <div className="input-search pb-0 border-radius-35 w-100 mr-0 mb-3">
                  <label
                    className="w-100 py-0 mb-0 w-md-50 upload-info"
                    htmlFor="typo"
                  >
                    What type of group is this?(optional)
                    <select
                      className="bg-transparent text-white border-0 w-100 mr-0 "
                      name="typo"
                      id=""
                    >
                      <option className="bg-black" value="1">
                        Festival
                      </option>
                      <option className="bg-black" value="2">
                        Concierto
                      </option>
                      <option className="bg-black" value="3">
                        Evento
                      </option>
                      <option className="bg-black" value="4">
                        Reunion
                      </option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="mt-3">
                <div className="input-search border-radius-35 mr-0">
                  <label className="w-100 upload-info " htmlFor="description ">
                    Description<span className="text-red">*</span>
                    <textarea
                      className="bg-transparent border-0 text-white w-100 mr-0"
                      name="description"
                      id=""
                      cols="30"
                      rows="5"
                    />
                  </label>
                </div>
              </div>
            </form>
            <div className="d-flex justify-content-end pb-3 mt-3 mr-3">
              <button className="btn btn-create px-5">Save & Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCommunity;
