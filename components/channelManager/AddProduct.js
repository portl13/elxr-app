import React, { useState, useEffect } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useAlert } from "react-alert";
import { Button, Spinner } from "reactstrap";
import { EditorState } from "draft-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube, faUpload } from "@fortawesome/free-solid-svg-icons";
import {
  getProdCategories,
  createNewProduct,
  getProdTags,
} from "../../pages/api/channel-store.api";
import { TIMEOUT, generateRandomString } from "../../utils/constant";
import TextEditor from "./TextEditor";
import UploadImage from "./UploadImage";
import DownloadCard from "./DownloadCard";
const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "var(--dark-color) !important",
    color: "var(--typo) !important",
    border: "1px solid var(--typo)",
    fontColor: "var(--typo) !important",
    boxShadow: "none",
    borderColor: state.isFocused ? "var(--typo)" : "",
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "var(--typo)" : "",
    },
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  input: (base) => ({
    ...base,
    color: "var(--typo) !important",
  }),
  menu: (base) => ({
    ...base,
    background: "var(--dark-color) !important",
    border: "none",
    color: "var(--typo) !important",
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    background: "var(--dark-color) !important",
    border: "none",
    color: "var(--typo) !important",
    // kill the white space on first and last option
    padding: 0,
  }),
  option: (base) => ({
    ...base,
    background: "var(--dark-color) !important",
    color: "var(--typo) !important",
    "&:hover": {
      // Overwrittes the different states of border
      background: "grey !important",
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "var(--typo) !important",
  }),
};
function AddProduct({ user, setTab, handleRedirect }) {
  const alert = useAlert();
  const [editorLong, setEditorLong] = useState(() => EditorState.createEmpty());
  const [editorShort, setEditorShort] = useState(() =>
    EditorState.createEmpty()
  );
  const type = "simple";
  const [categoriesList, setCategoriesList] = useState([]);
  const [name, setProdTitle] = useState();
  const [price, setPrice] = useState("");
  const [categories, setSelCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [short_description, setShortDescription] = useState("");
  const [description, setLongDescription] = useState("");
  const [uploadImage, setUploadImage] = useState(false);
  const [imageSpinner, setImageSpinner] = useState(false);
  const [sale_price, setSalePrice] = useState("");
  const [tagLength, setTagLength] = useState(0);
  const [tagSelected, setTagSelected] = useState([]);
  const [showDownload, setShowDownload] = useState(false);
  const [download_limit, setDownloadLimit] = useState("");
  const [download_expiry, setDownloadExpiry] = useState("");
  const [response, setResponse] = useState([]);
  const [image, setImage] = useState(
    "https://data.portl.live/wp-content/plugins/wc-frontend-manager/includes/libs/upload/images/Placeholder.png"
  );
  const getProdDetails = () => {
    getProdCategories(user)
      .then((res) => {
        setCategoriesList(res.data);
      })
      .catch(() => {});
  };
  const getInputTags = () => {
    if (!tags.length)
      getProdTags(user)
        .then((res) => {
          setTags(res.data);
          setTagLength(res.data.length);
        })
        .catch(() => {});
  };
  const checKError = () => {
    let status = true;
    if (!name) {
      alert.error("Please add Product Title before submit.", TIMEOUT);
      status = false;
    }
    if (response.length === 0) {
      alert.error("Please add Downloadable product before submit.", TIMEOUT);
      status = false;
    }
    if (type === "publish" && !sale_price) {
      alert.error("Please add Sale Price before submit.", TIMEOUT);
      status = false;
    }
    return status;
  };
  useEffect(() => {
    if (user?.id) getProdDetails();
  }, [user]);
  const handleSubmit = (status) => {
    if (checKError(status)) {
      const formData = {
        name,
        type,
        status,
        price,
        description,
        short_description,
        sale_price,
        downloadable: true,
        downloads: response,
        download_limit: download_limit ? parseInt(download_limit) : -1,
        download_expiry: download_expiry ? parseInt(download_expiry) : -1,
        ...(image !==
          "https://data.portl.live/wp-content/plugins/wc-frontend-manager/includes/libs/upload/images/Placeholder.png" && {
          images: [
            {
              src: image,
            },
          ],
        }),
        categories: categories.map((e) => {
          return { id: e.value };
        }),
        sku: generateRandomString(),
        regular_price: price,
      };
      if (tagSelected.length) {
        formData["tags"] = tagSelected.map((e) => {
          let obj = {
            name: e.label,
            slug: e.label,
          };
          if (typeof e.value === "number") obj["id"] = e.value;
          return obj;
        });
      }
      if (type === "simple") {
        if (price >= sale_price) {
          formData["price"] = sale_price;
          formData["regular_price"] = price;
        }
        if (price < sale_price) {
          formData["sale_price"] = "";
        }
      }
      createNewProduct(user, formData)
        .then(() => {
          alert.success("Product created successfully.", TIMEOUT);
          handleRedirect("product");
        })
        .catch(() => alert.error("Something went wrong.", TIMEOUT));
    }
  };
  function getName(e) {
    var value =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setProdTitle(value);
  }
  function priceValue(e) {
    const exp = /^\d*\.?\d{0,2}$/;
    if (e.target.value === "" || exp.test(e.target.value)) {
      setPrice(e.target.value);
    }
  }
  function salePrice(e) {
    const exp = /^\d*\.?\d{0,2}$/;
    if (e.target.value === "" || exp.test(e.target.value)) {
      setSalePrice(e.target.value);
    }
  }
  useEffect(() => setTimeout(() => setImageSpinner(false), [2500]), [image]);
  return (
    <>
      <div className="wcfm-collapse-content">
        <div className="wcfm-top-element-container">
          <h4>Product Manager</h4>
        </div>
        <div className="wcfm-top-element-container">
          <h5>Add Product</h5>
          <div className="new-tag-panel">
            <Button type="button" onClick={() => setTab("addproduct")}>
              <FontAwesomeIcon icon={faCube} />
              Add New
            </Button>
          </div>
        </div>
        <div className="wcfm-tabWrap mtop30">
          <div className="wcfm_add_panel">
            <div className="wcfm_general_fields">
              <div className="wcfm-col-12">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Title"
                  onChange={(e) => getName(e)}
                  maxLength="100"
                />
              </div>
              <div className="wcfm-col-12">
                <div className="wcfm-col-6">
                  <div className="text-tag">Price($)</div>
                  <div className="input-tag">
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => priceValue(e)}
                      maxLength="10"
                    />
                  </div>
                </div>
                <div className="wcfm-col-6">
                  <div className="text-tag">Sale Price($)</div>
                  <div className="input-tag">
                    <input
                      type="text"
                      value={sale_price}
                      onChange={(e) => salePrice(e)}
                      maxLength="10"
                    />
                  </div>
                </div>
              </div>
              <div className="wcfm-col-12">
                <div className="wcfm-col-full">
                  <div className="text-tag">Categories</div>
                  <div className="input-tag">
                    <Select
                      isMulti
                      styles={customStyles}
                      onChange={setSelCategory}
                      options={categoriesList.map((e) => {
                        return { value: e.id, label: e.name };
                      })}
                      placeholder="Select Categories"
                    />
                  </div>
                </div>
              </div>
              <div className="wcfm-col-12">
                <div className="wcfm-col-full">
                  <div className="text-tag">Tags</div>
                  <div className="input-tag">
                    <CreatableSelect
                      isMulti
                      styles={customStyles}
                      onChange={setTagSelected}
                      options={tags.map((e) => {
                        return { value: e.id, label: e.name };
                      })}
                    />
                    <span
                      className="input-tag-select"
                      onClick={() => getInputTags()}
                    >
                      {!tagLength
                        ? "Choose from the most used tags"
                        : `${tagLength} tags found`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="wcfm_gallery_fields">
              <div className="product-feature-upload">
                <img src={image} alt="image" />
                {image ===
                "https://data.portl.live/wp-content/plugins/wc-frontend-manager/includes/libs/upload/images/Placeholder.png" ? (
                  <div
                    className="upload-photo-icon"
                    onClick={() => setUploadImage(true)}
                  >
                    <FontAwesomeIcon icon={faUpload} />
                    <div className="tooltip-panel">
                      Upload Product Photo<em></em>
                    </div>
                  </div>
                ) : (
                  <div
                    className="edit-photo-icon"
                    onClick={() => setUploadImage(true)}
                  >
                    <FontAwesomeIcon icon={faUpload} />
                    <div className="tooltip-panel">
                      Upload Product Photo<em></em>
                    </div>
                  </div>
                )}
                {imageSpinner && (
                  <Spinner
                    className="spinner"
                    style={{ width: "1.2rem", height: "1.2rem" }}
                    color="primary"
                  />
                )}
                {image !==
                  "https://data.portl.live/wp-content/plugins/wc-frontend-manager/includes/libs/upload/images/Placeholder.png" && (
                  <Button
                    className="cancel-btn"
                    onClick={() =>
                      setImage(
                        "https://data.portl.live/wp-content/plugins/wc-frontend-manager/includes/libs/upload/images/Placeholder.png"
                      )
                    }
                  >
                    +
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="wcfm-descp-panel">
            <div className="head-tag">Short Description</div>
            {/* <button className="button-tag">
              <FontAwesomeIcon icon={faMusic} /> Add Media
            </button> */}
            <div className="content-panel">
              <TextEditor
                editorState={editorShort}
                setEditorState={setEditorShort}
                setContentHtml={setShortDescription}
              />
            </div>
          </div>
          <div className="wcfm-descp-panel">
            <div className="head-tag">Description</div>
            {/* <button className="button-tag"> 
              <FontAwesomeIcon icon={faMusic} /> Add Media
            </button> */}
            <div className="content-panel">
              <TextEditor
                editorState={editorLong}
                setEditorState={setEditorLong}
                setContentHtml={setLongDescription}
              />
            </div>
          </div>
        </div>
        <div className="wcfm-tabWrap mtop30">
          <div className="wfcm-download-panel">
            <div className="file-tag">Files</div>
            <DownloadCard
              showDownload={showDownload}
              setShowDownload={setShowDownload}
              user={user}
              setResponse={setResponse}
              response={response}
            />
            <div className="col-file-12">
              <div className="label-tag">Download Limit</div>
              <div className="input-tag">
                <input
                  type="text"
                  value={download_limit}
                  onChange={(e) => {
                    const exp = /^[0-9]*$/;
                    if (e.target.value === "" || exp.test(e.target.value)) {
                      setDownloadLimit(e.target.value);
                    }
                  }}
                />
              </div>
            </div>
            <div className="col-file-12">
              <div className="label-tag">Download Expiry</div>
              <div className="input-tag">
                <input
                  type="text"
                  value={download_expiry}
                  onChange={(e) => {
                    const exp = /^[0-9]*$/;
                    if (e.target.value === "" || exp.test(e.target.value)) {
                      setDownloadExpiry(e.target.value);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="wcfm-button-panel">
          <button onClick={() => handleSubmit("publish")}>Publish</button>
          <button onClick={() => handleSubmit("draft")}>Draft</button>
          <button onClick={() => handleRedirect("product")}>Cancel</button>
        </div>
      </div>
      {uploadImage && (
        <UploadImage
          show={uploadImage}
          setUploadImage={setUploadImage}
          user={user}
          setPicture={setImage}
          setImageSpinner={setImageSpinner}
          value="Product"
        />
      )}
    </>
  );
}
export default AddProduct;
