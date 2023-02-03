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
import PodcastsIcon from "@icons/PodcastsIcon";
import BlockUi, { containerBlockUi } from "@components/ui/blockui/BlockUi";
import { faPlus, faPodcast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Editor from "@components/shared/editor/Editor";
import SongBuilder from "@components/song/SongBuilder";
import EpisodeModal from "@components/podcasts/EpisodeModal";
import InputDashCheck from "@components/shared/form/InputDashCheck";

const baseUrl = process.env.apiV2;
const categoriesUrl = `${baseUrl}/podcasts/categories`;
const saveAudio = `${baseUrl}/podcasts/`;

function PodcastsCreateForm({ id = null }) {
  const alert = useAlert();
  const router = useRouter();
  const { user } = useContext(UserContext);
  const token = user?.token;
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState("");
  const [tags, setTags] = useState([]);
  const [blocking, setBlocking] = useState(!!id);
  const [open, setOpen] = useState(false);
  const [editEpisode, setEditEpisode] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      channel_id: "",
      category: "",
      tags: [],
      type: "open",
      episodes: [],
      thumbnail: "",
      status: "publish",
      show_in_feed: true
    },
    onSubmit: async (values) => saveAndEditPodcasts(values),
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      channel_id: Yup.string().required("Channel id is required"),
      category: Yup.string().required("Category is required"),
      episodes: Yup.string().required("Audio is required"),
      thumbnail: cover
        ? Yup.string()
        : Yup.string().required("An Image is Required to Save"),
    }),
  });

  const { data: categories } = useSWRImmutable(
    token ? [categoriesUrl, token] : null,
    getCategories
  );

  const { data: audioData, mutate } = useSWRImmutable(
    token && id ? [`${saveAudio}${id}`, token] : null,
    getCategories
  );

  const saveAndEditPodcasts = async (values) => {
    setBlocking(true);
    try {
      await genericFetchPost(
        id ? `${saveAudio}${id}` : saveAudio,
        token,
        values
      );
      await mutate();
      setBlocking(false);
      setCover("");
      formik.resetForm();
      alert.success(id ? "Podcast Edit Success" : "Podcast Created", TIMEOUT);
      await router.replace("/manage/podcasts");
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
    if (audioData) {
      setBlocking(false);
      formik.setFieldValue("channel_id", audioData.channel_id);
      formik.setFieldValue("title", audioData.title);
      formik.setFieldValue("description", audioData.description);
      formik.setFieldValue("type", audioData.type);
      formik.setFieldValue('show_in_feed', audioData.show_in_feed)
      setEpisodes(audioData.episodes_formated)
      if (audioData.thumbnail !== "") {
        setCover({ url: audioData.thumbnail });
      }

      if (audioData.tags) {
        const newTags = audioData.tags.map(({ value, label }) => ({
          value,
          label,
        }));

        setTags(newTags);

        formik.setFieldValue("tags", newTags);
      }
    }
  }, [audioData]);

  useEffect(() => {
    if (categories && audioData) {
      const category = categories.find(
        (item) => item.name === audioData.category
      );
      if (!category) return;
      setCategory({ label: category.name, value: category });
      formik.setFieldValue("category", String(category.id));
    }
  }, [categories, audioData]);

  useEffect(() => {
    if (tags) {
      const newTags = tags.map((tag) => tag.value);
      formik.setFieldValue("tags", newTags);
    }
  }, [tags]);


  useEffect(() => {
    if (episodes) {
      formik.setFieldValue("episodes", [...episodes.map((episode) => episode.id)]);
    }
  }, [episodes]);

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
              title: `${id ? "Edit" : "Create"} Podcasts`,
              icon: (
                <FontAwesomeIcon className="text-podcast" icon={faPodcast} />
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
            text="Upload Podcast Cover"
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
          <h3>Add Episode</h3>
          {formik.errors.episodes && formik.touched.episodes && (
            <div className="alert alert-danger w-100" role="alert">
              At least select a episode.
            </div>
          )}
          {episodes ? (
            <div className={"col-12"}>
              <SongBuilder
                setEditSong={setEditEpisode}
                setOpen={setOpen}
                songs={episodes}
                setSongs={setEpisodes}
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
              Add a Episode
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

        <div className="w-100 d-flex justify-content-center justify-content-md-end">
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
      {open ? (
        <EpisodeModal
          open={open}
          setEpisodes={setEpisodes}
          setOpen={setOpen}
          setEditEpisode={setEditEpisode}
          editEpisode={editEpisode}
          prevEpisodes={episodes}
        />
      ) : null}
    </>
  );
}

export default PodcastsCreateForm;
