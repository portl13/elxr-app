import Meta from "@components/layout/Meta";
import {
  fab,
  faFacebook,
  faViadeo,
  faXbox,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCamera,
  faComment,
  faEllipsisH,
  faHeart,
  faShare,
  faUser,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";

function CreatorActivityFeeds() {
  return (
    <div>
      <Meta />
      <Head>
        <title>CREATOR ACTIVITY FEEDS</title>
      </Head>
      <div>
        <form action="">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8">
                <div className="border-white-10 mr-0 mt-4 pt-5 ">
                  <textarea
                    placeholder="What's in your mind"
                    className="bg-transparent border-0 w-100 text-white"
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                  ></textarea>
                  <div className="d-flex justify-content-between my-2">
                    <div>
                      <span className="">
                        <FontAwesomeIcon className=" z-index icon-setting" />
                      </span>
                    </div>
                    <div className="d-flex justify-content-around ">
                      <div className="position-relative pr-1">
                        <span>
                          <FontAwesomeIcon
                            className="icon-button-golive icon-setting"
                            icon={faCamera}
                          />
                        </span>
                        <button className="btn btn-create">Upload Photo</button>
                      </div>
                      <div className="position-relative pr-1">
                        <span>
                          <FontAwesomeIcon
                            className="icon-button-golive icon-setting"
                            icon={faVideo}
                          />
                        </span>
                        <button className="btn btn-create">Upload Video</button>
                      </div>
                      <div>
                        <button className="btn btn-create">
                          Post Activity
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-white-10 mr-0  mt-5  py-4">
                  <div className="pt-2">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <div className="img-circle bg-segundary">
                          {/* <img src="" alt="" /> */}
                        </div>
                        <div className="ml-2">
                          <span>You</span>
                        </div>
                      </div>
                      <div className="position-relative mr-5">
                        <span>
                          <FontAwesomeIcon
                            className="icon-setting icon-comment"
                            icon={faEllipsisH}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aliquam dolore quod iure ducimus rerum corporis tempora
                        simil.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-12 col-md-8 pb-3 pb-md-0">
                        <div className="ratio ratio-16x9 bg-primary rounded-lg"></div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="row">
                          <div className="col-12 mb-3">
                            <div className="ratio ratio-16x9 bg-primary rounded-lg"></div>
                          </div>
                          <div className="col-12">
                            <div className="ratio ratio-16x9 bg-primary rounded-lg"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 d-flex justify-content-between width-300">
                      <div>
                        <span>
                          <FontAwesomeIcon
                            className="icon-setting"
                            icon={faHeart}
                          />
                        </span>
                        <span className="font-size-12 text-muted">
                          Like(25)
                        </span>
                      </div>
                      <div>
                        <span>
                          <FontAwesomeIcon
                            className="icon-setting"
                            icon={faComment}
                          />
                        </span>
                        <span className="font-size-12 text-muted">
                          Comment(3)
                        </span>
                      </div>
                      <div>
                        <span>
                          <FontAwesomeIcon
                            className="icon-setting"
                            icon={faShare}
                          />
                        </span>
                        <span className="font-size-12 text-muted">Repost</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>
                      <span className="text-primary">Woodlander Music</span>{" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Repellat odit at iusto odio omioe hgiase.
                    </p>
                  </div>
                  <div>
                    <form action="">
                      <div className="input-default mr-0">
                        <label htmlFor="comment" className="w-100 m-0">
                          Add comments
                          <input
                            type="text"
                            name="comment"
                            id="comment"
                            className="bg-transparent border-0 w-100 text-white"
                          />
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="cards-small py-3">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="contain-img-group  bg-white position-relative">
                      {/* <img src="" alt="" /> */}
                      <div className="contain-img-group-avatar avatar-absolute bg-white border-primary">
                        {/* <img src="" alt="" /> */}
                      </div>
                    </div>
                    <div className="d-flex flex-column ml-2">
                      <h5 className="m-0">BURN WEEK: GLO...</h5>
                      <div>
                        <span>
                          <FontAwesomeIcon
                            className="icon-unlock"
                            icon={faUser}
                          />
                        </span>
                        <span className="font-size-12"> 32 Member</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatorActivityFeeds;
