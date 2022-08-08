import React, { useState, useContext, useEffect, useMemo } from "react";
import Layout from "../../components/layout/Layout";
import { Button, Input, Progress, Alert, Spinner } from "reactstrap";
import axios from "axios";
import Router from "next/router";
import { UserContext } from "../../context/UserContext";
import { SubNav } from "../../components/livefeed/livefeed.style";
import InfiniteList from "../../components/infiniteList/InfiniteList";
import { useDropzone } from "react-dropzone";
import { removeSpecailChar } from "../../utils/constant";
import {
  DropZoneStyle,
  thumbsContainer,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from "../../components/profile-edit/profile-edit.style";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import MemberCard from "./membercard";
import { setResolution, dataURLtoFile } from "../../utils/setResolution";
import { getmemberDetails } from "../api/member.api";
import { useAlert } from "react-alert";
import { TIMEOUT } from "../../utils/constant";
import Link from "next/link";
import Head from "next/head";

function CreateGroup() {
  const alert = useAlert();
  const [loaderState, setLoaderState] = useState(true);
  const [privacyCheck, setPrivacyCheck] = useState("public");
  const [groupCheck, setGroupCheck] = useState("members");
  const [activityCheck, setActivityCheck] = useState("members");
  const [photoCheck, setPhotoCheck] = useState("members");
  const [albumCheck, setAlbumCheck] = useState("members");
  const [groupType, setGroupType] = useState("");
  const [groupValue, setGroupValue] = useState(0);
  const [status, setStatus] = useState("detail");
  const [apiStatus, setApiStatus] = useState("");
  const [response, setResponse] = useState();
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState();
  const [type, setType] = useState("avatar");
  const [cropper, setCropper] = useState();
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [action, setAction] = useState("bp_avatar_upload");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const onDismiss = () => setVisible(false);
  const [spiner, setSpiner] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [privacyOption, setPrivacyOption] = useState();
  const [groupInvitation, setGroupInvitation] = useState();
  const [activityFeeds, setActivityFeeds] = useState();
  const [groupPhoto, setGroupPhoto] = useState();
  const [groupAlbum, setGroupAlbum] = useState();
  const [groupTypes, setGroupTypes] = useState();
  const [groupParent, setGroupParent] = useState();
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [forumStatus, setForumStatus] = useState(false);
  const [result, setResult] = useState(false);
  const [delMsg, setDelMsg] = useState(false);
  const [upload, setUpload] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [length, setLength] = useState(0);
  const [imageStatus, setImageStatus] = useState("upload");
  const [scope, setScope] = useState("all");
  const [meetDetail, setMeetDetail] = useState();
  const memberType = "alphabetical";
  const [page, setPage] = useState(1);
  const [loadData, setLoadData] = useState(false);
  const [inviteMessage, setInviteMessage] = useState("");
  const [inviteError, setInviteError] = useState(false);
  const [invitationStatus, setInvitationStatus] = useState(false);
  const [memberId, setMemberId] = useState([]);
  const [memberName, setMemberName] = useState([]);

  const [roomName, setRoomName] = useState("");
  const [meetEnabled, setMeetEnabled] = useState(false)
  const [meetMembersEnabled, setMeetMembersEnabled] = useState(false)

  const [visibleAlert, setVisibleAlert] = useState(false);
  const [load, setLoad] = useState(false);
  const previous = "Previous Step";
  const next = "Next Step";
  const imageUrl =
    "https://data.portl.live/wp-content/plugins/buddyboss-platform/bp-core/images/mystery-group.png";

  const url = process.env.bossApi + "/groups";
  const invite = process.env.bossApi + "/groups/invites";
  const invites = process.env.bossApi + "/groups/invites/multiple";
  const meetUrl =
    process.env.baseUrl + `/wp-json/portl/v1/group/meet/${response}`;
  const HEADER = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
  function getMeet() {
    axios.get(meetUrl, HEADER).then((res) => {
      let data = res.data.data
      setMeetDetail(data);
      setRoomName(data.meet_room);
      setMeetEnabled(data.meet_enabled)
      setMeetMembersEnabled(data.meet_members_enabled)
    });
  }
  function deleteButton() {
    setImageStatus("delete");
    setResult(false);
    setImgSrc(null);
  }
  function getInviteMember(id, name, data) {
    if (data === true) {
      setMemberId([...memberId, id]);
      setMemberName([...memberName, name]);
    } else {
      const memId = memberId.filter((item) => item !== id);
      setMemberId(memId);
      const memName = memberName.filter((item) => item !== name);
      setMemberName(memName);
    }
  }
  useEffect(() => {
    getMembers(page, scope, searchText);
  }, [page, scope]);
  function inviteerror() {
    setInviteError(true);
    setTimeout(() => setInviteError(false), [3000]);
  }
  const getMembers = (pages, scopes, search, isEmpty = false) => {
    const data = {
      search,
      page: pages,
      per_page: 20,
      scope: scopes,
      type: "alphabetical",
      exclude_admins: true,
      exclude_banned: true,
    };
    let list = [...memberList];
    let memList = isEmpty ? [] : list;
    getmemberDetails(user, data)
      .then((res) => {
        list = [...memList, ...res.data];
        setMemberList(list);
        const allTotal = Number(res.headers["x-wp-total"]);
        const total = allTotal ? allTotal : 0;
        setLoaderState(list.length !== total);
      })
      .catch((err) => {
        setLoaderState(false);
      });
  };

  function getGroup() {
    axios.get(url + `/${response}`, HEADER).then((res) => {
      setUserData(res.data);
    });
  }

  const handlerChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function createGroup() {
    axios.post(url, formData, HEADER).then((res) => {
      setResponse(res.data.id);
      setGroupName(res.data.name);
      setGroupDescription(res.data.description.raw);
      groupDetail(res.data.id);
      setApiStatus("");
    });
  }

  function updateGroupForum() {
    axios
      .patch(
        url + `/${response}`,
        {
          name: groupName,
          description: groupDescription,
          enable_forum: forumStatus,
        },
        HEADER
      )
      .then((res) => {
        //console.log(res.data)
      });
  }

  function updateGroup() {
    axios.patch(url + `/${response}`, formData, HEADER).then((res) => {
      setResponse(res.data.id);
      setGroupDescription(res.data.description.raw);
      setGroupName(res.data.name);
      groupDetail(res.data.id);
      setApiStatus("");
    });
  }

  const groupDetail = (id) => {
    axios(process.env.bossApi + `/groups/${id}/settings`, {
      method: "GET",
      params: { nav: "group-settings" },
      ...HEADER,
    }).then(({data}) => {
    
      setPrivacyOption(data[0]);
      setGroupInvitation(data[1]);
      setActivityFeeds(data[2]);
      setGroupPhoto(data[3]);
      setGroupAlbum(data[4]);
      setGroupTypes(data[5]);
      setGroupParent(data[6]);
      setLoad(true);
    });
  };
  const updateGroupSetting = () => {
    const privacyData = `
        fields[${privacyOption?.name}]=${privacyCheck}&
        fields[${groupInvitation?.name}]=${groupCheck}&
        fields[${activityFeeds?.name}]=${activityCheck}&
        fields[${groupPhoto?.name}]=${photoCheck}&
        fields[${groupAlbum?.name}]=${albumCheck}&
        fields[${groupTypes?.name}]=${groupType}&
        fields[${groupParent?.name}]=${groupValue}
      `;
    axios
      .patch(
        process.env.bossApi +
          `/groups/${response}/settings?nav=group-settings&${privacyData}`,
        {},
        HEADER
      )
      .then((res) => {
        //console.log(res.data)
      });
  };

  function showProgress() {
    setUpload(true);
    setShowUpload(false);
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const image = await setResolution(acceptedFiles[0]);
      let dataUrl = [...files];
      for (let i = 0; i < acceptedFiles.length; i++) {
        let val = await setResolution(acceptedFiles[i]);
        dataUrl = [
          ...dataUrl,
          {
            preview: URL.createObjectURL(val),
          },
        ];
      }
      image["path"] = image.name;
      image["preview"] = URL.createObjectURL(image);
      setFile(image);
      setFiles(dataUrl);
      setShowUpload(true);
      setTimeout(() => showProgress(), 1000);
    },
  });

  const sendFiles = () => {
    const cropUrl =
      imageStatus === "upload"
        ? `${cropper.getCroppedCanvas().toDataURL()}`
        : `${imgSrc}`;
    fetch(cropUrl)
      .then((res) => res)
      .then(async (blob) => {
        const newFile = dataURLtoFile(blob.url, "capture.jpeg");
        const image = await setResolution(newFile);
        const body = new FormData();
        body.append("file", image);
        body.append("action", action);
        axios
          .post(url + `/${response}/${type}`, body, HEADER)
          .then((res) => {
            getGroup();
            setResult(true);
            setImageStatus("");
            setSpiner(false);
          })

          .catch((err) => {
            setVisible(true);
          });
      });
  };
  const thumbs = (
    <div className="progress-bar-div">
      {file?.name}
      <Progress value="100" color="success" />
    </div>
  );

  useEffect(
    () => () => {
      files.forEach((filedata) => URL.revokeObjectURL(filedata.preview));
    },
    [files]
  );

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  function deleteAvatar() {
    axios.delete(url + `/${response}/${type}`, HEADER).then((res) => {
      getGroup();
      setImageStatus("");
      setDelMsg(true);
    });
  }

  function getScope() {
    if (scope === "all") {
      setScope("personal");
    } else {
      setScope("all");
    }
  }

  function sendInvite() {
    axios
      .post(
        memberId.length === 1 ? invite : invites,
        {
          user_id:
            memberId.length == 1
              ? memberId == 0
                ? null
                : parseInt(memberId.toString())
              : memberId == 0
              ? null
              : memberId,
          group_id: response,
          message: inviteMessage,
        },
        HEADER
      )
      .then((res) => {
        setInvitationStatus(true);
        setInviteMessage("");
        setMemberId([]);
        setMemberName([]);
        setInviteError(false);
        setTimeout(() => setInvitationStatus(false), [2000]);
      });
  }
  const updateLoader = () => {
    setLoaderState(true);
    setPage(1);
    setMemberList([]);
  };
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      updateLoader();
      getMembers(1, scope, searchText, true);
    } else {
      const search = e.target ? e.target.value : e;
      setSearchText(search);
      if (!search) {
        updateLoader();
        getMembers(1, scope, "", true);
      }
    }
  };
  const loadMoreMember = () => {
    if (memberList.length) {
      getMembers(page + 1, scope, searchText);
      setPage(page + 1);
    }
  };

  function updateRoom() {
    axios
      .post(
        meetUrl,
        {
          meet_room: roomName,
          meet_enabled: meetEnabled,
          meet_members_enabled: meetMembersEnabled
        },
        HEADER
      )
      .then((res) => {
        console.log(res.data);
        alert.success("Meet enable successfully.", TIMEOUT);
        Router.push(
          `/group/${removeSpecailChar(groupName)}/${response}?tab=feeds`
        );
      });
  }

  const updateCheck = (e) => {
    if (e.target.name === 'meet_enabled') {
      setMeetEnabled(!meetEnabled)
    }
    if (e.target.name === 'meet_members_enabled') {
      setMeetMembersEnabled(!meetMembersEnabled)
    }
  }

  return (
    <>
      <Head>
        <title>Create New Community</title>
      </Head>
      <Layout>
        <div className="main-wrapper">
          <h2 className="bp-subhead">Create A New Group</h2>
          {error && (
            <div>
              <Alert color="warning" className="group-error-tag">
                <span>
                  <em>!</em>
                </span>
                <p>Please fill in all of the required fields</p>
              </Alert>
            </div>
          )}
          <form>
            <div className="nav-bar-section">
              <ol>
                <li className={status === "detail" ? "current" : " "}>
                  Details
                </li>
                <li className={status === "setting" ? "current" : " "}>
                  Settings
                </li>
                <li className={status === "forum" ? "current" : " "}>Forum</li>
                <li className={status === "photo" ? "current" : " "}>Photo</li>
                <li className={status === "cover" ? "current" : " "}>
                  Cover Photo
                </li>
                <li className={status === "invite" ? "current" : " "}>
                  Invites
                </li>
                <li className={status === "meet" ? "current" : " "}>Meet</li>
              </ol>
            </div>
            {status === "detail" ? (
              <div className="item-body">
                <div className="col-div-12">
                  <label>Group Name (required)</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    maxLength="100"
                    onChange={(e) => {
                      handlerChange(e);
                      setError(false);
                    }}
                    value={formData.name}
                  />
                </div>

                <div className="col-div-12">
                  <label>Group Description</label>
                  <textarea
                    rows="3"
                    id="description"
                    name="description"
                    type="text"
                    onChange={(e) => handlerChange(e)}
                    value={formData.description}
                  ></textarea>
                </div>
                <div className="button-section">
                  <Button
                    onClick={() => {
                      formData.name === ""
                        ? setError(true)
                        : apiStatus === ""
                        ? createGroup()
                        : updateGroup();
                      formData.name === "" ? null : setStatus("setting");
                    }}
                  >
                    {apiStatus === "" ? "Create" : "Update"} Group and Continue
                  </Button>
                </div>
              </div>
            ) : null}

            {status === "setting" ? (
              <>
                <div className="item-body">
                  {!load ? (
                    <Spinner
                      style={{ width: "1.2rem", height: "1.2rem" }}
                      color="primary"
                    />
                  ) : (
                    <>
                      <div className="main-heading">
                        {privacyOption && privacyOption.label}
                      </div>
                      {privacyOption &&
                        privacyOption.options.map((d, i) => {
                          return (
                            <div className="bp-radio-wrap">
                              <div className="custom-radio">
                                <input
                                  className="custom-control-input"
                                  type="radio"
                                  id={"privacy" + i}
                                  name={"privacy" + i}
                                  value={d.value}
                                  checked={privacyCheck === d.value}
                                  onChange={() => setPrivacyCheck(d.value)}
                                />
                                <label className="custom-control-label">
                                  {d.label}
                                </label>
                              </div>

                              <div
                                dangerouslySetInnerHTML={{
                                  __html: d.description,
                                }}
                              />
                            </div>
                          );
                        })}

                      <div className="main-heading">
                        {groupInvitation && groupInvitation.label}
                      </div>
                      <div className="bp-radio-wrap m-b35">
                        <div className="question-panel">
                          {groupInvitation && groupInvitation.description}
                        </div>
                        {groupInvitation &&
                          groupInvitation.options.map((d, i) => {
                            return (
                              <div className="custom-radio question-radio">
                                <input
                                  className="custom-control-input"
                                  type="radio"
                                  id={"groupInvite" + i}
                                  name={"groupInvite" + i}
                                  value={d.value}
                                  checked={groupCheck === d.value}
                                  onChange={() => setGroupCheck(d.value)}
                                />
                                <label className="custom-control-label">
                                  {d.label}
                                </label>
                              </div>
                            );
                          })}
                      </div>
                      <div className="main-heading">
                        {activityFeeds && activityFeeds.label}
                      </div>
                      <div className="bp-radio-wrap m-b35">
                        <div className="question-panel">
                          {activityFeeds && activityFeeds.description}
                        </div>
                        {activityFeeds &&
                          activityFeeds.options.map((d, i) => {
                            return (
                              <div className="custom-radio question-radio">
                                <input
                                  className="custom-control-input"
                                  type="radio"
                                  id={"activityFeed" + i}
                                  name={"activityFeed" + i}
                                  value={d.value}
                                  checked={activityCheck === d.value}
                                  onChange={() => setActivityCheck(d.value)}
                                />
                                <label className="custom-control-label">
                                  {d.label}
                                </label>
                              </div>
                            );
                          })}
                      </div>
                      <div className="main-heading">
                        {groupPhoto && groupPhoto.label}
                      </div>
                      <div className="bp-radio-wrap m-b35">
                        <div className="question-panel">
                          {groupPhoto && groupPhoto.description}
                        </div>
                        {groupPhoto &&
                          groupPhoto.options.map((d, i) => {
                            return (
                              <div className="custom-radio question-radio">
                                <input
                                  className="custom-control-input"
                                  type="radio"
                                  id={"groupPhoto" + i}
                                  name={"groupPhoto" + i}
                                  value={d.value}
                                  checked={photoCheck === d.value}
                                  onChange={() => setPhotoCheck(d.value)}
                                />
                                <label className="custom-control-label">
                                  {d.label}
                                </label>
                              </div>
                            );
                          })}
                      </div>
                      <div className="main-heading">
                        {groupAlbum && groupAlbum.label}
                      </div>
                      <div className="bp-radio-wrap m-b35">
                        <div className="question-panel">
                          {groupAlbum && groupAlbum.description}
                        </div>
                        {groupAlbum &&
                          groupAlbum.options.map((d, i) => {
                            return (
                              <div className="custom-radio question-radio">
                                <input
                                  className="custom-control-input"
                                  type="radio"
                                  id={"groupAlbum" + i}
                                  name={"groupAlbum" + i}
                                  value={d.value}
                                  checked={albumCheck === d.value}
                                  onChange={() => setAlbumCheck(d.value)}
                                />
                                <label className="custom-control-label">
                                  {d.label}
                                </label>
                              </div>
                            );
                          })}
                      </div>
                      <div className="main-heading">
                        {groupTypes && groupTypes.label}
                      </div>
                      <div className="m-b35">
                        <div className="question-panel">
                          {groupTypes && groupTypes.description}
                        </div>
                        {groupTypes && (
                          <Input
                            type="select"
                            className="custom-select-panel"
                            value={groupType}
                            onChange={(e) => setGroupType(e.target.value)}
                          >
                            <option value="">Select Group Type</option>
                            {groupTypes &&
                              groupTypes.options.map((d, key) => (
                                <option value={d.value}>{d.label}</option>
                              ))}
                          </Input>
                        )}
                      </div>
                      <div className="main-heading">
                        {groupParent && groupParent.label}
                      </div>
                      <div className="m-b35">
                        <div className="question-panel">
                          {groupParent && groupParent.description}
                        </div>
                        {groupParent && (
                          <Input
                            type="select"
                            className="custom-select-panel"
                            value={groupValue}
                            onChange={(e) => setGroupValue(e.target.value)}
                          >
                            {groupParent &&
                              groupParent.options.map((d, key) => (
                                <option value={d.value}>{d.label}</option>
                              ))}
                          </Input>
                        )}
                      </div>
                      <div className="button-section">
                        <Button
                          onClick={() => {
                            setStatus("detail");
                            setApiStatus("active");
                          }}
                        >
                          {previous}
                        </Button>
                        <Button
                          onClick={() => {
                            updateGroupSetting();
                            setStatus("forum");
                          }}
                        >
                          {next}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : null}

            {status === "forum" ? (
              <div className="item-body">
                <div className="main-heading">Group Forum</div>
                <div className="main-description">
                  Create a discussion forum to allow members of this group to
                  communicate in a structured, bulletin-board style fashion.
                </div>
                <div className="custom-checkbox checkbox-panel">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    onChange={() => setForumStatus(!forumStatus)}
                    checked={forumStatus === true}
                  />
                  <label className="custom-control-label">
                    Yes, I want this group to have a discussion forum.
                  </label>
                </div>
                <div className="button-section">
                  <Button onClick={() => setStatus("setting")}>
                    {previous}
                  </Button>
                  <Button
                    onClick={() => {
                      updateGroupForum();
                      setStatus("photo");
                      getGroup();
                    }}
                  >
                    {next}
                  </Button>
                </div>
              </div>
            ) : null}

            {status === "photo" || status === "cover" ? (
              <>
                <div className="item-body">
                  <div className="image-tag">
                    {userData && status === "photo" && (
                      <img
                        src={
                          userData.avatar_urls.full === imageUrl
                            ? imageUrl
                            : userData.avatar_urls.full
                        }
                      />
                    )}
                    {userData &&
                      status === "cover" &&
                      userData.cover_url !== "" && (
                        <img src={userData.cover_url} />
                      )}
                  </div>
                  {status === "photo" ? (
                    <div className="item-content">
                      <p>
                        Upload a photo that represents this group. The image
                        will be shown on the main group page, and in search
                        results.
                      </p>
                      <p>
                        To skip the group photo upload process select "Next
                        Step".
                      </p>
                    </div>
                  ) : null}
                </div>

                {status === "cover" ? (
                  <div className="item-body">
                    <div className="item-content">
                      <p>
                        The Cover Photo will be used to customize the header of
                        your group.
                      </p>
                    </div>
                  </div>
                ) : null}
                <div className="item-upload-section">
                  <Alert color="warning" isOpen={visible} toggle={onDismiss}>
                    An error occured while uploading the image.
                  </Alert>
                  <section css={DropZoneStyle} className="container">
                    <SubNav>
                      <ul>
                        <li
                          className={imageStatus === "upload" ? "active" : " "}
                        >
                          <Button
                            type="button"
                            onClick={() => {
                              setImageStatus("upload");
                              setResult(false);
                              setDelMsg(false);
                              setUpload(false);
                              setShowUpload(false);
                              setImgSrc(null);
                              setVisible(false);
                            }}
                          >
                            Upload
                          </Button>
                        </li>
                        {status === "photo" ? (
                          userData?.avatar_urls?.full === imageUrl ? null : (
                            <li
                              className={
                                imageStatus === "delete" ? "active" : " "
                              }
                            >
                              <Button
                                type="button"
                                onClick={() => deleteButton()}
                              >
                                Delete
                              </Button>
                            </li>
                          )
                        ) : null}

                        {status === "cover" ? (
                          userData?.cover_url === "" ? null : (
                            <li
                              className={
                                imageStatus === "delete" ? "active" : " "
                              }
                            >
                              <Button
                                type="button"
                                onClick={() => deleteButton()}
                              >
                                Delete
                              </Button>
                            </li>
                          )
                        ) : null}
                      </ul>
                    </SubNav>

                    {imageStatus === "upload" && !upload && (
                      <div {...getRootProps({ style, className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>Drop your image here</p>
                        <input
                          id="browse-button"
                          type="button"
                          value="Select your file"
                          className="btn btn-default"
                        ></input>
                      </div>
                    )}
                    {showUpload && (
                      <aside style={thumbsContainer}>{thumbs}</aside>
                    )}

                    {upload && file && imageStatus === "upload" && (
                      <div className="profile-image-cropper">
                        <Cropper
                          className="cropper-panel"
                          zoomTo={0.5}
                          initialAspectRatio={1}
                          preview=".img-preview"
                          src={file.preview}
                          viewMode={1}
                          minCropBoxHeight={10}
                          minCropBoxWidth={10}
                          background={false}
                          responsive={true}
                          autoCropArea={1}
                          checkOrientation={false}
                          onInitialized={(instance) => {
                            setCropper(instance);
                          }}
                          guides={true}
                        />
                        <div
                          className="box"
                          style={{ width: "50%", float: "right" }}
                        >
                          <div
                            className="img-preview"
                            style={{
                              width: "100%",
                              float: "left",
                              height: "200px",
                            }}
                          />
                          <div className="button-section">
                            <Button
                              onClick={() => {
                                sendFiles();
                                setSpiner(true);
                              }}
                              className="btn btn-primary"
                            >
                              Crop Photo
                            </Button>
                            <Button
                              className="cancel-button"
                              onClick={() => {
                                setUpload(false);
                                setShowUpload(false);
                                setVisible(false);
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                          {spiner && (
                            <Spinner
                              style={{ width: "1.2rem", height: "1.2rem" }}
                              color="primary"
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {result ? (
                      <div className="cover-image-status">
                        <div className="uploader-progress mb-4">
                          <p
                            id="cover-image-feedback"
                            className="alert alert-success"
                          >
                            Your new group{" "}
                            {type === "avatar" ? "profile" : "cover"} photo was
                            uploaded successfully.
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {delMsg ? (
                      <div className="cover-image-status">
                        <div className="uploader-progress mb-4">
                          <p
                            id="cover-image-feedback"
                            className="alert alert-success"
                          >
                            Your group {type === "avatar" ? "profile" : "cover"}{" "}
                            photo was deleted successfully!
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {imageStatus === "delete" ? (
                      <div id="delete-image-container">
                        <p>
                          If you'd like to delete your current{" "}
                          {type === "avatar" ? "profile" : "cover"} photo, use
                          the delete {type === "avatar" ? "profile" : "cover"}{" "}
                          Photo button.
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary"
                          id="delete-cover-image"
                          onClick={() => deleteAvatar()}
                        >
                          Delete My Group{" "}
                          {type === "avatar" ? "profile" : "cover"} Photo
                        </button>
                      </div>
                    ) : null}

                    <div className="button-section">
                      <Button
                        onClick={() => {
                          status === "photo"
                            ? setStatus("forum")
                            : setStatus("photo");
                          setType("avatar");
                          setDelMsg(false);
                          setVisible(false);
                          setAction("bp_avatar_upload");
                        }}
                      >
                        {previous}
                      </Button>
                      <Button
                        onClick={() => {
                          status === "photo"
                            ? setStatus("cover")
                            : setStatus("invite");

                          setType("cover");
                          setAction("bp_cover_image_upload");
                          setResult(false);
                          setImageStatus("upload");
                          setUpload(false);
                          setDelMsg(false);
                          setVisible(false);
                        }}
                      >
                        {next}
                      </Button>
                    </div>
                  </section>
                </div>
              </>
            ) : null}
            {status === "invite" ? (
              <>
                <div className="item-body">
                  <div className="invite-section">
                    <div className="inner-section">
                      <div className="panel-tag">
                        Members
                        <div className="custom-checkbox checkbox-panel">
                          <input
                            className="custom-control-input"
                            type="checkbox"
                            onChange={() => {
                              getScope();
                              setMemberList([]);
                              setLength(0);
                              setPage(1);
                              setLoadData(false);
                            }}
                            checked={scope === "personal"}
                          />
                          <label className="custom-control-label">
                            My Connections
                          </label>
                        </div>
                      </div>
                      <div className="invite-search">
                        <input
                          type="search"
                          placeholder="Search Members"
                          onChange={handleSearch}
                          onKeyDown={handleSearch}
                        />
                      </div>
                      <div className="members-outer-panel">
                        <InfiniteList
                          loaderState={loaderState}
                          loadMore={loadMoreMember}
                          loading={loaderState}
                          data={memberList}
                          noText={"Members"}
                        >
                          {memberList.length
                            ? memberList.map((members) => (
                                <MemberCard
                                  member={members}
                                  memberId={memberId}
                                  parentMember={getInviteMember}
                                />
                              ))
                            : ""}
                        </InfiniteList>
                      </div>
                    </div>
                    <div className="inner-section">
                      <div className="panel-tag">Send Invites</div>
                      <div className="select-invite-container">
                        <div className="select-members-panel">
                          <div className="info-tag">
                            <span>i</span>
                          </div>
                          <div className="text-tag">
                            {inviteError === false
                              ? "Select members to invite by clicking the + button next to each member."
                              : "Please select members to send invitations for this group."}
                          </div>
                        </div>

                        <div className="invite-name-panel">
                          {memberName.map((item) => (
                            <span>
                              {item}
                              <em>+</em>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="customize-panel">
                        <textarea
                          id="invitemessage"
                          placeholder="Customize the message of your invite."
                          value={inviteMessage}
                          onChange={(e) => setInviteMessage(e.target.value)}
                        ></textarea>
                        <div>
                          {invitationStatus && (
                            <Alert color="success">Invitation sent.</Alert>
                          )}
                        </div>
                      </div>
                      <div className="inner-button-panel">
                        <Button
                          onClick={() =>
                            memberName == 0 ? inviteerror() : sendInvite()
                          }
                        >
                          Send
                        </Button>
                        <Button
                          onClick={() => {
                            setInviteMessage("");
                            setMemberId([]);
                            setMemberName([]);

                            setInvitationStatus(false);
                          }}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="button-section">
                    <Button
                      onClick={() => {
                        setStatus("cover");
                      }}
                    >
                      {previous}
                    </Button>
                    <Button
                      onClick={() => {
                        setStatus("meet");
                        getMeet();
                      }}
                    >
                      {next}
                    </Button>
                  </div>
                </div>
              </>
            ) : null}
            {status === "meet" && meetDetail ? (
              <div className="meet-conatiner">
                <h4>Meet Settings</h4>
                <div className="allow-text">
                  Allow members of this group to enter the same video conference
                  room.
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      name="meet_enabled"
                      onChange={updateCheck}
                      checked={meetEnabled}
                    />
                    <span>Activate</span>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input 
                    type="checkbox" 
                    name="meet_members_enabled"
                    onChange={updateCheck}
                    checked={meetMembersEnabled}
                     />
                    <span>Display 'Meet Members' menu</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Domain</label>
                  <input
                    type="text"
                    className="input-tag"
                    value={meetDetail.meet_domain}
                    disabled
                  />
                  <div className="description">
                    The domain the Jitsi Meet server runs. Defaults to their
                    free hosted service.
                  </div>
                </div>
                <div className="form-group">
                  <label>Room *</label>
                  <input
                    type="text"
                    className="input-tag"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    maxLength="100"
                  />
                  <div className="description">
                    Set the room group members will enter automatically when
                    visiting the 'Meet the Group' menu
                  </div>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="text" className="input-tag" disabled></input>
                  <div className="description">
                    Set the password the group members will have to enter to
                    join the room. The first to visit - and therefore create -
                    the room will enter without any password. The rest
                    participants will have to fill-in the password.
                  </div>
                </div>
                <div className="form-group">
                  <label>Toolbar</label>
                  <textarea
                    type="text"
                    className="textarea-tag"
                    value={meetDetail.meet_toolbar}
                    disabled
                  />
                  <div className="description">
                    The toolbar buttons to get displayed in comma separated
                    format. For more information refer to <a>TOOLBAR_BUTTONS</a>
                  </div>
                </div>
                <div className="form-group">
                  <label>Settings</label>
                  <input
                    type="text"
                    className="input-tag"
                    value={meetDetail.meet_settings}
                    disabled
                  />
                  <div className="description">
                    The settings to be available in comma separated format. For
                    more information refer to <a>SETTINGS_SECTIONS</a>
                  </div>
                </div>
                <div className="form-group">
                  <label>Width</label>
                  <input
                    type="text"
                    className="input-tag"
                    value={meetDetail.meet_width}
                    disabled
                  />
                  <div className="description">
                    The width in pixels or percentage of the embedded window.
                  </div>
                </div>
                <div className="form-group">
                  <label>Height</label>
                  <input
                    type="text"
                    className="input-tag"
                    value={meetDetail.meet_height}
                    disabled
                  />
                  <div className="description">
                    The height in pixels or percentage of the embedded window.
                  </div>
                </div>
                <div className="form-group">
                  <label>Background Color</label>
                  <input
                    type="text"
                    className="input-tag"
                    value={meetDetail.meet_background_color}
                    disabled
                  />
                  <div className="description">
                    The background color of the window when camera is off.
                  </div>
                </div>
                <div className="form-group">
                  <label>Default Language</label>
                  <input
                    type="text"
                    className="input-tag"
                    value={meetDetail.meet_default_language}
                    disabled
                  />
                  <div className="description">The default language.</div>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      checked={meetDetail.meet_show_watermark === true}
                      disabled
                    />
                    <span>Show Watermark</span>
                  </div>
                  <div className="description">
                    Show/Hide the Jitsi Meet watermark. Please leave it checked
                    unless you use your own domain.
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" disabled />
                    <span>Show Brand Watermark</span>
                  </div>
                  <div className="description">
                    Show/Hide the Jitsi Meet Brand watermark.
                  </div>
                </div>
                <div className="form-group">
                  <label>Brand Watermark Link</label>
                  <input type="text" className="input-tag" disabled></input>
                  <div className="description">
                    The link for the brand watermark.
                  </div>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" disabled />
                    <span>Film Strip Mode Only</span>
                  </div>
                  <div className="description">
                    Display the window in film strip only mode.
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" disabled />
                    <span>Start Audio Only</span>
                  </div>
                  <div className="description">
                    Every participant enters the room having enabled only their
                    microphone. Camera is off.
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" disabled />
                    <span>Disable Video Quality Indicator</span>
                  </div>
                  <div className="description">
                    Hide/Show the video quality indicator.
                  </div>
                </div>
                <div className="button-section">
                  <Button
                    onClick={() => {
                      setStatus("invite");
                    }}
                  >
                    {previous}
                  </Button>
                  <Button
                    onClick={() => {
                      roomName === ""
                        ? alert.error("Please provide room name.", TIMEOUT)
                        : updateRoom();
                    }}
                  >
                    Finish
                  </Button>
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </Layout>
    </>
  );
}
export default CreateGroup;
