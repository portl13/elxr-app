import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import { genericFetchPost, getCategories } from "@request/dashboard";
import { TIMEOUT } from "@utils/constant";
import * as Yup from "yup";
import useSWRImmutable from "swr/immutable";
import InputDashForm from "@components/shared/form/InputDashForm";
import InputDashTags from "@components/shared/form/InpushDashTags";
import InputDashRadio from "@components/shared/form/InputDashRadio";
import MediaLibraryCover from "@components/shared/media/MediaLibraryCover";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import { UserContext } from "@context/UserContext";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";
import InputSelectChannel from "@components/shared/form/InputSelectChannel";

const baseUrl = process.env.apiV2;
const categoriesUrl = `${baseUrl}/video/categories`;
const saveVideo = `${baseUrl}/video/`;

function VideoCreateForm() {
  const alert = useAlert();
  const { user } = useContext(UserContext);
  const token = user?.token;
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  const [cover, setCover] = useState();
  const [tags, setTags] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      channel_id: "",
      category: "",
      tags: [],
      type: "open",
      video_url: "",
      thumbnail: "",
      size: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await genericFetchPost(saveVideo, token, values);
        setIsLoading(false);
        alert.success("Video Created", TIMEOUT);
        setCover(null);
        formik.resetForm();
      } catch (error) {
        setIsLoading(false);
        alert.error(error.message, TIMEOUT);
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      channel_id: Yup.string().required("Channel is required"),
      category: Yup.string().required("Category is required"),
      video_url: Yup.string().required("Video is required"),
    }),
  });

  const { data: categories } = useSWRImmutable(
    token ? [categoriesUrl, token] : null,
    getCategories
  );

  const handleChangeCategory = (value) => {
    setCategory(value);
    formik.setFieldValue("category", String(value.value));
  };

  const onSubmitVideo = () => {
    formik.submitForm();
  };

  function handlerSelectChannel(value) {
    formik.setFieldValue("channel_id", String(value.value));
  }

  const selectMedia = (media) => {
    formik.setFieldValue("video_url", media.source_url);
  };

  const selectCover = (media) => {
    setCover({ url: media.source_url });
    formik.setFieldValue("thumbnail", media.id);
  };

  const removeCover = () => {
    setCover(null);
    formik.setFieldValue("thumbnail", "");
  };

  useEffect(() => {
    if (tags) {
      const newTags = tags.map((tag) => tag.value);
      formik.setFieldValue("tags", newTags);
    }
  }, [tags]);

  return (
    <>
      <div className="container px-3 pb-5 postion-relative">
        <BackButton />
        <div className="my-5">
          <ListNavItem
            data={{
              title: "Create Video",
              icon: "/img/icon-movil/create-menu/video-icon.svg",
              type: "heading",
            }}
          />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
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
          <div className="mb-4">
            <InputSelectChannel
              label="Channel"
              name="channel_id"
              placeholder="Select Channel..."
              required={true}
              error={formik.errors.channel_id}
              touched={formik.touched.channel_id}
              onChange={handlerSelectChannel}
            />
          </div>
          <div className="mb-4">
            <InputDashForm
              label="Category"
              name="category"
              type={"select"}
              required={true}
              error={formik.errors.category}
              onChange={handleChangeCategory}
              value={category}
              options={categories?.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              touched={formik.touched.category}
            />
          </div>
          <div className="mb-4">
            <InputDashTags value={tags} setValue={setTags} />
          </div>
          <div className="mb-4">
            <InputDashForm
              label="Description"
              name="description"
              type={"textarea"}
              required={true}
              value={formik.values.description}
              onChange={formik.handleChange}
              touched={formik.touched.description}
              error={formik.errors.description}
            />
          </div>
          <div className="mb-4 d-flex">
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
          <div className="mb-4">
            <MediaLibraryCover
              token={token}
              cover={cover}
              reset={removeCover}
              selectMedia={selectCover}
              text="Upload Video Cover"
            />
          </div>
          <div className="mb-2">
            <InputDashForm
              label="Video URL"
              name="video_url"
              placeholder={"Enter video url (youtube, vimeo, etc)"}
              type={"text"}
              required={true}
              value={formik.values.video_url}
              onChange={formik.handleChange}
              touched={formik.touched.video_url}
              error={formik.errors.video_url}
            />
          </div>
        </form>
        <span className="d-flex my-1 text-center justify-content-center separator-or align-items-center">
          <b>Or</b>
        </span>
        <button
          onClick={() => setOpenMedia(true)}
          className="btn btn-primary w-100 br-25"
        >
          upload video
        </button>
        <div className="mt-5">
          <button onClick={onSubmitVideo} className="btn btn-create w-100 py-3">
            {!isLoading ? "Add" : "Loading..."}
          </button>
        </div>
      </div>

      {token && openMedia && (
        <MediaLibrary
          token={token}
          show={openMedia}
          onHide={() => setOpenMedia(!openMedia)}
          selectMedia={selectMedia}
          media_type={"video"}
        />
      )}
    </>
  );
}

export default VideoCreateForm;
