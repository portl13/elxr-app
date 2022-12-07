import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "@context/UserContext";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import SongForm from "@components/song/SongForm";
import CoursesUploadCover from "@components/dashboard/courses/CoursesUploadCover";
import useSWRImmutable from "swr/immutable";
import { genericFetchPost, getCategories } from "@request/dashboard";
import { TIMEOUT } from "@utils/constant";
import EpisodeForm from "@components/podcasts/EpisodeForm";

const baseUrl = process.env.apiV2;
const songUrl = `${baseUrl}/episode`;

function EpisodeCreate({
  setIsSaving,
  id = null,
  isCustom = false,
  customSubmit,
  customMutate,
}) {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const alert = useAlert();
  const token = user?.token;

  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState(null);
  const [mediaType, setMediaType] = useState("image");
  const [category, setCategory] = useState(null);
  const [tags, setTags] = useState([]);
  const [song, setSong] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      status: "publish",
      category: "",
      tags: "",
      episode: [],
      type: "open",
      channel_id: "",
      thumbnail: "",
    },
    onSubmit: (values) => (!id ? addSong(values) : updateSong(values)),
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      channel_id: Yup.string().required("Channel is required"),
      category: Yup.string().required("Category is required"),
      episode: Yup.object().required("episode is required"),
      thumbnail: cover
        ? Yup.string()
        : Yup.string().required("An Image is Required to Save"),
    }),
  });

  const { data: categories } = useSWRImmutable(
    token ? [`${baseUrl}/episodes/categories`, token] : null,
    getCategories
  );

  const { data: songEdit, mutate } = useSWRImmutable(
    token && id ? [`${baseUrl}/episode/${id}`, token] : null,
    getCategories
  );

  const addSong = async (values) => {
    setIsSaving(true);
    try {
      await genericFetchPost(`${songUrl}`, token, values);
      if (!isCustom) {
        await router.push("/manage/songs");
      }
      if (isCustom) {
        await customMutate();
      }
      formik.resetForm();
    } catch (e) {
      alert.error(e.getMessage(), TIMEOUT);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSong = async (values) => {
    setIsSaving(true);
    try {
      await genericFetchPost(`${songUrl}/${id}`, token, values);
      await mutate();
      if (!isCustom) {
        await router.push("/manage/songs");
      }
      if (isCustom) {
        await customMutate();
      }
    } catch (e) {
      alert.error(e.message, TIMEOUT);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (status) => {
    await formik.setFieldValue("status", status);
    await formik.submitForm();
  };

  const selectMedia = (media) => {
    if (mediaType === "image") {
      formik.setFieldValue("thumbnail", media.id);
      setCover({ url: media.source_url });
    }
    if (mediaType === "audio") {
      formik.setFieldValue("episode", {
        url: media.source_url,
        title: { rendered: media.title.rendered },
        media_details: media.media_details,
      });
      setSong({
        url: media.source_url,
        title: { rendered: media.title.rendered },
        media_details: media.media_details,
      });
    }
  };

  const setCategoryValue = (value) => {
    setCategory(value);
    formik.setFieldValue("category", value.value);
  };

  const handleSong = () => {
    setMediaType("audio");
    setOpen(!open);
  };
  const handleCover = () => {
    setMediaType("image");
    setOpen(!open);
  };

  const removeSong = () => {
    formik.setFieldValue("song", "");
    setSong("");
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

  useEffect(() => {
    if (songEdit) {
      formik.setFieldValue("title", songEdit.title);
      formik.setFieldValue("content", songEdit.content);
      formik.setFieldValue("type", songEdit.type);
      formik.setFieldValue("channel_id", songEdit.channel_id);
      formik.setFieldValue("episode", songEdit.episode);
      setSong(songEdit.episode);
      if (songEdit.thumbnail !== "") {
        setCover({ url: songEdit.thumbnail });
      }

      if (songEdit?.category_id) {
        // filter category
        const category = categories?.filter(
          (item) => item.value === Number(songEdit.category_id)
        );
        if (!category) return;
        setCategory(category[0]);
        formik.setFieldValue("category", songEdit?.category_id);
      }
      if (songEdit?.tags) {
        const tagsIds = songEdit.tags.map(({ value, label }) => ({
          value,
          label,
        }));

        setTags(tagsIds);

        formik.setFieldValue("tags", tagsIds);
      }
      setIsSaving(false);
    }
  }, [songEdit]);

  useEffect(() => {
    if (isCustom) {
      customSubmit(formik);
    }
  }, [isCustom]);

  return (
    <>
      <div className="w-100">
        <CoursesUploadCover
          onClick={handleCover}
          cover={cover}
          url={cover?.url}
          reset={() => setCover(null)}
          text="Featured Image"
          error={
            formik.errors.thumbnail && formik.touched.thumbnail
              ? formik.errors.thumbnail
              : null
          }
        />
      </div>
      <EpisodeForm
        form={formik}
        category={category}
        categories={categories}
        setCategoryValue={setCategoryValue}
        tags={tags}
        setTags={setTags}
        handleSong={handleSong}
        handleContent={(content) => {
          formik.setFieldValue("content", content);
        }}
        song={song}
        removeSong={removeSong}
        handlerSelectChannel={handlerSelectChannel}
      />
      {!isCustom ? (
        <div className="w-100 d-flex justify-content-end">
          <button className={"btn btn-outline-primary b-radius-25"}>
            Cancel
          </button>
          <button
            onClick={() => handleSubmit("draft")}
            className={"btn btn-theme b-radius-25"}
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSubmit("publish")}
            className={"btn btn-primary b-radius-25"}
          >
            {id ? "Update" : "Publish"}
          </button>
        </div>
      ) : null}
      {token && open && (
        <MediaLibrary
          token={token}
          show={open}
          onHide={() => setOpen(!open)}
          selectMedia={selectMedia}
          media_type={mediaType}
        />
      )}
    </>
  );
}

export default EpisodeCreate;
