import React from 'react'

function Support() {
  return (
    <div className="support">
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
  )
}

export default Support
