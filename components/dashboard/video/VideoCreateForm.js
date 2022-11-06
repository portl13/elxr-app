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
import { UserContext } from "@context/UserContext";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";
import InputSelectChannel from "@components/shared/form/InputSelectChannel";
import Router from "next/router";
import BlockUi, { containerBlockUi } from "@components/ui/blockui/BlockUi";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MediaLibraryVideo from "@components/MediaLibraryVideo/MediaLibraryVideo";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";

const baseUrl = process.env.apiV2;
const categoriesUrl = `${baseUrl}/video/categories`;
const saveVideo = `${baseUrl}/video/`;

function VideoCreateForm({ id }) {
  const alert = useAlert();
  const { user } = useContext(UserContext);
  const token = user?.token;
  const [category, setCategory] = useState("");
  const [openMedia, setOpenMedia] = useState(false);
  const [cover, setCover] = useState();
  const [tags, setTags] = useState([]);
  const [blocking, setBlocking] = useState(!!id);

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
    onSubmit: async (values) => saveAndEditVideo(values),
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      channel_id: Yup.string().required("Channel is required"),
      category: Yup.string().required("Category is required"),
      video_url: Yup.string().required("Video is required"),
      thumbnail: cover ? Yup.string() :Yup.string().required("An Image is Required to Save"),
    }),
  });

  const { data: videoData, mutate } = useSWRImmutable(
    token && id ? [`${saveVideo}${id}`, token] : null,
    getCategories
  );

  const saveAndEditVideo = async (values) => {
    setBlocking(true)

    try {
      await genericFetchPost(
        id ? `${saveVideo}${id}` : saveVideo,
        token,
        values
      );
      await mutate();
      setBlocking(false);
      alert.success(id ? "Video Edit Success" : "Video Created", TIMEOUT);
      setCover(null);
      formik.resetForm();
      await Router.push("/manage/videos");
    } catch (error) {
      setBlocking(false);
      alert.error(error.message, TIMEOUT);
    }
  };

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
    formik.setFieldValue("video_url", media.uid);
    setCover({ url: media.thumbnail });
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

  useEffect(() => {
    if (videoData) {
      formik.setFieldValue("title", videoData.title);
      formik.setFieldValue("description", videoData.description);
      formik.setFieldValue("size", videoData.size);
      formik.setFieldValue("type", videoData.type);
      formik.setFieldValue("channel_id", videoData.channel_id);
      if (videoData.tags) {
        const newTags = videoData.tags.map(({ value, label }) => ({
          value,
          label,
        }));
        setTags(newTags);
        formik.setFieldValue("tags", newTags);
      }

      formik.setFieldValue("video_url", videoData.video);
      if (!onlyLettersAndNumbers(videoData.video) && videoData.thumbnail) {
        setCover({ url: videoData.thumbnail });
        formik.setFieldValue("thumbnail", videoData.thumbnail);
      }
      if (onlyLettersAndNumbers(videoData.video)) {
        setCover({
          url: `https://${process.env.SubdomainCloudflare}/${videoData.video}/thumbnails/thumbnail.jpg`,
        });
      }

      setBlocking(false);
    }
  }, [videoData]);

  useEffect(() => {
    if (categories && videoData) {
      const category = categories.find(
        (item) => item.name === videoData.category
      );
      if (!category) return;
      setCategory({ label: category.name, value: category });
      formik.setFieldValue("category", String(category.id));
    }
  }, [categories, videoData]);

  return (
    <>
      <div
        css={containerBlockUi}
        className="container px-2 pb-5 postion-relative"
      >
        {blocking && <BlockUi color="#eb1e79" />}
        <BackButton />
        <div className="my-5">
          <ListNavItem
            data={{
              title: id ? "Edit Video" : "Create Video",
              icon: (
                <FontAwesomeIcon className="text-primary" icon={faYoutube} />
              ),
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
              value={formik.values.channel_id}
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
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="mb-4">
                <MediaLibraryCover
                  token={token}
                  cover={cover}
                  reset={removeCover}
                  selectMedia={selectCover}
                  text="Upload Video Cover"
                  error={formik.errors.thumbnail && formik.touched.thumbnail ? formik.errors.thumbnail : null}
                />
              </div>
            </div>
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
            {!blocking ? (id ? "Edit" : "Save") : "Loading..."}
          </button>
        </div>
      </div>
      <MediaLibraryVideo
        show={openMedia}
        setShow={setOpenMedia}
        selectMedia={selectMedia}
      />
    </>
  );
}

export default VideoCreateForm;
