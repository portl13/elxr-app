import React from 'react'
import LayoutMyAccount from '@components/layout/LayoutMyAccount'

function MyAccount() {
  return (
    <LayoutMyAccount>
      <div>
        <div className="contain-profile-img">{/* <img src="" alt="" /> */}</div>
        <a href="#">Edit Profile Image</a>
      </div>
      <form action="">
        <div className="row py-4">
          <div className="col-12 col-md-6">
            <div className="input-search mr-0 border-radius-35 pb-0">
              <label className="w-100 upload-info mb-0" htmlFor="name ">
                First Name<span className="text-red">*</span>
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
          <div className="col-12 col-md-6">
            <div className="input-search mr-0 border-radius-35 pb-0">
              <label className="w-100 upload-info mb-0" htmlFor="name ">
                Last Name<span className="text-red">*</span>
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
          <div className="col-12 col-md-6 mt-3">
            <div className="input-search mr-0 border-radius-35 pb-0">
              <label className="w-100 upload-info mb-0" htmlFor="name ">
                User Name<span className="text-red">*</span>
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
          <div className="col-12 col-md-6 mt-3">
            <div className="input-search mr-0 border-radius-35 pb-0">
              <label className="w-100 upload-info mb-0" htmlFor="email ">
                Email Address<span className="text-red">*</span>
                <input
                  className="bg-transparent border-0 text-white w-100 mr-0"
                  name="email"
                  type="email"
                  id=""
                  cols="30"
                  rows="5"
                />
              </label>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-3">
            <div className="input-search mr-0 border-radius-35 pb-0">
              <label
                className="w-100 py-0 mb-0 w-md-50 upload-info"
                htmlFor="gender"
              >
                Gender
                <select
                  className="bg-transparent text-white border-0 w-100 mr-0 "
                  name="gender"
                  id=""
                >
                  <option className="bg-black" value="1">
                    Non-binary
                  </option>
                  <option className="bg-black" value="2">
                    Binary
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
          <div className="col-12 col-md-6 mt-3">
            <div className="input-search mr-0 border-radius-35 pb-0">
              <label className="w-100 upload-info mb-0" htmlFor="birth ">
                Date of Birth<span className="text-red">*</span>
                <input
                  className="bg-transparent border-0 text-white w-100 mr-0"
                  name="birth"
                  type="date"
                  id=""
                  cols="30"
                  rows="5"
                />
              </label>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-3">
            <div className="input-search mr-0 border-radius-35 pb-0">
              <label className="w-100 upload-info mb-0" htmlFor="phone ">
                Phone Number (Optional)<span className="text-red">*</span>
                <input
                  className="bg-transparent border-0 text-white w-100 mr-0"
                  name="phone"
                  type="Number"
                  id=""
                  cols="30"
                  rows="5"
                />
              </label>
            </div>
          </div>
          <div className="col-12 mt-3">
            <div className="input-search mr-0 border-radius-35 pb-0">
              <label className="w-100 upload-info " htmlFor="description ">
                Bio<span className="text-red">*</span>
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

          <div className=" w-100 mr-3 d-flex justify-content-center justify-content-md-end mt-4">
            <div>
              <button className="btn btn-create px-5">Update</button>
            </div>
          </div>
        </div>
      </form>
    </LayoutMyAccount>
  )
}

export default MyAccount
