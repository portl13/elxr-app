import React from "react";
import Meta from "@components/layout/Meta";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
function GoLive() {
  return (
    <>
      <Meta />
      <Head>
        <title>GO LIVE</title>
      </Head>
      <div className="container px-3 px-md-5 pt-5">
        <div className="d-flex align-items-center">
          <span className="contain-icon">
            <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          </span>
          <span className="back">Back</span>
        </div>
        <div className="contain-title">
          <h1 className="create-communities-title">GO LIVE</h1>
        </div>
        <div className="row">
          <div className="col-12 col-md-7">
            <div>
              <h5>UPLOAD THUMBNAIL</h5>
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias et ratione holhai aspernatur possimus esse modi quis
                officia corporis corrupti
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="upload-image border-moteado d-flex justify-content-center align-items-center">
              <div className="upload-image-info text-center pb-5 pb-md-0">
                <span className="upload-contain-icon ">
                  <FontAwesomeIcon
                    className="upload-image-icon"
                    icon={faPlus}
                  />
                </span>
                <p className="upload-cover-info">Upload image</p>
                <span className="upload-info">10 mb max, png or jpeg</span>
              </div>
            </div>
          </div>
        </div>
        <form className="row" action="">
          <div className="col-12 col-md-6  mt-4">
            <div className="input-default pb-0 border-radius-35 w-100   mb-3">
              <label className="w-100 w-100 upload-info mb-0" htmlFor="name">
                Title<span className="text-red">*</span>
                <input
                  className="bg-transparent py-0 text-white border-0 w-100"
                  type="name"
                />
              </label>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-md-4">
            <div className="input-default pb-0 border-radius-35 w-100   mb-3">
              <label
                className="w-100 py-0 mb-0 w-md-50 upload-info"
                htmlFor="typo"
              >
                Category<span className="text-red">*</span>
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
          <div className="col-12  mt-md-4">
            <div className="input-default pb-0 border-radius-35 w-100   mb-3">
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
          <div className="col-12">
            <div>
              <h5>LIVE CHAT</h5>
            </div>
            <div className="border-white px-5 py-4">
              <div>
                <p>Settings to tailor your stream to your needs</p>
              </div>

              <div className="my-3 d-flex ">
                <div className=" form-check form-check-inline pr-3">
                  <input
                    className=" form-check-input"
                    type="checkbox"
                    name="live-chat"
                    id="live-chat"
                    value="option1"
                    checked
                  />
                  <label className=" form-check-label" for="live-chat">
                    Live Chat
                  </label>
                </div>
                <div className="form-check form-check-inline ">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="live-chat"
                    id="live-chat"
                    value="option2"
                  />
                  <label className="form-check-label" for="live-chat">
                    Record Stream
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-3">
            <div>
              <h5>VISIBILITY</h5>
            </div>
            <div className="border-white px-5 py-4">
              <div>
                <p>Choose when to go live and who can see your stream</p>
              </div>

              <div className="my-3 d-flex flex-column">
                <div className=" form-check  pr-3">
                  <input
                    className=" form-check-input"
                    type="radio"
                    name="visibility"
                    id="visibility"
                    value="option1"
                    checked
                  />
                  <label className=" form-check-label" for="visibility">
                    Private
                  </label>
                  <p className="font-size-12">Only you and people you choose can watch your stream</p>
                </div>
                <div className="form-check  ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="visibility"
                    id="visibility"
                    value="option2"
                  />
                  <label className="form-check-label" for="visibility">
                    Public
                  </label>
                  <p className="font-size-12">Everyone can watch your stream</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-3">
            <div>
              <h5>STREAMING METHOD</h5>
            </div>
            <div className="border-white px-5 py-4">
              <div>
                <p>Choose how you are going to create your live stream</p>
              </div>

              <div className="my-3 d-flex flex-column">
                <div className=" form-check  pr-3">
                  <input
                    className=" form-check-input"
                    type="radio"
                    name="streaming-method"
                    id="streaming-method"
                    value="option1"
                    checked
                  />
                  <label className=" form-check-label" for="streaming-method">
                    Webcam
                  </label>
                  <p className="font-size-12">Stream directly from your web browaer</p>
                </div>
                <div className="form-check  ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="streaming-method"
                    id="streaming-method"
                    value="option2"
                  />
                  <label className="form-check-label" for="streaming-method">
                    Software Stream
                  </label>
                  <p className="font-size-12">Stream using 3rd party software such as OBS</p>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="py-3 d-flex justify-content-center justify-content-md-end">
          <button className="btn btn-create px-5">Save & Go Live</button>
        </div>
      </div>
    </>
  );
}

export default GoLive;
