import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "@context/UserContext";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import CoursesUploadCover from "@components/dashboard/courses/CoursesUploadCover";
import useSWRImmutable from "swr/immutable";
import { genericFetchPost, getCategories } from "@request/dashboard";
import { TIMEOUT } from "@utils/constant";
import ImageForm from "@components/dashboard/image/ImageForm";

const baseUrl = process.env.apiV2;
const photoUrl = `${baseUrl}/images`;

function ImageCreate({
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
  const [image, setImage] = useState(null);
  const [mediaType, setMediaType] = useState("image");
  const [category, setCategory] = useState(null);
  const [tags, setTags] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      status: "publish",
      category: "",
      tags: "",
      type: "open",
      channel_id: "",
      thumbnail: "",
    },
    onSubmit: (values) => (!id ? addImage(values) : updateImage(values)),
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      channel_id: Yup.string().required("Channel is required"),
      category: Yup.string().required("Category is required"),
      thumbnail: cover
        ? Yup.string()
        : Yup.string().required("An Image is Required to Save"),
    }),
  });

  const { data: categories } = useSWRImmutable(
    token ? [`${baseUrl}/images/categories`, token] : null,
    getCategories
  );

  const { data: imageEdit, mutate } = useSWRImmutable(
    token && id ? [`${baseUrl}/images/${id}`, token] : null,
    getCategories
  );

  const addImage = async (values) => {
    setIsSaving(true);
    try {
      await genericFetchPost(`${photoUrl}`, token, values);
      if (!isCustom) {
        await router.replace("/manage/images");
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

  const updateImage = async (values) => {
    setIsSaving(true);
    try {
      await genericFetchPost(`${photoUrl}/${id}`, token, values);
      await mutate();
      if (!isCustom) {
        await router.replace("/manage/images");
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
    if (mediaType === "thumbnail") {
      formik.setFieldValue("thumbnail", media.id);
      setCover({ url: media.source_url });
    }
    if (mediaType === "image") {
      formik.setFieldValue("image", media.id);
      setImage({url: media.source_url})
    }
  };

  const setCategoryValue = (value) => {
    setCategory(value);
    formik.setFieldValue("category", value.value);
  };

  const handleCover = (type) => {
    setMediaType(type);
    setOpen(!open);
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
    if (imageEdit) {
      formik.setFieldValue("title", imageEdit.title);
      formik.setFieldValue("content", imageEdit.content);
      formik.setFieldValue("type", imageEdit.type);
      formik.setFieldValue("channel_id", imageEdit.channel_id);
      
      if (imageEdit.thumbnail !== "") {
        setCover({ url: imageEdit.thumbnail });
      }

      if (imageEdit?.category_id) {
        // filter category
        const category = categories?.filter(
          (item) => item.value === Number(imageEdit.category_id)
        );
        if (!category) return;
        setCategory(category[0]);
        formik.setFieldValue("category", imageEdit?.category_id);
      }
      if (imageEdit?.tags) {
        const tagsIds = imageEdit.tags.map(({ value, label }) => ({
          value,
          label,
        }));

        setTags(tagsIds);

        formik.setFieldValue("tags", tagsIds);
      }
      setIsSaving(false);
    }
  }, [imageEdit]);

  useEffect(() => {
    if (isCustom) {
      customSubmit(formik);
    }
  }, [isCustom]);

  return (
    <>
      <div className="col-12 col-md-6">
        <CoursesUploadCover
          onClick={()=>handleCover('thumbnail')}
          cover={cover}
          url={cover?.url}
          reset={() => setCover(null)}
          text="Featured Image"
          className="ratio ratio-music"
          error={
            formik.errors.thumbnail && formik.touched.thumbnail
              ? formik.errors.thumbnail
              : null
          }
        />
      </div>
      <ImageForm
        form={formik}
        category={category}
        categories={categories}
        setCategoryValue={setCategoryValue}
        tags={tags}
        setTags={setTags}
        handleContent={(content) => {
          formik.setFieldValue("content", content);
        }}
        handlerSelectChannel={handlerSelectChannel}
      />
      {!isCustom ? (
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
          media_type={"image"}
        />
      )}
    </>
  );
}

export default ImageCreate;
