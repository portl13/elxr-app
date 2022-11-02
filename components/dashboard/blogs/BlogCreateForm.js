import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { genericFetchPost, getCategories } from "@request/dashboard";
import { TIMEOUT } from "@utils/constant";
import useSWRImmutable from "swr/immutable";
import Meta from "@components/layout/Meta";
import Head from "next/head";
import BlockUi from "@components/ui/blockui/BlockUi";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CoursesUploadCover from "@components/dashboard/courses/CoursesUploadCover";
import BlogForm from "@components/dashboard/blogs/BlogForm";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";

const baseUrl = `${process.env.apiV2}/blogs`;

function BlogCreateForm() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const alert = useAlert();
  const token = user?.token;
  const [isSaving, setIsSaving] = useState(false);

  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState(null);

  const [category, setCategory] = useState(null);
  const [tags, setTags] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      thumbnail: "",
      category: "",
      tags: [],
      type: "open",
      status: "publish",
      channel_id: "",
    },
    onSubmit: async (values) => createBlog(values),
    validationSchema: Yup.object({
      title: Yup.string().required("title is required"),
      content: Yup.string().required("content is required"),
      category: Yup.string().required("category is required"),
      channel_id: Yup.string().required("channel is required"),
      thumbnail: Yup.string().required('An Image is Required to Save'),
    }),
  });

  const createBlog = async (values) => {
    setIsSaving(true);
    const data = {
      ...values,
    };
    try {
      await genericFetchPost(`${baseUrl}`, token, data);
      alert.success("Blog created successfully", TIMEOUT);
      router.push("/dashboard/blogs");
    } catch (error) {
      alert.error("Error creating blog", TIMEOUT);
    } finally {
      setIsSaving(false);
    }
  };

  const { data: categories } = useSWRImmutable(
    token ? [`${baseUrl}/categories`, token] : null,
    getCategories
  );

  const setCategoryValue = (value) => {
    setCategory(value);
    formik.setFieldValue("category", value.value);
  };

  const handleSubmit = (status) => {
    formik.setFieldValue("status", status);
    formik.submitForm();
  };

  const selectMedia = (media) => {
    formik.setFieldValue("thumbnail", media.id);
    setCover({ url: media.source_url });
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
      <div className="position-relative">
        {isSaving && <BlockUi color="var(--primary-color)" />}
        <div className="container px-3">
          <BackButton />
          <div className="container container-80 pb-4">
            <div className="my-5">
              <ListNavItem
                data={{
                  title: "Create Blog",
                  icon: "/img/icon-movil/create-menu/blog-icon.svg",
                  type: "heading",
                }}
              />
            </div>
            <div className="row">
              <div className="col-12 col-md-7">
                <CoursesUploadCover
                  onClick={() => setOpen(true)}
                  cover={cover}
                  url={cover?.url}
                  reset={() => setCover(null)}
                  text="Upload Cover Image"
                  error={
                    formik.touched.thumbnail && formik.errors.thumbnail
                      ? formik.errors.thumbnail
                      : null
                  }
                />
              </div>
            </div>
            <BlogForm
              formik={formik}
              tags={tags}
              setTags={setTags}
              categories={categories ? categories : []}
              category={category}
              setCategoryValue={setCategoryValue}
              handleContent={(content) =>
                formik.setFieldValue("content", content)
              }
              handleSubmit={handleSubmit}
              handlerSelectChannel={handlerSelectChannel}
            />
          </div>
        </div>
      </div>
      {token && open && (
        <MediaLibrary
          token={token}
          show={open}
          onHide={() => setOpen(!open)}
          selectMedia={selectMedia}
          media_type="image"
        />
      )}
    </>
  );
}

export default BlogCreateForm;
