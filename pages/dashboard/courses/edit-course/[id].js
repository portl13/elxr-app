import React, { useContext, useState, useEffect } from "react";
import Meta from "@components/layout/Meta";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import CourseForm from "@components/dashboard/courses/CourseForm";
import { UserContext } from "@context/UserContext";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import CoursesUploadCover from "@components/dashboard/courses/CoursesUploadCover";
import useSWRImmutable from "swr/immutable";
import { genericFetchPost, getCategories } from "@request/dashboard";
import BlockUi from "@components/ui/blockui/BlockUi";
import { TIMEOUT } from "@utils/constant";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import { updateSubscription } from "@api/channel.api";
import Builder from "../../../../components/dashboard/courses/builder/Builder";
import BackButton from "@components/shared/button/BackButton";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import MediaLibraryVideo from "@components/MediaLibraryVideo/MediaLibraryVideo";

const urlLessons = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-lessons/`;
const sectionsUrl = `${process.env.baseUrl}/wp-json/course-api/v1/course/sections`;
const baseUrl = `${process.env.baseUrl}/wp-json/course-api/v1/course`;
const categoriesUrl = `${baseUrl}/course-categories`;
const tagsUrl = `${baseUrl}/course-tags`;
const courseUrl = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-courses`;

function EditCoursePage({ data }) {
  const router = useRouter();
  const alert = useAlert();
  const { id: courseID } = data;
  const { user } = useContext(UserContext);
  const token = user?.token;
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("cover");
  const [cover, setCover] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [openMedia, setOpenMedia] = useState(false);
  const [status, setStatus] = useState('');

  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState(null);

  const [lessonList, setLessonList] = useState([]);

  const formulario = useFormik({
    initialValues: {
      title: "",
      description: "",
      progression_disabled: "off",
      disable_content_table: "false",
      category: "",
      tag: "",
      price: 0,
      course_cover: "",
      subscriber_price: 0,
      course_video: "",
      short_description: "",
      featured_media: "",
      status: "publish",
    },
    onSubmit: async (values) => updateCourse(values),
    validationSchema: Yup.object({
      title: Yup.string().required("Name is required"),
      price: Yup.number().required("Price is required"),
      category: Yup.string(),
      description: Yup.string().required("Description is required"),
      short_description: Yup.string().required("Short description is required")
    }),
  });

  const updateCourse = async (values) => {
    setLoading(true);

    const data = {
      ...values,
      category: String(values.category),
      course_cover: String(values.course_cover),
      featured_media: String(values.featured_media),
      progression_disabled: values.progression_disabled === "on",
      disable_content_table: values.disable_content_table === "true",
      status: "publish",
    };

    try {
      await genericFetchPost(`${baseUrl}/${courseID}`, token, data);

      // const product = {
      //   name: values.title,
      //   regular_price: values.price,
      //   description: values.description,
      //   images: [],
      //   meta_data: [
      //     {
      //       key: "_related_course",
      //       value: [courseID],
      //     },
      //   ],
      // };
      //
      // await updateSubscription(user, product, courseID)

      await updateLessonList(user);
      alert.success("Course Updated successfully", TIMEOUT);
      router.push(`/manage/courses/`).then();
    } catch (e) {
      alert.error(e.message, TIMEOUT);
    } finally {
      setLoading(false);
    }
  };

  const updateLessonList = async () => {
    const newLessons = lessonList.filter(
      (lesson) => lesson.type !== "section-heading"
    );

    if (newLessons.length > 0) {
      const requests = newLessons.map((lesson) => {
        return genericFetchPost(`${urlLessons}${lesson.ID}`, token, {
          title: lesson.post_title,
          menu_order: lesson.order,
        });
      });
      await axios.all(requests);
    }

    const newHeadings = lessonList.filter(
      (lesson) => lesson.type === "section-heading"
    );

    await genericFetchPost(`${sectionsUrl}/${courseID}`, token, {
      sections: newHeadings,
    });
  };

  const { data: course } = useSWRImmutable(
    token ? [`${courseUrl}/${courseID}`, token] : null,
    getCategories
  );

  const { data: categories } = useSWRImmutable(
    token ? [categoriesUrl, token] : null,
    getCategories
  );

  const setCategoryValue = (value) => {
    setCategory(value);
    formulario.setFieldValue("category", value.value);
  };

  const { data: tags } = useSWRImmutable(
    token ? [tagsUrl, token] : null,
    getCategories
  );

  const setTagValue = (value) => {
    setTag(value);
    formulario.setFieldValue("tag", value.value);
  };

  const setPrice = (value, field) => {
    if (typeof value === "string") {
      formulario.setFieldValue(field, value);
      return;
    }
    formulario.setFieldValue(field, 0);
  };

  const selectCover = () => {
    setImage("cover");
    setOpen(!open);
  };
  const selectAvatar = () => {
    setImage("avatar");
    setOpen(!open);
  };

  const selectVideo = () => {
    setOpenMedia(!openMedia);
  };

  const selectMedia = (media) => {
    if (image === "cover") {
      formulario.setFieldValue("course_cover", media.id);
      setCover({ url: media.source_url });
    }

    if (image === "avatar") {
      formulario.setFieldValue("featured_media", media.id);
      setAvatar({ url: media.source_url });
    }
  };

  useEffect(() => {
    if (course) {
      console.log(course?.status)
      setLoading(false);
      setStatus(course?.status)
      formulario.setFieldValue("title", course.title.rendered);
      formulario.setFieldValue("description", course.content.rendered);
      formulario.setFieldValue("short_description", course.short_description);
      formulario.setFieldValue("price", course.price_type_closed_price);
      formulario.setFieldValue(
        "subscriber_price",
        course.price_type_open_price
      );
      formulario.setFieldValue("featured_media", course.featured_media);
      formulario.setFieldValue("course_cover", course.course_cover_photo);
      formulario.setFieldValue("course_video", course.course_video);

      formulario.setFieldValue(
        "disable_content_table",
        course.disable_content_table === true ? "true" : "false"
      );
      formulario.setFieldValue(
        "progression_disabled",
        course.progression_disabled === true ? "on" : "off"
      );
      setAvatar({ url: course.course_img });
      setCover({ url: course.cover });
    }
  }, [course]);

  useEffect(() => {
    if (categories) {
      const category = categories.find(
        (category) => category.value === course?.ld_course_category[0]
      );
      if (!category) return;
      setCategory(category);
      formulario.setFieldValue("category", course?.ld_course_category[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (tags) {
      const tag = tags.find((tag) => tag.value === course?.ld_course_tag[0]);
      if (!tag) return;
      setTag(tag);
      formulario.setFieldValue("tag", course?.ld_course_tag[0]);
    }
  }, [tags]);

  const handleSubmit = async (status) => {
    await formulario.setFieldValue("status", status);
    await formulario.submitForm();
  };

  const selectMediaVideo = (media) => {
    formulario.setFieldValue("course_video", media.uid);
  };

  return (
    <MainLayout title={"Edit Course"} sidebar={<MainSidebar />}>
      <div className="position-relative pb-3 course-background">
        {loading && <BlockUi color={"var(--primary-color)"} />}
        <div className="container px-2 pb-5">
          <BackButton />
          <div className="container course-edit-container ">
            <div className="row">
              <div className="col-sm-12 col-lg-6">
                <div className="row">
                  <div className="col-12">
                    <div className="contain-title">
                      <h1 className="create-communities-title d-flex align-items-center">
                        <span>EDIT COURSE</span>
                        <span className={` ml-2 badge badge-pill ${status === "publish"? "badge-success" : "badge-warning"}`}>{status}</span>
                      </h1>
                    </div>
                  </div>

                  <div className="col-12 position-relative container-cover">
                    <CoursesUploadCover
                      onClick={selectCover}
                      cover={cover}
                      url={cover?.url}
                      reset={() => setCover(null)}
                      text="Upload Cover Image"
                      className={"featured-image-cover"}
                    />
                    <CoursesUploadCover
                      className={"featured-image"}
                      onClick={selectAvatar}
                      cover={avatar}
                      url={avatar?.url}
                      reset={() => setAvatar(null)}
                      text="Upload Featured Image"
                    />
                  </div>

                  <div className="col-12">
                    <CourseForm
                      open={open}
                      setOpen={setOpen}
                      formCourse={formulario}
                      setPrice={setPrice}
                      selectVideo={selectVideo}
                      category={category}
                      categories={categories ? categories : []}
                      setCategoryValue={setCategoryValue}
                      tag={tag}
                      tags={tags ? tags : []}
                      setTagValue={setTagValue}
                      handleSubmit={handleSubmit}
                      updated={true}
                      courseID={courseID}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-6 builder-header-section">
                <div className="row">
                  <div className="col-12">
                    <div className="contain-title">
                      <h1 className="create-communities-title">
                        LESSON BUILDER
                      </h1>
                    </div>
                  </div>
                  <div className="col-12 subhead">Introduction</div>
                </div>
                <Builder
                  user={user}
                  courseID={courseID}
                  setLessonList={setLessonList}
                />
              </div>
              <div className="col-12 mb-4">
                <div className="d-flex justify-content-end">
                  <div
                    onClick={() => router.push(`/dashboard/courses`)}
                    className="mr-3"
                  >
                    <button className="btn btn-border-primary-2  custom-cancel-btn main-page py-3">
                      Cancel
                    </button>
                  </div>
                  <div className="mr-3">
                    <button
                      onClick={() => handleSubmit("draft")}
                      type="submit"
                      className="btn btn-create custom-submit-btn py-3 bg-warning"
                    >
                      Save as Draft
                    </button>
                  </div>
                  <div className="mr-3">
                    <button
                      onClick={() => handleSubmit("publish")}
                      type="submit"
                      className="btn btn-create custom-submit-btn py-3"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {token && open && (
        <MediaLibrary
          token={token}
          show={open}
          onHide={() => setOpen(!open)}
          selectMedia={selectMedia}
          media_type={
            image === "cover" || image === "avatar" ? "image" : "video"
          }
        />
      )}

      <MediaLibraryVideo
        show={openMedia}
        setShow={setOpenMedia}
        selectMedia={selectMediaVideo}
      />
    </MainLayout>
  );
}

export default EditCoursePage;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { data: { id } },
  };
}
