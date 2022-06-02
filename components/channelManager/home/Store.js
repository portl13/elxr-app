import React, { useState, useEffect, useContext } from "react";
import { Button, Progress, Alert, Tooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CHANEL_SUB_NAV, TIMEOUT } from "../../../utils/constant";
import { faCamera, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  getStorePortlDetails,
  updateStoreMedia,
  updateStoreDetails,
} from "../../../pages/api/channel-store.api";
import Loader from "../../loader";
import { EditorState } from "draft-js";
import TextEditor from "../TextEditor";
import { css } from "@emotion/core";
import { useAlert } from "react-alert";
import { storeStyle } from "@components/my-account/StoreStyle.style";



const inputCss = css`
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px solid #e9e9e9;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 50px;
    height: 50px;
  }
  input {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: 0 !important;
    opacity: 0;
    width: 100% !important;
    height: 100% !important;
    z-index: 1;
  }
`;
const containerCss = css`
  position: relative;
  .upload-container {
    min-width: 320px;
  }
  .upload-container.ratio-1x1 {
    min-width: 150px;
  }
  .loading-upload {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 2;
  }
`;
const StoreUploadImages = ({
  label,
  name,
  image,
  store,
  setStore,
  user,
  path,
}) => {
  const alert = useAlert();
  const [uploadTime, setUploadTime] = useState(false);

  const handlerUploadImage = (e) => {
    if (e.target.files.length >= 1) {
      uploadImage(e.target.files[0]);
    }
  };

  const uploadImage = async (file) => {
    setUploadTime(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("user_id", user.id);

      const { data } = await updateStoreMedia(user, formData, path);

      setStore({
        ...store,
        [name]: data.url,
      });
      alert.success("Image successfully uploaded!", TIMEOUT);
    } catch (error) {
      alert.error("Error uploading image", TIMEOUT);
    } finally {
      setUploadTime(false);
    }
  };

  const reset = () => {
    setStore({
      ...store,
      [name]: "",
    });
  };

  return (
    <div className="store-panel">
      <label className="store-panel-img-label">
        {label}
        <span className="img_tip">i</span>
      </label>
      <div css={containerCss} className="logo-tag">
        {uploadTime && (
          <div className="loading-upload">
            <Loader color="primary" />
          </div>
        )}
        {image ? (
          <div
            className={`ratio  upload-container ${
              path === "logo" ? "ratio-1x1" : "ratio-16x9"
            }`}
          >
            <img src={image} alt="image" />
            <span onClick={() => reset()} className="cross-icon">
              x
            </span>
          </div>
        ) : (
          <div
            className={`ratio  upload-container ${
              path === "logo" ? "ratio-1x1" : "ratio-16x9"
            }`}
            css={inputCss}
          >
            <input
              onChange={(e) => handlerUploadImage(e)}
              accept="image/*"
              type="file"
              name={name}
            />
            <FontAwesomeIcon icon={faCamera} />
          </div>
        )}
      </div>
    </div>
  );
};

function Store({ innerNav, user }) {
  const alert = useAlert();
  const [store, setStore] = useState({});
  const [storeUpdate, setStoreUpdate] = useState({});
  const [statusUpdate, setStatusUpdate] = useState(false);
  const [loader, setLoader] = useState(true);
  const [short_description, setShortDescription] = useState("");
  const [editorShort, setEditorShort] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (user?.id) {
      getStorePortlDetails(user)
        .then(({ data }) => {
          setStore(data);
          setStoreUpdate({
            ...storeUpdate,
            store_email: data?.vendor_shop_email,
            phone: data?.vendor_shop_phone,
            store_name: data?.vendor_shop_name,
          });
          setLoader(false);
        })
        .catch(() => setLoader(false));
    }
  }, [user]);

  const handlerChange = (e) => {
    setStoreUpdate({
      ...storeUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSubmit = () => {
    setStatusUpdate(true);
    if (!storeUpdate.store_name) {
      alert.error("Store name is required", TIMEOUT);
      setStatusUpdate(false);
      return;
    }

    updateStoreDetails(user, {
      user_id: user.id,
      data: {
        ...storeUpdate,
        shop_description: short_description,
      },
    })
      .then(() => {
        alert.success("Settings successfully updated", TIMEOUT);
      })
      .catch(() => {
        alert.error("error updating the configuration", TIMEOUT);
      })
      .finally(() => {
        setStatusUpdate(false);
      });
  };

  const {
    mobile_banner,
    vendor_banner,
    vendor_list_banner,
    vendor_shop_logo,
    vendor_description,
    image_channel_offline,
  } = store;

  if (loader) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loader color="primary" />
      </div>
    );
  }
  return (
    <section css={storeStyle}>
      <h2 className="store-title">General Setting</h2>
      <div className="store-panel">
        <label className="store-panel-label">
          Store Name<span className="required">*</span>
        </label>
        <input
          className="store-panel-input"
          onChange={(e) => handlerChange(e)}
          name="store_name"
          value={storeUpdate.store_name}
          type="text"
        />
      </div>
      <div className="store-panel">
        <label className="store-panel-label">Store Email</label>
        <input
          className="store-panel-input"
          onChange={(e) => handlerChange(e)}
          name="store_email"
          value={storeUpdate.store_email}
          type="email"
        />
      </div>
      <div className="store-panel">
        <label className="store-panel-label">Channel Phone</label>
        <input
          className="store-panel-input"
          onChange={(e) => handlerChange(e)}
          name="phone"
          value={storeUpdate.phone}
          type="email"
        />
      </div>
      <h2>Channel Brand Setup</h2>
      <StoreUploadImages
        label="Channel Logo"
        className
        name="vendor_shop_logo"
        image={vendor_shop_logo}
        store={store}
        setStore={setStore}
        user={user}
        path="logo"
      />

      <StoreUploadImages
        label="Channel Banner"
        name="vendor_banner"
        image={vendor_banner}
        store={store}
        setStore={setStore}
        user={user}
        path="banner"
      />

      <StoreUploadImages
        label="Mobile Banner"
        name="mobile_banner"
        image={mobile_banner}
        store={store}
        setStore={setStore}
        user={user}
        path="banner-mobile"
      />

      <StoreUploadImages
        label="Channel List Banner"
        name="vendor_list_banner"
        image={vendor_list_banner}
        store={store}
        setStore={setStore}
        user={user}
        path="banner-list"
      />
      <StoreUploadImages
        label="Channel Image Offline"
        name="image_channel_offline"
        image={image_channel_offline}
        store={store}
        setStore={setStore}
        user={user}
        path="image"
      />

      <div className="wcfm-descp-panel">
        <label>
          Channel Description<span className="img_tip">i</span>{" "}
        </label>
        <div className="content-panel">
          <TextEditor
            editorState={editorShort}
            setEditorState={setEditorShort}
            setContentHtml={setShortDescription}
            editorVal={vendor_description}
          />
        </div>
      </div>
      <div className="store-panel d-flex mb-5">
        <button
          disabled={statusUpdate}
          onClick={() => handlerSubmit()}
          className="btn btn-primary ml-auto mr-4"
        >
          {statusUpdate ? "updated" : "update"}
        </button>
      </div>
    </section>
  );
}

export default Store;
