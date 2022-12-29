import React, { useEffect, useState } from "react";
import {
  getStorePortlDetails,
  updateStoreDetails,
  updateStoreMedia,
} from "@api/channel-store.api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import { TIMEOUT } from "@utils/constant";
import InputDashForm from "@components/shared/form/InputDashForm";
import Editor from "@components/shared/editor/Editor";
import { getCategories } from "@request/dashboard";
import useSWRImmutable from "swr/immutable";
import axios from "axios";
import MediaLibraryCover from "@components/shared/media/MediaLibraryCover";
import MediaLibraryAvatar from "@components/shared/media/MediaLibraryAvatar";
import BlockUi from "@components/ui/blockui/BlockUi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";
import MediaLibraryVideo from "@components/MediaLibraryVideo/MediaLibraryVideo";
const wcfmApiURl1 = process.env.baseUrl + "/wp-json/portl/v1/";

const baseUrl = `${process.env.apiV2}/creator`;

const urlImage = process.env.SubdomainCloudflare;
const calculateNumber = [
  [1, 3],
  [1, 2],
  [2, 3],
];

function Branding({ user }) {
  const alert = useAlert();
  const token = user?.token;
  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");
  const [statusUpdate, setStatusUpdate] = useState(true);
  const [category, setCategory] = useState([]);

  const [cover, setCover] = useState();
  const [miniatures, setMiniatures] = useState([]);
  const [uuid, setUuid] = useState("");
  const [openMedia, setOpenMedia] = useState(false);

  const brandingForm = useFormik({
    initialValues: {
      store_name: "",
      store_email: "",
      phone: "",
      shop_description: "",
      category: [],
      video_url: "",
      thumbnail: "",
      size: "",
    },
    onSubmit: async (values) => updateBranding(values),
    validationSchema: Yup.object({
      store_name: Yup.string().required("Creator name is required"),
      store_email: Yup.string().required("Creator email is required"),
      shop_description: Yup.string().required(
        "Creator description is required"
      ),
      video_url: Yup.string().required("Video is required"),
      category: Yup.array().required("Category is required"),
      thumbnail: cover
        ? Yup.string()
        : Yup.string().required("An Image is Required to Save"),
    }),
  });

  const updateBranding = async (values) => {
    setStatusUpdate(true);
    try {
      await updateStoreDetails(user, {
        user_id: user.id,
        data: {
          ...values,
        },
      });
      await updateCategory(values.category);
      if (logo && logo.id) {
        updateImages(
          {
            user_id: user.id,
            type: "gravatar",
            image: logo.id,
          },
          token
        ).then();
      }
      if (banner && banner.id) {
        updateImages(
          {
            user_id: user.id,
            type: "banner",
            image: banner.id,
          },
          token
        ).then();
      }
      alert.success("Store successfully updated", TIMEOUT);
    } catch (e) {
      alert.error("Error updating the configuration", TIMEOUT);
    } finally {
      setStatusUpdate(false);
    }
  };

  const updateCategory = async (category) => {
    await axios.post(
      `${baseUrl}/categories/${user.id}`,
      {
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const updateImages = async (data, token) => {
    try {
      await axios.post(`${wcfmApiURl1}channel/branding/media`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    getStorePortlDetails(user)
      .then(({ data }) => {
        brandingForm.setFieldValue("store_name", data.vendor_shop_name || "");
        brandingForm.setFieldValue("phone", data.vendor_shop_phone || "");
        brandingForm.setFieldValue("store_email", data.vendor_shop_email || "");
        brandingForm.setFieldValue("size", data?.size || "");
        brandingForm.setFieldValue("video_url", data?.video_url || "");
        brandingForm.setFieldValue(
          "shop_description",
          data.vendor_description || ""
        );
        setLogo({ url: data.vendor_shop_logo || "" });
        setBanner({ url: data.vendor_banner || "" });
        setStatusUpdate(false);

        if (!onlyLettersAndNumbers(data?.video_url) && data?.thumbnail) {
          setCover({ url: data?.thumbnail });
          brandingForm.setFieldValue("thumbnail", data?.thumbnail);
        }
        if (onlyLettersAndNumbers(data.video_url)) {
          setCover({
            url: `https://${process.env.SubdomainCloudflare}/${data?.video_url}/thumbnails/thumbnail.jpg?time=${data?.size}s`,
          });
          brandingForm.setFieldValue(
            "thumbnail",
            `https://${process.env.SubdomainCloudflare}/${data?.video_url}/thumbnails/thumbnail.jpg?time=${data?.size}s`
          );
        }
      })
      .catch(() => {});
  }, [user]);

  const { data: categories } = useSWRImmutable(
    token ? [`${baseUrl}/categories`, token] : null,
    getCategories
  );

  const { data: currentCategory } = useSWRImmutable(
    token ? [`${baseUrl}/categories/${user.id}`, token] : null,
    getCategories
  );

  const setCategoryValue = (value) => {
    setCategory(value);
    brandingForm.setFieldValue("category", [value[0].value]);
  };

  useEffect(() => {
    if (currentCategory) {
      setCategoryValue(currentCategory);
    }
  }, [currentCategory]);

  const selectMediaCover = (media) => {
    setBanner({ url: media.source_url, id: media.id });
  };
  const selectMediaLogo = (media) => {
    setLogo({ url: media.source_url, id: media.id });
  };

  const resetMediaCover = () => {
    setBanner("");
  };

  const resetMediaLogo = () => {
    setLogo("");
  };

  const selectCover = (media) => {
    setCover({ url: media.source_url });
    brandingForm.setFieldValue("thumbnail", media.id);
    brandingForm.setFieldValue("size", "");
    setUuid("");
    setMiniatures([]);
  };

  const removeCover = () => {
    setCover(null);
    brandingForm.setFieldValue("thumbnail", "");
  };

  const saveTimeThumbnails = (time) => {
    const url = `https://${urlImage}/${uuid}/thumbnails/thumbnail.jpg?time=${time}s`;
    brandingForm.setFieldValue("size", time);
    brandingForm.setFieldValue("thumbnail", url);
    setCover({
      url,
    });
    setUuid("");
    setMiniatures([]);
  };

  const selectVideo = (media) => {
    brandingForm.setFieldValue("video_url", media.uid);
    setUuid(media.uid);
    setMiniatures(
      calculateNumber.map(([multiply, division]) => {
        return Math.floor((media.duration / division) * multiply);
      })
    );
  };

  return (
    <>
      <div className="branding position-relative pb-5">
        {statusUpdate && <BlockUi color={"var(--primary-color)"} />}
        <div className="row">
          <div className="col-12">
            <MediaLibraryCover
              selectMedia={selectMediaCover}
              cover={banner}
              reset={resetMediaCover}
              text="Upload cover image"
              token={token}
              className="ratio ratio-channel"
              isAvatar={true}
            />
            <MediaLibraryAvatar
              selectMedia={selectMediaLogo}
              logo={logo}
              reset={resetMediaLogo}
              text={"Brand Logo"}
              token={token}
              className="ratio ratio-channel-avatar"
              url={logo?.url}
            />
          </div>
        </div>
        <form onSubmit={brandingForm.handleSubmit} className="row mt-4">
          <div className="col-12 col-md-6 mb-4">
            <InputDashForm
              name={"store_name"}
              type="text"
              label="Creator Name"
              required={true}
              onChange={brandingForm.handleChange}
              value={brandingForm.values.store_name}
              touched={brandingForm.touched.store_name}
              error={brandingForm.errors.store_name}
            />
          </div>
          <div className="col-12 col-md-6 mb-4">
            <InputDashForm
              required={true}
              type="select"
              name="category"
              value={category}
              onChange={setCategoryValue}
              label="Category"
              error={brandingForm.errors.category}
              touched={brandingForm.touched.category}
              options={categories}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <InputDashForm
              type={"email"}
              label={"Creator Email"}
              name={"store_email"}
              required={true}
              onChange={brandingForm.handleChange}
              value={brandingForm.values.store_email}
              touched={brandingForm.touched.store_email}
              error={brandingForm.errors.store_email}
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <InputDashForm
              type={"text"}
              label={"Creator Phone"}
              name={"phone"}
              required={false}
              onChange={brandingForm.handleChange}
              value={brandingForm.values.phone}
              touched={brandingForm.touched.phone}
              error={brandingForm.errors.phone}
            />
          </div>
          <div className="col-12">
            <Editor
              className="editor-styles"
              onChange={(value) =>
                brandingForm.setFieldValue("shop_description", value)
              }
              value={brandingForm.values.shop_description}
            />
            {brandingForm.touched.shop_description && (
              <div className="invalid-feedback d-block">
                {brandingForm.errors.shop_description}
              </div>
            )}
          </div>
          <div className="mb-2 col-12 mt-5">
            <InputDashForm
              label="Video URL"
              name="video_url"
              placeholder={"Enter video url (youtube, vimeo, etc)"}
              type={"text"}
              required={true}
              value={brandingForm.values.video_url}
              onChange={(e) => {
                brandingForm.handleChange(e);
              }}
              touched={brandingForm.touched.video_url}
              error={brandingForm.errors.video_url}
            />
          </div>
          <span className="d-flex my-3 text-center justify-content-center separator-or align-items-center col-12">
            <b>Or</b>
          </span>
          <button
            type={"button"}
            onClick={() => setOpenMedia(true)}
            className="btn btn-primary w-100 br-25"
          >
            upload video
          </button>
          <div className={"row justify-content-center w-100"}>
            <h3 className={"col-12 text-center mt-4 font-size-18"}>
              {uuid ? "Please Select or Upload a Video Cover Image" : null}
            </h3>
            {cover ? (
              <div className={"col-md-6 "}>
                <div
                  style={{
                    backgroundImage: `url(${cover.url})`,
                  }}
                  className="upload-image ratio ratio-16x9 position-relative  d-flex justify-content-center align-items-center border-radius-17 border-white"
                >
                  <button
                    type={"button"}
                    onClick={removeCover}
                    className="btn btn-clean-media banner"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            ) : null}
            {uuid &&
              miniatures.map((time) => (
                <div key={time} className={"col-md-3 mt-4 col-12"}>
                  <div
                    onClick={() => saveTimeThumbnails(time)}
                    style={{
                      backgroundImage: `url(https://${urlImage}/${uuid}/thumbnails/thumbnail.jpg?time=${time}s)`,
                    }}
                    className="ratio ratio-16x9 bg-cover bg-gray border-radius-17 pointer"
                  ></div>
                </div>
              ))}

            {(brandingForm.touched.thumbnail &&
              brandingForm.errors.thumbnail) ||
            miniatures.length > 0 ||
            (!onlyLettersAndNumbers(brandingForm.values.video_url) &&
              !brandingForm.values.thumbnail) ? (
              <div className="col-md-3 mt-4">
                <MediaLibraryCover
                  token={token}
                  cover={cover}
                  reset={removeCover}
                  selectMedia={selectCover}
                  text="Upload Video Cover"
                  className={"ratio ratio-16x9"}
                  error={
                    brandingForm.errors.thumbnail &&
                    brandingForm.touched.thumbnail
                      ? brandingForm.errors.thumbnail
                      : null
                  }
                />
              </div>
            ) : null}
          </div>

          <div className="d-flex mt-3 justify-content-center justify-content-md-end w-100 mt-5">
            <button className="btn btn-create px-5" type="submit">
              {!statusUpdate ? "Save" : "Updating"}
            </button>
          </div>
        </form>
      </div>
      {openMedia ? (
        <MediaLibraryVideo
          show={openMedia}
          setShow={setOpenMedia}
          selectMedia={selectVideo}
        />
      ) : null}
    </>
  );
}

export default Branding;
