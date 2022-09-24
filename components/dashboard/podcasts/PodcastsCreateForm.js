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
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import BackButton from "@components/shared/button/BackButton";
import { UserContext } from "@context/UserContext";
import ListNavItem from "@components/layout/ListNavItem";
import InputSelectChannel from "@components/shared/form/InputSelectChannel";

const baseUrl = process.env.apiV2;
const categoriesUrl = `${baseUrl}/podcasts/categories`;
const saveAudio = `${baseUrl}/podcasts/`;

function PodcastsCreateForm() {
  const alert = useAlert();
  const { user } = useContext(UserContext);
  const token = user?.token;
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cover, setCover] = useState();
  const [openMedia, setOpenMedia] = useState(false);
  const [audio, setAudio] = useState(false);
  const [tags, setTags] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      channel_id: "",
      category: "",
      tags: [],
      type: "open",
      audio_id: "",
      thumbnail: "",
      size: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await genericFetchPost(saveAudio, token, values);
        setIsLoading(false);
        setAudio(false);
        setCover(false);
        formik.resetForm();
        alert.success("Podcast Created", TIMEOUT);
      } catch (error) {
        alert.error("Error", TIMEOUT);
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      channel_id: Yup.string().required("Channel id is required"),
      category: Yup.string().required("Category is required"),
      audio_id: Yup.string().required("Audio is required"),
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

  const selectCover = (media) => {
    setCover({ url: media.source_url });
    formik.setFieldValue("thumbnail", media.id);
  };

  const removeCover = () => {
    setCover(null);
    formik.setFieldValue("thumbnail", "");
  };

  const selectMedia = (media) => {
    setAudio(media.source_url);
    formik.setFieldValue("audio_id", media.id);
    formik.setFieldValue("size", media.size);
  };

  const removeMedia = () => {
    setAudio(null);
    formik.setFieldValue("audio_id", "");
    formik.setFieldValue("size", "");
  };

  function handlerSelectChannel(value) {
    formik.setFieldValue("channel_id", String(value.value));
  }

  useEffect(() => {
    if (tags) {
      const newTags = tags.map((tag) => tag.value);
      formik.setFieldValue("tags", newTags);
    }
  }, [tags]);

  return (
    <>
      <div className="container px-3 pb-4 postion-relative">
        <BackButton />
        <div className="my-5">
          <ListNavItem
            data={{
              title: "Create Podcasts",
              icon: "/img/icon-movil/create-menu/podcast.svg",
              type: "heading",
            }}
          />
        </div>
        <form className="row" onSubmit={formik.handleSubmit}>
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
              options={categories?.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              touched={formik.touched.category}
            />
          </div>
          <div className="mb-4 col-12 col-md-6">
            <InputDashTags value={tags} setValue={setTags} />
          </div>
          <div className="mb-4 col-12">
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
          <div className="mb-4 col-12">
            <MediaLibraryCover
              token={token}
              cover={cover}
              reset={removeCover}
              selectMedia={selectCover}
              text="Upload Podcast Cover"
            />
          </div>
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
        </form>
        {!formik.values.audio_id && (
          <button
            onClick={() => setOpenMedia(true)}
            className="btn btn-primary w-100 br-25"
          >
            upload audio
          </button>
        )}

        {formik.errors.audio_id && formik.touched.audio_id && (
          <div className="text-danger mt-2">{formik.errors.audio_id}</div>
        )}

        {formik.values.audio_id && audio && (
          <>
            <audio className="w-100" src={audio} controls></audio>
            <button
              onClick={() => removeMedia()}
              className="btn btn-primary w-100 br-25 mt-3"
            >
              remove audio
            </button>
          </>
        )}
        <div className="mt-4">
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
          media_type={"audio"}
        />
      )}
    </>
  );
}

export default PodcastsCreateForm;
