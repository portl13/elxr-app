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
        {/* <div className="container px-3 px-md-5 pt-5">
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
                  <label
                    className="w-100 w-md-50 upload-info mb-0"
                    htmlFor="name"
                  >
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
        </div> */}

        {/* <div className="privacity-settings py-5">
          <div className="container">
            <form action="">
              <div className="row">
                <div className="col-12">
                  <div>
                    <h5>Privacy Options</h5>
                  </div>
                  <div className="mt-3">
                    <div className="border-white px-3 px-md-5 py-4">
                      <div className="my-3 d-flex flex-column">
                        <div className=" form-check  pr-3">
                          <input
                            className=" form-check-input"
                            type="radio"
                            name="privacity-options"
                            id="privacity-options"
                            value="option1"
                            checked
                          />
                          <label className=" form-check-label" for="privacity-options">
                            This is a public group
                          </label>
                          <ul className="font-size-12 pl-3">
                            <li>Any site member can join this group.</li>
                            <li>
                              This group will be listed in the groups directory
                              and in search results.
                            </li>
                            <li>
                              Group content and activity will be visible to any
                              site member.
                            </li>
                          </ul>
                        </div>
                        <div className="form-check  ">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="privacity-options"
                            id="privacity-options"
                            value="option2"
                          />
                          <label className="form-check-label" for="privacity-options">
                            This is a private group
                          </label>
                          <ul className="font-size-12 pl-3">
                            <li>
                              Only people who request membership and are
                              accepted can join the group.
                            </li>
                            <li>
                              This group will be listed in the groups directory
                              and in search results.
                            </li>
                            <li>
                              Group content and activity will only be visible to
                              menmers of the group.
                            </li>
                          </ul>
                        </div>
                        <div className="form-check  ">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="privacity-options"
                            id="privacity-options"
                            value="option2"
                          />
                          <label className="form-check-label" for="privacity-options">
                            This is a hidden group
                          </label>
                          <ul className="font-size-12 pl-3">
                            <li>
                              Only people who are invited can join the group.
                            </li>
                            <li>
                              This group will not be listed in the group
                              directory or search results.
                            </li>
                            <li>
                              Group content and activity will only be visible to
                              members of the group.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-5">
                  <div>
                    <h5>Group Invitations</h5>
                  </div>
                  <div className="mt-3">
                    <div className="border-white px-3 px-md-5 py-4">
                      <div>
                        <p>
                          Which members of this group are allowed to invite
                          others?
                        </p>
                      </div>
                      <div className="my-3 d-flex justify-content-between">
                        <div className="d-flex flex-column ">
                          <div className=" form-check mb-3 ">
                            <input
                              className=" form-check-input"
                              type="radio"
                              name="group-invitations"
                              id="group-invitations"
                              value="option1"
                              checked
                            />
                            <label
                              className=" form-check-label"
                              for="group-invitations"
                            >
                              All group members
                            </label>
                          </div>
                          <div className="form-check  ">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="group-invitations"
                              id="group-invitations"
                              value="option2"
                            />
                            <label
                              className="form-check-label"
                              for="group-invitations"
                            >
                              Organizers only
                            </label>
                          </div>
                        </div>
                        <div className="form-check  ">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="group-invitations"
                            id="group-invitations"
                            value="option2"
                          />
                          <label className="form-check-label" for="group-invitations">
                            Organizers and Moderators only
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-5">
                  <div>
                    <h5>Activity Feeds</h5>
                  </div>
                  <div className="mt-3">
                    <div className="border-white px-3 px-md-5 py-4">
                      <div>
                        <p>
                          Which members of this group are allowed to post into
                          the activity feed?
                        </p>
                      </div>
                      <div className="my-3 d-flex justify-content-between">
                        <div className="d-flex flex-column ">
                          <div className=" form-check mb-3 ">
                            <input
                              className=" form-check-input"
                              type="radio"
                              name="group-feeds"
                              id="group-feeds"
                              value="option1"
                              checked
                            />
                            <label
                              className=" form-check-label"
                              for="group-feeds"
                            >
                              All group members
                            </label>
                          </div>
                          <div className="form-check  ">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="group-feeds"
                              id="group-feeds"
                              value="option2"
                            />
                            <label
                              className="form-check-label"
                              for="group-feeds"
                            >
                              Organizers only
                            </label>
                          </div>
                        </div>
                        <div className="form-check  ">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="group-feeds"
                            id="group-feeds"
                            value="option2"
                          />
                          <label className="form-check-label" for="group-feeds">
                            Organizers and Moderators only
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-5">
                  <div>
                    <h5>Group Photos</h5>
                  </div>
                  <div className="mt-3">
                    <div className="border-white px-3 px-md-5 py-4">
                      <div>
                        <p>
                          Which members of this group are allowed to upload
                          photos?
                        </p>
                      </div>
                      <div className="my-3 d-flex justify-content-between">
                        <div className="d-flex flex-column ">
                          <div className=" form-check mb-3 ">
                            <input
                              className=" form-check-input"
                              type="radio"
                              name="group-photos"
                              id="group-photos"
                              value="option1"
                              checked
                            />
                            <label
                              className=" form-check-label"
                              for="group-photos"
                            >
                              All group members
                            </label>
                          </div>
                          <div className="form-check  ">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="group-photos"
                              id="group-photos"
                              value="option2"
                            />
                            <label
                              className="form-check-label"
                              for="group-photos"
                            >
                              Organizers only
                            </label>
                          </div>
                        </div>
                        <div className="form-check  ">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="group-photos"
                            id="group-photos"
                            value="option2"
                          />
                          <label className="form-check-label" for="group-photos">
                            Organizers and Moderators only
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-5">
                  <div>
                    <h5>Group Albums</h5>
                  </div>
                  <div className="mt-3">
                    <div className="border-white px-3 px-md-5 py-4">
                      <div>
                        <p>
                          Which members of this group are allowed to create
                          albums?
                        </p>
                      </div>
                      <div className="my-3 d-flex justify-content-between">
                        <div className="d-flex flex-column ">
                          <div className=" form-check mb-3 ">
                            <input
                              className=" form-check-input"
                              type="radio"
                              name="group-albums"
                              id="group-albums"
                              value="option1"
                              checked
                            />
                            <label
                              className=" form-check-label"
                              for="group-albums"
                            >
                              All group members
                            </label>
                          </div>
                          <div className="form-check  ">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="group-albums"
                              id="group-albums"
                              value="option2"
                            />
                            <label
                              className="form-check-label"
                              for="group-albums"
                            >
                              Organizers only
                            </label>
                          </div>
                        </div>
                        <div className="form-check  ">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="group-albums"
                            id="group-albums"
                            value="option2"
                          />
                          <label className="form-check-label" for="group-albums">
                            Organizers and Moderators only
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-5">
                  <div>
                    <h5>Group Videos</h5>
                  </div>
                  <div className="mt-3">
                    <div className="border-white px-3 px-md-5 py-4">
                      <div>
                        <p>
                          Which members of this group are allowed to upload
                          videos?
                        </p>
                      </div>
                      <div className="my-3 d-flex justify-content-between">
                        <div className="d-flex flex-column ">
                          <div className=" form-check mb-3 ">
                            <input
                              className=" form-check-input"
                              type="radio"
                              name="group-videos"
                              id="group-videos"
                              value="option1"
                              checked
                            />
                            <label
                              className=" form-check-label"
                              for="group-videos"
                            >
                              All group members
                            </label>
                          </div>
                          <div className="form-check  ">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="group-videos"
                              id="group-videos"
                              value="option2"
                            />
                            <label
                              className="form-check-label"
                              for="group-videos"
                            >
                              Organizers only
                            </label>
                          </div>
                        </div>
                        <div className="form-check  ">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="group-videos"
                            id="group-videos"
                            value="option2"
                          />
                          <label className="form-check-label" for="group-videos">
                            Organizers and Moderators only
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-5">
                  <div>
                    <h5>Group Forum</h5>
                  </div>
                  <div className="mt-3">
                    <div className="border-white px-3 px-md-5 py-4">
                      <div>
                        <p>
                          Create a discussion forum to allow members of this
                          group to communicate in a structured, bulletin-board
                          style fashion?
                        </p>
                      </div>
                      <div className="my-3 d-flex ">
                        <div className=" form-check form-check-inline pr-3">
                          <input
                            className=" form-check-input"
                            type="checkbox"
                            name="group-forum"
                            id="group-forum"
                            value="option1"
                            checked
                          />
                          <label className=" form-check-label" for="group-forum">
                            Yes, I want this group to have a discussion forum
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center align-items-center justify-content-md-end py-4">
                    <div>
                      <button className="btn btn-transparent text-capitalize py-3 px-5">
                        Previous
                      </button>
                    </div>
                    <div>
                      <button className="btn btn-create py-3 px-5 ml-2">
                        Save & Next
                      </button>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div> */}


        <div className="meet-settings py-5">
          <div className="container">
            <form action="">
              <div className="">
                <h5>Meet Settings</h5>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="border-white">
                    <p>
                      Allow members of this group to enter the same video
                      conference room
                    </p>
                    <div className="my-3 d-flex flex-column ">
                      <div className=" form-check form-check-inline mb-3">
                        <input
                          className=" form-check-input"
                          type="checkbox"
                          name="conference-room"
                          id="conference-room"
                          value="option1"
                          checked
                        />
                        <label
                          className=" form-check-label"
                          for="conference-room"
                        >
                          Activate
                        </label>
                      </div>
                      <div className="form-check form-check-inline ">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="conference-room"
                          id="conference-room"
                          value="option2"
                        />
                        <label
                          className="form-check-label"
                          for="conference-room"
                        >
                          Display 'Meet Members' menu
                        </label>
                      </div>
                    </div>
                    <div className="col-12 mb-4 p-0">
                      <div className=" input-default  border-radius-35">
                        <label
                          className="w-100 w-100 upload-info mb-0"
                          htmlFor="name"
                        >
                          Domain
                          <input
                            className="bg-transparent py-0 text-white border-0 w-100"
                            type="name"
                          />
                        </label>
                      </div>
                      <span className="font-size-12 pl-2">
                        {" "}
                        The domain the Jisti Meet Server runs Defaults to their
                        free hosped service.{" "}
                      </span>
                    </div>
                    <div className="col-12 mb-4 p-0">
                      <div className=" input-default  border-radius-35">
                        <label
                          className="w-100 w-100 upload-info mb-0"
                          htmlFor="name"
                        >
                          Room*
                          <input
                            className="bg-transparent py-0 text-white border-0 w-100"
                            type="name"
                          />
                        </label>
                      </div>
                      <span className="font-size-12 pl-2">
                        Set the room group members will enter automatically when
                        visiting the 'Meet the Group' menu.{" "}
                      </span>
                    </div>
                    <div className="col-12 mb-4 p-0">
                      <div className=" input-default  border-radius-35">
                        <label
                          className="w-100 w-100 upload-info mb-0"
                          htmlFor="password"
                        >
                          Password
                          <input
                            className="bg-transparent py-0 text-white border-0 w-100"
                            type="password"
                          />
                        </label>
                      </div>
                      <span className="font-size-12 pl-2">
                        Set the password the group members will have to enter to
                        jion the room.The first to visit - and therefore create
                        - the room will enter without any password. The rest
                        participants will have to fill-in the password{" "}
                      </span>
                    </div>

                    <div className="col-12 mb-4 p-0">
                      <div className=" input-default  border-radius-35">
                        <label
                          className="w-100 w-100 upload-info mb-0"
                          htmlFor="toolbar"
                        >
                          Toolbar
                          <input
                            className="bg-transparent py-0 text-white border-0 w-100"
                            type="name"
                            name="toolbar"
                          />
                        </label>
                      </div>
                      <span className="font-size-12 pl-2">
                        The toolbar buttons to get displayed in comma separate
                        format. For more information refer to{" "}
                        <a href="#">Toolbar</a>
                      </span>
                    </div>

                    <div className="col-12 mb-4 p-0">
                      <div className=" input-default  border-radius-35">
                        <label
                          className="w-100 w-100 upload-info mb-0"
                          htmlFor="settings"
                        >
                          Settings
                          <input
                            className="bg-transparent py-0 text-white border-0 w-100"
                            type="name"
                            name="settings"
                          />
                        </label>
                      </div>
                      <span className="font-size-12 pl-2">
                        The settings to be available in comma separate format.
                        For more information refer to <a href="#">Settings</a>
                      </span>
                    </div>

                    <div className="d-flex flex-column flex-md-row flex-wrap">
                      <div className="col-12 col-md-6 mb-4 p-0">
                        <div className=" input-default  border-radius-35">
                          <label
                            className="w-100 w-100 upload-info mb-0"
                            htmlFor="width"
                          >
                            Width
                            <input
                              className="bg-transparent py-0 text-white border-0 w-100"
                              type="name"
                              name="width"
                            />
                          </label>
                        </div>
                        <span className="font-size-12 pl-2">
                          The width in pixels or percentaje of the embedded
                          window
                        </span>
                      </div>
                      <div className="col-12 col-md-6 mb-4 p-0">
                        <div className=" input-default  border-radius-35">
                          <label
                            className="w-100 w-100 upload-info mb-0"
                            htmlFor="height"
                          >
                            Height
                            <input
                              className="bg-transparent py-0 text-white border-0 w-100"
                              type="name"
                              name="height"
                            />
                          </label>
                        </div>
                        <span className="font-size-12 pl-2">
                          The height in pixels or percentaje of the embedded
                          window
                        </span>
                      </div>
                      <div className="col-12 col-md-6 mb-4 p-0">
                        <div className=" input-default  border-radius-35">
                          <label
                            className="w-100 w-100 upload-info mb-0"
                            htmlFor="Background"
                          >
                            Background Color
                            <input
                              className="bg-transparent py-0 text-white border-0 w-100"
                              type="name"
                              name="Background"
                            />
                          </label>
                        </div>
                        <span className="font-size-12 pl-2">
                          The background color of the window when camera is off
                        </span>
                      </div>
                      <div className="col-12 col-md-6 mb-4 p-0">
                        <div className=" input-default  border-radius-35">
                          <label
                            className="w-100 w-100 upload-info mb-0"
                            htmlFor="Language"
                          >
                            Default Language
                            <input
                              className="bg-transparent py-0 text-white border-0 w-100"
                              type="name"
                              name="Language"
                            />
                          </label>
                        </div>
                        <span className="font-size-12 pl-2">
                          The default language.
                        </span>
                      </div>
                    </div>
                    <div className="my-3 d-flex flex-column ">
                      <div className=" form-check form-check-inline ">
                        <input
                          className=" form-check-input"
                          type="checkbox"
                          name="brand"
                          id="brand"
                          value="option1"
                          checked
                        />
                        <label className=" form-check-label" for="brand">
                          Show Watermark
                        </label>
                      </div>

                      <p className="font-size-12">
                        Show/Hide the jitsi Meet Watermark. Please leave it
                        checked unless you use your own domain
                      </p>

                      <div className="form-check form-check-inline ">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="brand"
                          id="brand"
                          value="option2"
                        />
                        <label className="form-check-label" for="brand">
                          Show Brand Watermark
                        </label>
                      </div>
                      <p className="font-size-12">
                        Show/Hide the jitsi Meet Brand Watermark.
                      </p>
                    </div>
                    <div className="col-12 mb-4 p-0">
                      <div className=" input-default  border-radius-35">
                        <label
                          className="w-100 w-100 upload-info mb-0"
                          htmlFor="brand"
                        >
                          Brand Watermark Link
                          <input
                            className="bg-transparent py-0 text-white border-0 w-100"
                            type="name"
                            name="brand"
                          />
                        </label>
                      </div>
                      <span className="font-size-12 pl-2">
                        The link for the brand watermark
                      </span>
                    </div>
                    <div className="my-3 d-flex flex-column mt-5 ">
                      <div>
                        <div className=" form-check form-check-inline ">
                          <input
                            className=" form-check-input"
                            type="checkbox"
                            name="Film"
                            id="Film"
                            value="option1"
                            checked
                          />
                          <label className=" form-check-label" for="Film">
                            Film Strip Mode Only
                          </label>
                        </div>
                        <p className="font-size-12">
                          Display the window in film strip only mode.
                        </p>
                      </div>
                      <div>
                        <div className="form-check form-check-inline ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="Film"
                            id="Film"
                            value="option2"
                          />
                          <label className="form-check-label" for="Film">
                            Start Audio Only
                          </label>
                        </div>
                        <p className="font-size-12">
                          Every participant enters the room having enabled only
                          their microphone. Camera is off.
                        </p>
                      </div>
                      <div>
                        <div className="form-check form-check-inline ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="Film"
                            id="Film"
                            value="option2"
                          />
                          <label className="form-check-label" for="Film">
                            Disable Video Quality Indicator
                          </label>
                        </div>
                        <p className="font-size-12">
                          Hide/Show the video quality indicator
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center justify-content-md-end py-4">
                    <div>
                      <button className="btn btn-transparent text-capitalize py-3 px-5">
                        Previous
                      </button>
                    </div>
                    <div>
                      <button className="btn btn-create py-3 px-5 ml-2">
                        Finish
                      </button>
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

export default AddCommunity;
