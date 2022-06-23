import Meta from "@components/layout/Meta";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";

function CreateChannel() {
  return (
    <>
      <Meta />
      <Head>
        <title>CREATE CHANNEL</title>
      </Head>
      <div className="container px-3 px-md-5 pt-5">
        <div className="d-flex align-items-center">
          <span className="contain-icon">
            <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          </span>
          <span className="back">Back</span>
        </div>
        <div className="contain-title">
          <h1 className="create-communities-title">CREATE A CHANNEL</h1>
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
                  <p className="upload-cover-info">Channel cover image</p>
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
                  <div className="pl-3">
                    <p className="mb-0 mt-2">Channel Logo</p>
                    <span className="upload-info">10 mb max, png or jpeg</span>
                  </div>
                </div>
              </div>
            </div>
            <form action="">
              <div className="">
                <div className="mt-5">
                  <div className="input-search mr-0 border-radius-35 pb-0">
                    <label className="w-100 upload-info mb-0" htmlFor="name ">
                      Channel Name<span className="text-red">*</span>
                      <input
                        className="bg-transparent border-0 text-white w-100 mr-0"
                        name="name"
                        id=""
                        cols="30"
                        rows="5"
                      />
                    </label>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="input-search border-radius-35 mr-0">
                    <label
                      className="w-100 upload-info "
                      htmlFor="description "
                    >
                      Channel Description<span className="text-red">*</span>
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
                <div className="my-3 d-flex ">
                  <div className=" form-check pr-3">
                    <input
                      className=" form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="option1"
                      checked
                    />
                    <label className=" form-check-label" for="exampleRadios1">
                      Free
                    </label>
                  </div>
                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      value="option2"
                    />
                    <label className="form-check-label" for="exampleRadios2">
                      Paid
                    </label>
                  </div>
                </div>

                <div className="col-12 col-md-6 input-search pb-0 border-radius-35   mb-3">
                  <label className=" upload-info mb-0 w-100" htmlFor="number">
                    $
                    <input
                      className="bg-transparent py-0  text-white border-0 w-100"
                      type="number"
                    />
                  </label>
                </div>
                <div>
                  <div>
                    <h4>Privacy Settings</h4>
                  </div>
                  <div className="my-3 d-flex ">
                    <div className=" form-check pr-3">
                      <input
                        className=" form-check-input"
                        type="radio"
                        name="privacy-settings"
                        id="privacy-settings"
                        value="option1"
                        checked
                      />
                      <label
                        className=" form-check-label"
                        for="privacy-settings"
                      >
                        Public
                      </label>
                    </div>
                    <div className="form-check ">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="privacy-settings"
                        id="privacy-settings"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        for="privacy-settings"
                      >
                        Private
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateChannel;
