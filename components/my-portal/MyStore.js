import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function MyStore() {
  return (
    <div className="container ">
      <div className="mb-4">
        <h1>Branding</h1>
        <div className="d-flex justify-content-start">
          <div className="d-flex">
            <div className="p-1 ">
              <button className=" btn-transparent">Branding</button>
            </div>
            <div className="p-1 ">
              <button className=" btn-transparent">Policy Settings</button>
            </div>
            <div className="p-1 ">
              <button className=" btn-transparent">Support</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="branding">
        <div className="row">
          <div className="col-12 col-md-7 ">
            <div className="upload-contain d-flex flex-column justify-content-center align-items-center ">
              <div className="upload-image  border-moteado d-flex justify-content-center align-items-center">
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
                  <div className="pl-3">
                    <p className="mb-0 mt-2">Brand Logo</p>
                    <span className="upload-info">10 mb max, png or jpeg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form action="">
          <div>
            <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
              <div className="input-search input-default border-radius-35 w-100 w-md-50  mb-3">
                <label
                  className="w-100 w-md-50 upload-info mb-0"
                  htmlFor="name"
                >
                  Store Name<span className="text-red">*</span>
                  <input
                    className="bg-transparent py-0 text-white border-0 w-100"
                    type="name"
                    name="name"
                  />
                </label>
              </div>
              <div className="input-search mr-0  border-radius-35 w-100 w-md-50 pb-0 mb-3">
                <label
                  className="w-100 w-md-50 mb-0 upload-info"
                  htmlFor="email"
                >
                  Store Email<span className="text-red">*</span>
                  <input
                    className="bg-transparent py-0 text-white border-0 w-100"
                    type="email"
                    name="email"
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <div>
                  <div className="input-search border-radius-35 pb-0 mr-0">
                    <label className="w-100 mb-0 upload-info " htmlFor="phone ">
                      Store Phone<span className="text-red">*</span>
                      <input
                        className="bg-transparent border-0 text-white w-100 mr-0"
                        name="phone"
                        type="phone"
                        id=""
                        cols="30"
                        rows="5"
                      />
                    </label>
                  </div>
                </div>
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
          </div>
        </form>
        <div className="d-flex mt-3 justify-content-center justify-content-md-end">
          <button className="btn btn-create px-5">Save</button>
        </div>
      </div> */}

      {/* <div className="policy-settings">
        <div>
          <div className="border-white mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2"> 
              <h4 className="m-0 font-size-18 ">Shipping Policy</h4>
              <button className="bg-transparent text-white border-0">Edit</button>
            </div>
            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, quasi, molestiae aperiam perferendis eligendi dicta adipisci doloremque nobis, dolores culpa facilis. Sunt vel doloribus laboriosam et odit amet labore aliquam? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum hic sed praesentium dignissimos dicta unde illo, nesciunt laboriosam voluptatibus maiores vel nulla facere, quo nisi mollitia itaque incidunt! Quas, temporibus.</p>
          </div>
          <div className="border-white mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2"> 
              <h4 className="m-0 font-size-18 ">Refund Policy</h4>
              <button className="bg-transparent text-white border-0">Edit</button>
            </div>
            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, quasi, molestiae aperiam perferendis eligendi dicta adipisci doloremque nobis, dolores culpa facilis. Sunt vel doloribus laboriosam et odit amet labore aliquam? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum hic sed praesentium dignissimos dicta unde illo, nesciunt laboriosam voluptatibus maiores vel nulla facere, quo nisi mollitia itaque incidunt! Quas, temporibus.</p>
          </div>
          <div className="border-white mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2"> 
              <h4 className="m-0 font-size-18 ">Cancellation / Retunr / Exchange Policy</h4>
              <button className="bg-transparent text-white border-0">Edit</button>
            </div>
            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, quasi, molestiae aperiam perferendis eligendi dicta adipisci doloremque nobis, dolores culpa facilis. Sunt vel doloribus laboriosam et odit amet labore aliquam? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum hic sed praesentium dignissimos dicta unde illo, nesciunt laboriosam voluptatibus maiores vel nulla facere, quo nisi mollitia itaque incidunt! Quas, temporibus.</p>
          </div>
        </div>
      </div> */}

      <div className="Support">
        <div>
          <form action="">
            <div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div>
                    <div className="input-search border-radius-35 pb-0 mb-3 mr-0">
                      <label
                        className="w-100 w-md-50 upload-info mb-0"
                        htmlFor="phone"
                      >
                        Phone<span className="text-red">*</span>
                        <input
                          className="bg-transparent py-0 text-white border-0 w-100"
                          type="phone"
                          name="phone"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div>
                    <div className="input-search border-radius-35 pb-0 mb-3 mr-0">
                      <label
                        className="w-100 w-md-50 upload-info mb-0"
                        htmlFor="email"
                      >
                        Email<span className="text-red">*</span>
                        <input
                          className="bg-transparent py-0 text-white border-0 w-100"
                          type="email"
                          name="email"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div>
                    <div className="input-search border-radius-35 pb-0 mb-3 mr-0">
                      <label
                        className="w-100 w-md-50 upload-info mb-0"
                        htmlFor="address"
                      >
                        Adress 1<span className="text-red">*</span>
                        <input
                          className="bg-transparent py-0 text-white border-0 w-100"
                          type="address"
                          name="address"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div>
                    <div className="input-search border-radius-35 pb-0  mb-3 mr-0">
                      <label
                        className="w-100 w-md-50 upload-info mb-0"
                        htmlFor="address"
                      >
                        Adress 2
                        <input
                          className="bg-transparent py-0 text-white border-0 w-100"
                          type="address"
                          name="address"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div>
                    <div className="input-search border-radius-35 pb-0 mb-3 mr-0">
                      <label
                        className="w-100 py-0 mb-0 w-md-50 upload-info"
                        htmlFor="typo"
                      >
                        Contry<span className="text-red">*</span>
                        <select
                          className="bg-transparent text-white border-0 w-100 mr-0 "
                          name="typo"
                          id=""
                        >
                          <option className="bg-black" value="1">
                            US
                          </option>
                          <option className="bg-black" value="2">
                            Miami
                          </option>
                          <option className="bg-black" value="3">
                            los Angeles
                          </option>
                          <option className="bg-black" value="4">
                            Cansas
                          </option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div>
                    <div className="input-search border-radius-35 pb-0  mb-3 mr-0">
                      <label
                        className="w-100 py-0 mb-0 w-md-50 upload-info"
                        htmlFor="typo"
                      >
                        Estate<span className="text-red">*</span>
                        <select
                          className="bg-transparent text-white border-0 w-100 mr-0 "
                          name="typo"
                          id=""
                        >
                          <option className="bg-black" value="1">
                            California
                          </option>
                          <option className="bg-black" value="2">
                            Miami
                          </option>
                          <option className="bg-black" value="3">
                            los Angeles
                          </option>
                          <option className="bg-black" value="4">
                            Cansas
                          </option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div>
                    <div className="input-search border-radius-35 pb-0 mb-3 mr-0">
                      <label
                        className="w-100 w-md-50 upload-info mb-0"
                        htmlFor="phone"
                      >
                        City/Town<span className="text-red">*</span>
                        <input
                          className="bg-transparent py-0 text-white border-0 w-100"
                          type="phone"
                          name="phone"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div>
                    <div className="input-search border-radius-35 pb-0 mr-0">
                      <label
                        className="w-100 py-0 mb-0 w-md-50 upload-info"
                        htmlFor="typo"
                      >
                        Zipcode<span className="text-red">*</span>
                        <select
                          className="bg-transparent text-white border-0 w-100 mr-0 "
                          name="typo"
                          id=""
                        >
                          <option className="bg-black" value="1">
                            95746
                          </option>
                          <option className="bg-black" value="2">
                            95746
                          </option>
                          <option className="bg-black" value="3">
                            95746
                          </option>
                          <option className="bg-black" value="4">
                            95746
                          </option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="d-flex justify-content-center justify-content-md-end mt-4">
          <button className="btn btn-create px-5">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStore;
