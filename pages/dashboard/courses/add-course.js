import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CourseForm from "@components/dashboard/courses/CourseForm";
import { UserContext } from "@context/UserContext";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import CoursesUploadCover from "@components/dashboard/courses/CoursesUploadCover";
import useSWRImmutable from "swr/immutable";
import { genericFetchPost, getCategories } from "@request/dashboard";
import BlockUi from "@components/ui/blockui/BlockUi";
import { useAlert } from "react-alert";
import { TIMEOUT } from "@utils/constant";
import { useRouter } from "next/router";
import Builder from "../../../components/dashboard/courses/builder/Builder";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import MediaLibraryVideo from "@components/MediaLibraryVideo/MediaLibraryVideo";

const urlLessons = `${process.env.baseUrl}/wp-json/ldlms/v2/sfwd-lessons/`;
const baseUrl = `${process.env.baseUrl}/wp-json/course-api/v1/course`;
const categoriesUrl = `${baseUrl}/course-categories`;
const tagsUrl = `${baseUrl}/course-tags`;
const urlProduct = `${process.env.woocomApi}/products`;

function AddCoursePage() {
  const router = useRouter();
  const alert = useAlert();
  const { user } = useContext(UserContext);
  const token = user?.token;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("cover");
  const [cover, setCover] = useState(null);
  const [courseID, setCourseID] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [openMedia, setOpenMedia] = useState(false);

  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState(null);

  const [lessonList, setLessonList] = useState([]);

  const formulario = useFormik({
    initialValues: {
      id: null,
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
    onSubmit: async (values) => createCourse(values),
    validationSchema: Yup.object({
      title: Yup.string().required("Name is required"),
      price: Yup.number().required("Price is required"),
      category: Yup.string(),
      description: Yup.string().required("Description is required"),
      short_description: Yup.string().required("Short description is required"),
      course_cover: cover ? Yup.string() : Yup.string().required("An Image is Required to Save"),
      featured_media: avatar ? Yup.string() : Yup.string().required("An Image is Required to Save"),
    }),
  });

  const createSubscriptionProduct = async (user, data) => {
    return await genericFetchPost(urlProduct, user?.token, data);
  };

  const createProductLesson = (user, id) => {
    lessonList.forEach(async (l, k) => {
      const updateLesson = {
        menu_order: k + 1,
      };
      await genericFetchPost(`${urlLessons}${courseID}`, token, updateLesson);
    });
  };

  const createCourse = async (values) => {
    setLoading(true);

    if (formulario?.values?.id) {
      const data = {
        ...values,
        tag: String(values.tag),
        category: String(values.category),
        course_cover: String(values.course_cover),
        featured_media: String(values.featured_media),
        progression_disabled: values.progression_disabled === "on",
        disable_content_table: values.disable_content_table === "true",
        status: "publish",
      };
      await genericFetchPost(`${baseUrl}/${courseID}`, token, data);
      await createProductLesson(user, id);
      alert.success("Course publish successfully", TIMEOUT);
      router.push(`/dashboard/courses`).then();
    } else {
      const data = {
        ...values,
        tag: String(values.tag),
        category: String(values.category),
        course_cover: String(values.course_cover),
        featured_media: String(values.featured_media),
        progression_disabled: values.progression_disabled === "on",
        disable_content_table: values.disable_content_table === "true",
      };

      try {
        const { id } = await genericFetchPost(`${baseUrl}/`, token, data);
        setCourseID(id);
        await formulario.setFieldValue("id", id);

        const product = {
          name: values.title,
          regular_price: values.price,
          description: values.description,
          type: "course",
          virtual: true,
          images: [],
          meta_data: [
            {
              key: "_related_course",
              value: [id],
            },
          ],
        };

        await createSubscriptionProduct(user, product);
        alert.success("Save Course to continue adding Lessons.", TIMEOUT);
        if (id){
          await router.push(`/dashboard/courses/edit-course/${id}`);
          return
        }
        await router.push('/manage/courses')
      } catch (e) {
        alert.error(e.message, TIMEOUT);
      } finally {
        setLoading(false);
      }
    }
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
    // if (image === "video") {
    //   formulario.setFieldValue("course_video", media.source_url);
    // }
    if (image === "avatar") {
      formulario.setFieldValue("featured_media", media.id);
      setAvatar({ url: media.source_url });
    }
  };

  const handleSubmit = async () => {
    let statusTye = courseID ? "publish" : "draft";
    await formulario.setFieldValue("status", statusTye);
    await formulario.submitForm();
  };

  const selectMediaVideo = (media) => {
    formulario.setFieldValue("course_video", media.uid);
  };

  return (
    <MainLayout sidebar={<MainSidebar />} title={"Add New Course"}>
      <div className="position-relative pb-3 course-background">
        {loading && <BlockUi color={"var(--primary-color)"} />}
        <div className="container px-2 pb-5">
          <BackButton />
          <div className="container course-edit-container add-course">
            <div className="row">
              <div className="col-sm-12 col-lg-6">
                <div className="row">
                  <div className="col-12">
                    <div className="contain-title">
                      <h1 className="create-communities-title">
                        CREATE COURSE
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
                      error={formulario.errors.course_cover && formulario.touched.course_cover ? formulario.errors.course_cover : null}
                    />
                    <CoursesUploadCover
                        className={"featured-image"}
                        onClick={selectAvatar}
                        cover={avatar}
                        url={avatar?.url}
                        reset={() => setAvatar(null)}
                        text="Upload Featured Image"
                        error={formulario.errors.featured_media && formulario.touched.featured_media ? formulario.errors.featured_media : null}
                    />
                  </div>
                </div>
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
                />
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
                  isCreate={true}
                />
              </div>
              <div className="col-12 mb-4">
                <div className="d-flex justify-content-end">
                  <div
                    onClick={() => router.push(`/manage/courses`)}
                    className="mr-3"
                  >
                    <button className="btn btn-border-primary-2  custom-cancel-btn main-page py-3">
                      Cancel
                    </button>
                  </div>
                  <div className="mr-3">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="btn btn-create custom-submit-btn py-3"
                    >
                      {courseID ? "Save" : "Save as draft"}
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

export default AddCoursePage;
