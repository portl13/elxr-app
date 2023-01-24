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
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Editor from "@components/shared/editor/Editor";
import InputDashCheck from "@components/shared/form/InputDashCheck";

const baseUrl = process.env.apiV2;
const categoriesUrl = `${baseUrl}/gallery/categories`;
const savePhoto = `${baseUrl}/gallery/`;

function AlbumsPhotosCreateForm({ id = null }) {
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
  const [photos, setPhotos] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      channel_id: "",
      category: "",
      tags: [],
      type: "open",
      photos: [],
      thumbnail: "",
      status: "publish",
      show_in_feed: true
    },
    onSubmit: async (values) => saveAndEditAlbumsPhotos(values),
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      channel_id: Yup.string().required("Channel id is required"),
      category: Yup.string().required("Category is required"),
      photos: Yup.string().required("Photo is required"),
      thumbnail: cover
        ? Yup.string()
        : Yup.string().required("An Image is Required to Save"),
    }),
  });

  const { data: categories } = useSWRImmutable(
    token ? [categoriesUrl, token] : null,
    getCategories
  );

  if (categories){
    console.log({categories})
  }

  const { data: photoData, mutate } = useSWRImmutable(
    token && id ? [`${savePhoto}${id}`, token] : null,
    getCategories
  );

  const saveAndEditAlbumsPhotos = async (values) => {
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
      alert.success(id ? "Albums Photos Edit Success" : "Albums Photos Created", TIMEOUT);
      await router.replace("/manage/albums-photos");
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
    if (photoData) {
      setBlocking(false);
      formik.setFieldValue("channel_id", photoData.channel_id);
      formik.setFieldValue("title", photoData.title);
      formik.setFieldValue("description", photoData.description);
      formik.setFieldValue("type", photoData.type);
      formik.setFieldValue('show_in_feed', photoData.show_in_feed)
      setPhotos(photoData.episodes_formated)
      if (photoData.thumbnail !== "") {
        setCover({ url: photoData.thumbnail });
      }

      if (photoData.tags) {
        const newTags = photoData.tags.map(({ value, label }) => ({
          value,
          label,
        }));

        setTags(newTags);

        formik.setFieldValue("tags", newTags);
      }
    }
  }, [photoData]);

  useEffect(() => {
    if (categories && photoData) {
      const category = categories.find(
        (item) => item.name === photoData.category
      );
      if (!category) return;
      setCategory({ label: category.name, value: category });
      formik.setFieldValue("category", String(category.id));
    }
  }, [categories, photoData]);

  useEffect(() => {
    if (tags) {
      const newTags = tags.map((tag) => tag.value);
      formik.setFieldValue("tags", newTags);
    }
  }, [tags]);


  useEffect(() => {
    if (photos) {
      formik.setFieldValue("photos", [...photos.map((photo) => photo.id)]);
    }
  }, [photos]);

  const handleContent = (content) => {
    formik.setFieldValue("description", content);
  };

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
              title: `${id ? "Edit" : "Create"} Albums Photos`,
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
            text="Upload Albums Photos Cover"
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
          <button  onClick={() => router.back()} className={"btn btn-outline-primary b-radius-25"}>
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
    </>
  );
}

export default AlbumsPhotosCreateForm;
