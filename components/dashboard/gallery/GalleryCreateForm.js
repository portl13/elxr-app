import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { genericFetchPost, getCategories } from "@request/dashboard";
import { TIMEOUT } from "@utils/constant";
import * as Yup from "yup";
import useSWRImmutable from "swr/immutable";
import InputDashForm from "@components/shared/form/InputDashForm";
import InputDashTags from "@components/shared/form/InpushDashTags";
import MediaLibraryCover from "@components/shared/media/MediaLibraryCover";
import InputDashRadio from "@components/shared/form/InputDashRadio";
import BackButton from "@components/shared/button/BackButton";
import { UserContext } from "@context/UserContext";
import ListNavItem from "@components/layout/ListNavItem";
import InputSelectChannel from "@components/shared/form/InputSelectChannel";
import BlockUi, { containerBlockUi } from "@components/ui/blockui/BlockUi";
import { faImages, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Editor from "@components/shared/editor/Editor";
import InputDashCheck from "@components/shared/form/InputDashCheck";
import ImageModal from "@components/dashboard/gallery/ImageModal";
import SongBuilder from "@components/song/SongBuilder";

const baseUrl = process.env.apiV2;
const categoriesUrl = `${baseUrl}/gallery/categories`;
const savePhoto = `${baseUrl}/gallery/`;

function GalleryCreateForm({ id = null }) {
  const alert = useAlert();
  const router = useRouter();
  const { user } = useContext(UserContext);
  const token = user?.token;
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState("");
  const [tags, setTags] = useState([]);
  const [blocking, setBlocking] = useState(!!id);
  const [open, setOpen] = useState(false);
  const [editPhoto, setEditPhoto] = useState(null);
  const [images, setImages] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      channel_id: "",
      category: "",
      tags: [],
      type: "open",
      images: [],
      thumbnail: "",
      status: "publish",
      show_in_feed: true,
    },
    onSubmit: async (values) => saveAndEditGallery(values),
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      channel_id: Yup.string().required("Channel id is required"),
      category: Yup.string().required("Category is required"),
      images: Yup.string().required("Images is required"),
      thumbnail: cover
        ? Yup.string()
        : Yup.string().required("An Image is Required to Save"),
    }),
  });

  const { data: categories } = useSWRImmutable(
    token ? [categoriesUrl, token] : null,
    getCategories
  );

  const { data: imagesData, mutate } = useSWRImmutable(
    token && id ? [`${savePhoto}${id}`, token] : null,
    getCategories
  );

  const saveAndEditGallery = async (values) => {
    setBlocking(true);
    try {
      await genericFetchPost(
        id ? `${savePhoto}${id}` : savePhoto,
        token,
        values
      );
      await mutate();
      setBlocking(false);
      setCover("");
      formik.resetForm();
      alert.success(
        id ? "Gallery Edit Success" : "Gallery Created",
        TIMEOUT
      );
      await router.replace("/manage/galleries");
    } catch (error) {
      alert.error("Error", TIMEOUT);
    }
  };

  const handleChangeCategory = (value) => {
    setCategory(value);
    formik.setFieldValue("category", String(value.value));
  };

  const onSubmit = async (status) => {
    await formik.setFieldValue("status", status);
    await formik.submitForm();
  };

  const selectCover = (media) => {
    setCover({ url: media.source_url });
    formik.setFieldValue("thumbnail", media.id);
  };

  const removeCover = () => {
    setCover(null);
    formik.setFieldValue("thumbnail", "");
  };

  function handlerSelectChannel(value) {
    formik.setFieldValue("channel_id", String(value.value));
  }

  useEffect(() => {
    if (imagesData) {
      setBlocking(false);
      formik.setFieldValue("channel_id", imagesData.channel_id);
      formik.setFieldValue("title", imagesData.title);
      formik.setFieldValue("description", imagesData.description);
      formik.setFieldValue("type", imagesData.type);
      formik.setFieldValue("show_in_feed", imagesData.show_in_feed);

      setImages(imagesData.images);

      if (imagesData.thumbnail !== "") {
        setCover({ url: imagesData.thumbnail });
      }

      if (imagesData.tags) {
        const newTags = imagesData.tags.map(({ value, label }) => ({
          value,
          label,
        }));

        setTags(newTags);

        formik.setFieldValue("tags", newTags);
      }
    }
  }, [imagesData]);

  useEffect(() => {
    if (categories && imagesData) {
      const category = categories.find(
        (item) => item.value === imagesData.category_id
      );
      if (!category) return;
      setCategory(category);
      formik.setFieldValue("category", String(category.value));
    }
  }, [categories, imagesData]);

  useEffect(() => {
    if (tags) {
      const newTags = tags.map((tag) => tag.value);
      formik.setFieldValue("tags", newTags);
    }
  }, [tags]);

  const handleContent = (content) => {
    formik.setFieldValue("description", content);
  };

  useEffect(() => {
    if (images) {
      formik.setFieldValue("images", [...images.map((images) => images.id)]);
    }
  }, [images]);

  return (
    <>
      <BackButton />
      <div
        css={containerBlockUi}
        className="container container-80 px-2 pb-4 postion-relative"
      >
        {blocking && <BlockUi color="#eb1e79" />}
        <div className="my-5">
          <ListNavItem
            data={{
              title: `${id ? "Edit" : "Create"} Gallery`,
              icon: (
                <FontAwesomeIcon className="text-podcast" icon={faImages} />
              ),
              type: "heading",
            }}
          />
        </div>
        <div className="mb-4 col-12 col-md-6">
          <MediaLibraryCover
            token={token}
            cover={cover}
            reset={removeCover}
            selectMedia={selectCover}
            text="Gallery Cover"
            className="ratio ratio-music"
            error={
              formik.errors.thumbnail && formik.touched.thumbnail
                ? formik.errors.thumbnail
                : null
            }
          />
        </div>
        <div className="row">
          <div className="mb-4 col-12 col-md-6">
            <InputDashForm
              name="title"
              label="Title"
              type={"text"}
              value={formik.values.title}
              onChange={formik.handleChange}
              touched={formik.touched.title}
              error={formik.errors.title}
              required={true}
            />
          </div>
          <div className="col-12 col-md-6 mb-4">
            <InputSelectChannel
              label="Channel"
              name="channel_id"
              placeholder="Select Channel..."
              required={true}
              error={formik.errors.channel_id}
              touched={formik.touched.channel_id}
              onChange={handlerSelectChannel}
              value={formik.values.channel_id}
            />
          </div>
          <div className="mb-4 col-12 col-md-6">
            <InputDashForm
              label="Category"
              name="category"
              type={"select"}
              required={true}
              error={formik.errors.category}
              onChange={handleChangeCategory}
              value={category}
              options={categories}
              touched={formik.touched.category}
            />
          </div>
          <div className="mb-4 col-12 col-md-6">
            <InputDashTags value={tags} setValue={setTags} />
          </div>
          <div className="mb-4 col-12">
            <Editor
              className="editor-styles w-100 full"
              value={formik.values.description}
              onChange={handleContent}
            />
            {formik.errors.description && formik.touched.description && (
              <div className="invalid-feedback d-block col font-size-18 mt-2">
                {formik.errors.description}
              </div>
            )}
          </div>
          <h3>Add Image</h3>
          {formik.errors.images && formik.touched.images && (
              <div className="alert alert-danger w-100" role="alert">
                At least select an image.
              </div>
          )}
          {images ? (
              <div className={"col-12"}>
                <SongBuilder
                    setEditSong={setEditPhoto}
                    setOpen={setOpen}
                    songs={images}
                    setSongs={setImages}
                    thumbnail={true}
                />
              </div>
          ) : null}
          <div className="w-100 mb-4 d-flex justify-content-end">
            <button
                type={"button"}
                onClick={() => setOpen(!open)}
                className="btn px-3 mr-2 text-primary font-size-18"
            >
              <i>
                <FontAwesomeIcon
                    style={{
                      width: 20,
                      marginRight: 10,
                    }}
                    className={"text-icon"}
                    icon={faPlus}
                />
              </i>
              Add a Image
            </button>
          </div>
          <h3 className={"font-size-14 col-12 mb-3"}>Visibility Settings</h3>
          <div className="mb-4 d-flex col-12">
            <InputDashRadio
              values={[
                {
                  value: "open",
                  label: "Open",
                },
                {
                  value: "subscribers",
                  label: "Subscribers Only",
                },
              ]}
              name={"type"}
              value={formik.values.type}
              onChange={formik.handleChange}
            />
          </div>

          <h3 className={"font-size-14 mt-4"}>Show in Feed</h3>

          <div className="mt-3 col-12">
            <InputDashCheck
              name={"show_in_feed"}
              label={""}
              value={formik.values.show_in_feed}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <div className="w-100 d-flex justify-content-end">
          <button
            onClick={() => router.back()}
            className={"btn btn-outline-primary b-radius-25"}
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit("draft")}
            className={"btn btn-theme b-radius-25"}
          >
            Save as Draft
          </button>
          <button
            onClick={() => onSubmit("publish")}
            className={"btn btn-primary b-radius-25"}
          >
            {id ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {open ? (
        <ImageModal
          open={open}
          setEpisodes={setImages}
          setOpen={setOpen}
          setEditEpisode={setEditPhoto}
          editEpisode={editPhoto}
          prevEpisodes={images}
        />
      ) : null}
    </>
  );
}

export default GalleryCreateForm;
