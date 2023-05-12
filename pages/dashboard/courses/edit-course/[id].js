import React, { useContext, useState, useEffect } from "react";
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
import Builder from "../../../../components/dashboard/courses/builder/Builder";
import BackButton from "@components/shared/button/BackButton";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import MediaLibraryVideo from "@components/MediaLibraryVideo/MediaLibraryVideo";
import {StripHtmlTags} from "@utils/StripHTMLTags";

const urlLessons = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-lessons/`;
const sectionsUrl = `${process.env.baseUrl}/wp-json/course-api/v1/course/sections`;
const baseUrl = `${process.env.baseUrl}/wp-json/course-api/v1/course`;
const categoriesUrl = `${baseUrl}/course-categories`;
const tagsUrl = `${baseUrl}/course-tags`;
const courseUrl = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-courses`;

function EditCoursePage({ id }) {
  const router = useRouter();
  const alert = useAlert();
  const  courseID  = id;
  const { user } = useContext(UserContext);
  const token = user?.token;
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("cover");
  const [cover, setCover] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [openMedia, setOpenMedia] = useState(false);
  const [status, setStatus] = useState("");

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
      short_description: Yup.string().required("Short description is required"),
    }),
  });

  const { data: course, mutate } = useSWRImmutable(
      token ? [`${courseUrl}/${courseID}`, token] : null,
      getCategories
  );

  const updateCourse = async (values) => {

    setLoading(true);

    const data = {
      ...values,
      category: String(values.category),
      course_cover: String(values.course_cover),
      featured_media: String(values.featured_media),
      progression_disabled: values.progression_disabled === "on",
      disable_content_table: values.disable_content_table === "true"
    };

    try {
      await genericFetchPost(`${baseUrl}/${courseID}`, token, data);
      await updateLessonList();
      await mutate()
      alert.success("Course Updated successfully", TIMEOUT);
      await router.push(`/manage/courses/`);
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
      setLoading(false);
      setStatus(course?.status);
      formulario.setFieldValue("title", course.title.rendered);
      formulario.setFieldValue("description", StripHtmlTags(course.content.rendered));
      formulario.setFieldValue("short_description", course.short_description);
      formulario.setFieldValue("price", course.price_type_closed_price);
      formulario.setFieldValue(
        "subscriber_price",
        course.price_type_open_price
      );
      if (course.featured_media) {
        formulario.setFieldValue("featured_media", course.featured_media);
        setAvatar({ url: course.course_img });
      }
      if (course.course_cover_photo) {
        formulario.setFieldValue("course_cover", course.course_cover_photo);
        setCover({ url: course.cover });
      }
      formulario.setFieldValue("course_video", course.course_video);

      formulario.setFieldValue(
        "disable_content_table",
        course.disable_content_table === true ? "true" : "false"
      );
      formulario.setFieldValue(
        "progression_disabled",
        course.progression_disabled === true ? "on" : "off"
      );
    }
  }, [course]);

  useEffect(() => {
    if (categories && course) {
      const category = categories.find(
        (category) => category.value === course?.ld_course_category[0]
      );
      if (!category) return;
      setCategory(category);
      formulario.setFieldValue("category", course?.ld_course_category[0]);
    }
  }, [categories, course]);

  useEffect(() => {
    if (tags) {
      const tag = tags.find((tag) => tag.value === course?.ld_course_tag[0]);
      if (!tag) return;
      setTag(tag);
      formulario.setFieldValue("tag", course?.ld_course_tag[0]);
    }
  }, [tags]);

  const handleSubmit = async (status) => {
    console.log('status',status)
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
                        <span
                          className={` ml-2 badge badge-pill ${
                            status === "publish"
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {status === "publish" && "PUBLISHED"}
                          {status === "draft" && "DRAFT"}
                        </span>
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
                {course ? <Builder
                    courseID={courseID}
                    setLessonList={setLessonList}
                /> : null}
              </div>
              <div className="col-12 mb-4">
                <div className="d-flex justify-content-center justify-content-md-end">
                  <div
                    onClick={() => router.push(`/manage/courses`)}
                    className="mr-2 mr-md-3"
                  >
                    <button className="btn btn-border-primary-2 custom-cancel-btn main-page ">
                      Cancel
                    </button>
                  </div>
                  <div className="mr-2 mr-md-3">
                    <button
                      onClick={() => handleSubmit("draft")}
                      type="submit"
                      className="btn btn-create custom-submit-btn bg-warning"
                    >
                      Save as Draft
                    </button>
                  </div>
                  <div className="mr-2 mr-md-3">
                    <button
                      onClick={() => handleSubmit("publish")}
                      type="submit"
                      className="btn btn-create custom-submit-btn btn-elxr"
                    >
                      {status === "publish" ? "Update" : "Publish"}
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

      {openMedia ? <MediaLibraryVideo
          show={openMedia}
          setShow={setOpenMedia}
          selectMedia={selectMediaVideo}
      /> : null}
    </MainLayout>
  );
}

export default EditCoursePage;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: {id},
  };
}
