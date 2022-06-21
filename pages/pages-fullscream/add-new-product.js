import React from "react";
import Meta from "@components/layout/Meta";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";

function AddNewProduct() {
  return (
    <>
      <Meta />
      <Head>
        <title>ADD NEW PRODUCT</title>
      </Head>
      <div className="modal-full-scream">
        <div className="container px-3 px-md-5 pt-5">
          <div className="d-flex align-items-center">
            <span className="contain-icon">
              <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
            </span>
            <span className="back">Back</span>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="contain-title">
                <h1 className="create-communities-title">ADD NEW PRODUCT</h1>
              </div>
              <div>
                <div className="upload-image w-100 w-md-50 border-moteado d-flex justify-content-center align-items-center mb-3">
                  <div className="upload-image-info text-center">
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
                <form action="">
                  <div className="mt-5 mb-3">
                    <div className="input-search mr-0 border-radius-35 pb-0">
                      <label
                        className="w-100 upload-info mb-0"
                        htmlFor="name "
                      >
                        Product Title<span className="text-red">*</span>
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
                  <div className="d-flex flex-column flex-md-row justify-content-between">
                    <div className="input-search border-radius-35 w-100 w-md-50 pb-0  mb-3">
                      <label
                        className="w-100 w-md-50 upload-info mb-0"
                        htmlFor="number"
                      >
                        Price($) <span className="text-red">*</span>
                        <input
                          className="bg-transparent py-0 text-white border-0 w-100"
                          type="number"
                        />
                      </label>
                    </div>
                    <div className="input-search mr-0  border-radius-35 w-100 w-md-50 pb-0 mb-3">
                      <label
                        className="w-100 w-md-50 mb-0 upload-info"
                        htmlFor="number"
                      >
                        Sole Price($)
                        <input
                          className="bg-transparent py-0 text-white border-0 w-100"
                          type="number"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="d-flex flex-column flex-md-row justify-content-between">
                    <div className="input-search  pb-0 border-radius-35 w-100  mb-3">
                      <label
                        className="w-100 mb-0 py-0 w-md-50 upload-info"
                        htmlFor="typo"
                      >
                        Category <span className="text-red">*</span>
                        <select
                          className="bg-transparent text-white border-0 w-100 mr-0 "
                          name="typo"
                          id=""
                        >
                          <option className="bg-black" value="1">
                            Art
                          </option>
                          <option className="bg-black" value="2">
                            Art
                          </option>
                          <option className="bg-black" value="3">
                            Art
                          </option>
                          <option className="bg-black" value="4">
                            Art
                          </option>
                        </select>
                      </label>
                    </div>
                    <div className="input-search mr-0 pb-0 border-radius-35 w-100  mb-3">
                      <label
                        className="w-100 mb-0 py-0 w-md-50 upload-info"
                        htmlFor="typo"
                      >
                        Tags<span className="text-red">*</span>
                        <select
                          className="bg-transparent text-white border-0 w-100 mr-0 "
                          name="typo"
                          id=""
                        >
                          <option className="bg-black" value="1">
                            Art
                          </option>
                          <option className="bg-black" value="2">
                            Art
                          </option>
                          <option className="bg-black" value="3">
                            Art
                          </option>
                          <option className="bg-black" value="4">
                            Art
                          </option>
                        </select>
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="input-search border-radius-35 pb-0 mr-0">
                      <label
                        className="w-100 mb-0 upload-info "
                        htmlFor="description "
                      >
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
                  <div className="mt-3 mb-3">
                    <h4>File Details</h4>
                  </div>
                  <div className="mt-1 ">
                    <div className="input-search border-radius-35 pb-0 mr-0">
                      <label
                        className="w-100 mb-0 upload-info "
                        htmlFor="description "
                      >
                        File Name<span className="text-red">*</span>
                        <input
                          className="bg-transparent border-0 text-white w-100 mr-0"
                          name="description"
                          id=""
                          cols="30"
                          rows="5"
                        />
                      </label>
                    </div>
                    <div className="file-size  position-relative">
                      <div className="input-search  w-100 mt-3 mr-0 border-radius-35 ">
                        <label className="w-100  upload-info" htmlFor="number">
                          <input
                            className="bg-transparent py-0 text-white border-0 w-100"
                            type="name"
                            placeholder="File size max 10 mb"
                          />
                        </label>
                      </div>
                      <div className="btn-contain">
                        <span className="contain-upload-icon">
                            <FontAwesomeIcon className="btn-upload-icon" icon={faArrowUp} />
                        </span> 
                        <button className="btn btn-create">Upload</button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="d-flex justify-content-center justify-content-md-end mb-3 mt-5">
                    <div>
                        <button className="btn btn-create btn-black px-3 mr-2" >Save as Draft</button>
                    </div>
                    <div>
                        <button className="btn btn-create px-5" >Publish</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewProduct;
