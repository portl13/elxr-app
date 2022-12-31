import React, { useContext, useState } from "react";
import AlbumForm from "./AlbumForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "@context/UserContext";
import { Router, useRouter } from "next/router";
import { useAlert } from "react-alert";
import useSWRImmutable from "swr/immutable";
import { genericFetchPost, getCategories } from "@request/dashboard";
import { useEffect } from "react";
import CoursesUploadCover from "@components/dashboard/courses/CoursesUploadCover";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import {TIMEOUT} from "@utils/constant";

const baseUrl = process.env.apiV2;
const albumUrl = `${baseUrl}/album`;

function AlbumCreate({ setIsSaving, id = null }) {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const alert = useAlert();
  const token = user?.token;

  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState(null);
  const [mediaType, setMediaType] = useState("image");
  const [category, setCategory] = useState(null);
  const [tags, setTags] = useState([]);
  const [songs, setSongs] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      status: "publish",
      category: "",
      tags: "",
      songs: [],
      type: "open",
      channel_id: "",
      thumbnail: "",
      show_in_feed: true
    },
    onSubmit: (values) => !id ? createAlbum(values) : editAlbum(values),
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      channel_id: Yup.string().required("Channel is required"),
      category: Yup.string().required("Category is required"),
      songs: Yup.array().min(1).required("Song is required"),
      thumbnail: !cover ? Yup.string().required("Cover is required") : Yup.string(),
    }),
  });

  const { data: categories } = useSWRImmutable(
      token ? [`${baseUrl}/albums/categories`, token] : null,
      getCategories
  );

  const { data: albumEdit, mutate } = useSWRImmutable(
    token && id ? [`${baseUrl}/album/${id}`, token] : null,
    getCategories
  );

  const createAlbum = async (values) => {
    setIsSaving(true);
    try {
      await genericFetchPost(`${albumUrl}`, token, values);
      alert.success('Success Album Create', TIMEOUT)
      await router.push('/manage/albums')
    } catch (e) {
      console.log(e);
    } finally {
      setIsSaving(false);
    }
  };

  const editAlbum = async (values) => {
    setIsSaving(true);
    try {
      await genericFetchPost(`${albumUrl}/${id}`, token, values);
      await mutate()
      alert.success('Success Album Update', TIMEOUT)
      await router.replace('/manage/albums')
    } catch (e) {
      console.log(e);
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
  };

  const handleCover = () => {
    setMediaType("image");
    setOpen(!open);
  };

  const setCategoryValue = (value) => {
    setCategory(value);
    formik.setFieldValue("category", value.value);
  };

  function handlerSelectChannel(value) {
    formik.setFieldValue("channel_id", String(value.value));
  }

  const handleContent = (content) => {
    formik.setFieldValue("content", content);
  };

  useEffect(() => {
    if (tags) {
      const newTags = tags.map((tag) => tag.value);
      formik.setFieldValue("tags", newTags);
    }
  }, [tags]);

  useEffect(() => {
    if (albumEdit) {
      formik.setFieldValue("title", albumEdit.title);
      formik.setFieldValue("content", albumEdit.content);
      formik.setFieldValue("type", albumEdit.type);
      formik.setFieldValue("channel_id", albumEdit.channel_id);
      formik.setFieldValue("songs", albumEdit.songs_ids);
      formik.setFieldValue("show_in_feed", albumEdit.show_in_feed);
      setSongs(albumEdit.songs);
      if (albumEdit.thumbnail !== "") {
        setCover({ url: albumEdit.thumbnail });
      }
      if (albumEdit?.category_id) {
        // filter category
        const category = categories?.filter(
          (item) => item.value === Number(albumEdit.category_id)
        );
        if (!category) return;
        setCategory(category[0]);
        formik.setFieldValue("category", albumEdit?.category_id);
      }
      if (albumEdit?.tags) {
        const tagsIds = albumEdit.tags.map(({ value, label }) => ({
          value,
          label,
        }));

        setTags(tagsIds);

        formik.setFieldValue("tags", tagsIds);
      }
      setIsSaving(false);
    }
  }, [albumEdit]);

  useEffect(() => {
    if (songs) {
      formik.setFieldValue("songs", [...songs.map((song) => song.id)]);
    }
  }, [songs]);

  return (
    <>
      <div className="col-12 col-md-6 ">
        <CoursesUploadCover
          onClick={handleCover}
          cover={cover}
          url={cover?.url}
          reset={() => setCover(null)}
          text="Album Cover Image"
          className="ratio ratio-music"
          error={
            formik.errors.thumbnail && formik.touched.thumbnail
              ? formik.errors.thumbnail
              : null
          }
        />
      </div>
      <AlbumForm
        form={formik}
        handlerSelectChannel={handlerSelectChannel}
        category={category}
        setCategoryValue={setCategoryValue}
        categories={categories}
        tags={tags}
        setTags={setTags}
        handleContent={handleContent}
        setSongs={setSongs}
        songs={songs}
      />
      <div className="w-100 d-flex justify-content-end">
        <button  onClick={() => router.back()} className={"btn btn-outline-primary b-radius-25"}>
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
          {id ? "Update" :"Publish"}
        </button>
      </div>
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

export default AlbumCreate;
