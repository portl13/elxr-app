import React, { useContext, useEffect, useState } from "react";
import Meta from "@components/layout/Meta";
import BlockUi from "@components/ui/blockui/BlockUi";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BlogForm from "@components/dashboard/blogs/BlogForm";
import Link from "next/link";
import { UserContext } from "@context/UserContext";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import { TIMEOUT } from "@utils/constant";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSWRImmutable from "swr/immutable";
import {
  genericFetch,
  genericFetchPost,
  getCategories,
} from "@request/dashboard";
import CoursesUploadCover from "@components/dashboard/courses/CoursesUploadCover";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";

const baseUrl = `${process.env.apiV2}/blogs`;

function AddBlog({ id }) {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const alert = useAlert();
  const token = user?.token;
  const [isSaving, setIsSaving] = useState(true);

  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState(null);

  const [category, setCategory] = useState(null);
  const [tags, setTags] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      thumbnail: "",
      category: "",
      tags: "",
      type: "open",
      status: "publish",
    },
    onSubmit: async (values) => editBlog(values),
    validationSchema: Yup.object({
      title: Yup.string().required("title is required"),
      content: Yup.string().required("content is required"),
      category: Yup.string().required("category is required"),
      tags: Yup.string().required("tags is required"),
      thumbnail: cover ? Yup.string() : Yup.string().required("An Image is Required to Save"),
    }),
  });

  const editBlog = async (values) => {
    setIsSaving(true);
    try {
      await genericFetchPost(`${baseUrl}/${id}`, token, values);
      alert.success("Blog updated successfully", TIMEOUT);
      await router.push("/manage/blogs");
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

  const setTagValue = (value) => {
    setTags(value);
    formik.setFieldValue("tags", value.value);
  };

  const handleSubmit = (status) => {
    formik.setFieldValue("status", status);
    formik.submitForm();
  };

  const selectMedia = (media) => {
    formik.setFieldValue("thumbnail", media.id);
    setCover({ url: media.source_url });
  };

  const getBlog = async (id) => {
    const data = await genericFetch(`${baseUrl}/${id}`, token);
    
    formik.setFieldValue("title", data.title);
    formik.setFieldValue("content", data.content);
    formik.setFieldValue("channel_id", data?.channel_id);

    formik.setFieldValue("type", data.type);
    if (data?.category_id) {
      // filter category
      const category = categories.filter(
        (item) => item.value === data.category_id
      );
      if (!category) return;
      setCategory(category[0]);
      formik.setFieldValue("category", data?.category_id);
    }
    if (data?.tags) {
      const tagsIds = data.tags.map(({ value, label }) => ({
        value,
        label,
      }));

      setTags(tagsIds);

      formik.setFieldValue("tags", tagsIds);
    }

    if (data?.thumbnail) {
      setCover({ url: data.thumbnail });
    }
    setIsSaving(false);
  };

  useEffect(() => {
    if (!categories) return;
    getBlog(id);
  }, [categories]);

  useEffect(() => {
    if (tags) {
      const newTags = tags.map((tag) => tag.value);
      formik.setFieldValue("tags", newTags);
    }
  }, [tags]);

  function handlerSelectChannel(value) {
    formik.setFieldValue("channel_id", String(value.value));
  }

  return (
    <MainLayout title={"Edit Blog"} sidebar={<MainSidebar />}>
      <div className="position-relative">
        {isSaving && <BlockUi color="var(--primary-color)" />}
        <div className="container px-2 pb4">
          <BackButton />
          <div className="container container-80 pb-4">
            <div className="my-5">
              <ListNavItem
                data={{
                  title: "Edit Blog",
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
                  error={formik.touched.thumbnail && formik.errors.thumbnail ? formik.errors.thumbnail : null}
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
              updated={true}
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
    </MainLayout>
  );
}

export default AddBlog;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { id },
  };
}
