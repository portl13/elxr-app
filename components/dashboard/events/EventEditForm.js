import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import InputDashForm from "@components/shared/form/InputDashForm";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import useSWRImmutable from "swr/immutable";
import { createEventsFecth, getCategories } from "@request/dashboard";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

import { UserContext } from "@context/UserContext";
import InputDashRadio from "@components/shared/form/InputDashRadio";
import InputDashCheck from "@components/shared/form/InputDashCheck";
import ClockIcon from "@icons/ClockIcon";
import BlockUi from "@components/ui/blockui/BlockUi";
import Editor from "@components/shared/editor/Editor";
import { useAlert } from "react-alert";
import { TIMEOUT } from "@utils/constant";
import InputDashTags from "@components/shared/form/InpushDashTags";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import CoursesUploadCover from "../courses/CoursesUploadCover";
import { convertToUTC } from "@utils/dateFromat";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";
import {createLogger} from "redux-logger";
const baseUrl = process.env.apiV2;
const urlCategory = `${baseUrl}/channel-event/categories`;
const urlEvents = `${baseUrl}/channel-event/`;

function EventEditForm({ id, text = "Edit Event" }) {
  const { user } = useContext(UserContext);
  const alert = useAlert();
  const [category, setcategory] = useState();
  const [loading, setLoading] = useState(true);
  const [date_time, setDateTime] = useState(new Date());
  const [eventTime, setTime] = useState();
  const [defaulTime, setDefaulTime] = useState();
  const [cover, setCover] = useState();
  const [open, setOpen] = useState(false);
  let formatTime = "kk:mm:ss";
  const token = user?.token;
  const router = useRouter();
  const [tags, setTags] = useState([]);

  const addEventForm = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      thumbnail: "",
      live_chat: true,
      record_stream: false,
      visability: "public",
      date_time: moment(Date.now()).format("YYYY-MM-DD kk:mm:ss"),
      channel_id: "",
      stream: "webcam",
      action: "update",
      id: id,
    },
    onSubmit: async (values) => createNewEvent(values),
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      category: Yup.string().required("Category is required"),
    }),
  });

  const { data: categories } = useSWRImmutable(
    token ? [urlCategory, token] : null,
    getCategories
  );

  const { data: event, mutate } = useSWRImmutable(
    token ? [`${urlEvents}${id}`, token] : null,
    getCategories
  );

  const handleChangeCategory = (value) => {
    setcategory(value);
    addEventForm.setFieldValue("category", String(value.value));
  };

  const createNewEvent = async (values) => {
    setLoading(true);
    try {
      await createEventsFecth(urlEvents, token, values);
      await mutate(values);
      setLoading(false);
      alert.success("Event updated successfully", TIMEOUT);
      router.push(`/dashboard/events`);
    } catch (error) {
      setLoading(false);
      alert.error(error.message, TIMEOUT);
    }
  };

  function handlerSetTime(value) {
    if (!value) return;
    const time = value.format(formatTime);
    setTime(time);
    const dataTime = moment(date_time).format("YYYY-MM-DD ").concat(time);
    addEventForm.setFieldValue("date_time", dataTime);
  }

  function handlerSetDateTime(e) {
    setDateTime(e.target.value);
    const dataTime = moment(e.target.value)
      .format("YYYY-MM-DD ")
      .concat(eventTime);
    addEventForm.setFieldValue("date_time", dataTime);
  }

  const selectMedia = (media) => {
    addEventForm.setFieldValue("thumbnail", media.id);
    setCover({ url: media.source_url });
  };

  useEffect(() => {
    if (event) {
      const dateTime = new Date(convertToUTC(event.date_time));
      setTime(moment(dateTime).format(formatTime));
      setDateTime(moment(dateTime).format("YYYY-MM-DD"));
      setDefaulTime(dateTime);
      addEventForm.setFieldValue("date_time", event.date_time)
    }
  }, [event]);

  useEffect(() => {
    if (cover && cover?.id) {
      addEventForm.setFieldValue("thumbnail", cover.id);
    }
  }, [cover]);

  useEffect(() => {
    addEventForm.setFieldValue("channel_id", id);
  }, []);

  useEffect(() => {
    if (event) {
      addEventForm.setFieldValue("title", event.title);
      addEventForm.setFieldValue("description", event.description);
      addEventForm.setFieldValue("live_chat", event.live_chat);
      addEventForm.setFieldValue("record_stream", event.record_stream);
      addEventForm.setFieldValue("visability", event.visability);
      addEventForm.setFieldValue("stream", event.stream);
      if (event.thumbnail) {
        setCover({ url: event.thumbnail });
      }

      if (event.tags) {
        const newTags = event.tags.map(({ value, label }) => ({
          value,
          label,
        }));
        setTags(newTags);
        addEventForm.setFieldValue("tags", newTags);
      }
    }
  }, [event]);

  useEffect(() => {
    if (categories && event) {
      const category = categories.find((item) => item.name === event.category);
      if (!category) return;
      setcategory({ label: category.name, value: category });
      addEventForm.setFieldValue("category", String(category.id));
    }
  }, [categories, event]);

  useEffect(() => {
    if (event) {
      setLoading(false);
    }
  }, [event]);

  useEffect(() => {
    if (tags) {
      const newTags = tags.map((tag) => tag.value);
      addEventForm.setFieldValue("tags", newTags);
    }
  }, [tags]);

  return (
    <>
      <div className="container px-2 pb-5 postion-relative">
        {loading && <BlockUi color={"var(--primary-color)"} />}
        <BackButton />
        <div className="container-80 container px-0">
          <div className="my-5">
            <ListNavItem
              data={{
                title: "Create Event",
                icon: "/img/icon-movil/create-menu/events.svg",
                type: "heading",
              }}
            />
          </div>
          <div className="row">
            <div className="col-12 col-md-7">
              <h5>UPLOAD THUMBNAIL</h5>
              <p className="font-size-14 text-grey">
                Select or upload a picture that represents your stream. A good
                thumbnail stands out and draws
              </p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12 col-md-6">
              <CoursesUploadCover
                onClick={() => setOpen(true)}
                cover={cover}
                url={cover?.url}
                reset={() => setCover(null)}
                text="Upload Image"
              />
            </div>
          </div>
          <form className="row" onSubmit={addEventForm.handleSubmit}>
            <div className="col-12  mt-4">
              <InputDashForm
                label="Title"
                name="title"
                type={"text"}
                value={addEventForm.values.title}
                onChange={addEventForm.handleChange}
                required={true}
                error={addEventForm.errors.title}
                touched={addEventForm.touched.title}
              />
            </div>
            <div className="col-12 col-md-6 mt-4">
              <InputDashForm
                label="Category"
                name="category"
                type={"select"}
                required={true}
                error={addEventForm.errors.category}
                onChange={handleChangeCategory}
                value={category}
                options={categories?.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                touched={addEventForm.touched.category}
              />
            </div>
            <div className="col-12 col-md-6 mt-4">
              <InputDashTags value={tags} setValue={setTags} />
            </div>
            <div className="col-12  mt-4">
              <Editor
                className="editor-styles"
                onChange={(value) =>
                  addEventForm.setFieldValue("description", value)
                }
                value={addEventForm.values.description}
              />
              {addEventForm.touched.description &&
                addEventForm.touched.description && (
                  <div className="invalid-feedback d-block">
                    {addEventForm.errors.description}
                  </div>
                )}
            </div>

            <div className={`col-12 mt-5`}>
              <p>Select the date and time you want to go live</p>
            </div>
            <div className={`col-12 col-md-6`}>
              <label className="input-search mr-0 border-radius-35  w-100 input-date-piker d-flex">
                <input
                  type="date"
                  className="date-selector bg-transparent border-0 text-white w-100 mr-0"
                  value={date_time}
                  name="date"
                  min={moment().format("YYYY-MM-DD")}
                  onChange={handlerSetDateTime}
                />
              </label>
            </div>
            <div className={`col-12 col-md-6`}>
              <label className="input-search mr-0 border-radius-35 w-100 d-flex justify-content-between align-items-center input-date-piker">
                {defaulTime && (
                  <TimePicker
                    showSecond={false}
                    format={formatTime}
                    use12Hours
                    placeholder="1.35pm"
                    defaultValue={moment(defaulTime)}
                    inputReadOnly
                    onChange={handlerSetTime}
                    className="w-100 pr-2 input-date-session"
                  />
                )}
                <i>
                  <ClockIcon className="icon-clock" />
                </i>
              </label>
            </div>

            <div className="col-12 my-2 mb-md-5 mt-md-3">
              <div>
                <h5>LIVE CHAT</h5>
              </div>
              <div className="border-white px-5 py-4">
                <p>Settings to tailor your stream to your needs</p>

                <div className="my-3 d-flex ">
                  <InputDashCheck
                    name={"live_chat"}
                    label={"Live Chat"}
                    value={addEventForm.values.live_chat}
                    onChange={addEventForm.handleChange}
                  />
                  <InputDashCheck
                    name={"record_stream"}
                    label={"Record Stream"}
                    value={addEventForm.values.record_stream}
                    onChange={addEventForm.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mt-3">
              <h5>VISIBILITY</h5>
              <p>Choose when to go live and who can see your stream</p>
              <div className="border-white px-4 py-5">
                <InputDashRadio
                  values={[
                    {
                      value: "public",
                      label: "Public",
                      description: "Everyone can watch your stream",
                    },
                    {
                      value: "private",
                      label: "Private",
                      description:
                        "Only you and people you choose can watch your stream",
                    },
                  ]}
                  name="visability"
                  value={addEventForm.values.visability}
                  onChange={addEventForm.handleChange}
                  className="mt-2"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 mt-3">
              <h5>STREAMING METHOD</h5>
              <p>Choose how you are going to create your live stream</p>
              <div className="border-white px-4 py-5">
                <InputDashRadio
                  values={[
                    {
                      value: "webcam",
                      label: "Webcam",
                      description: "Stream directly from your web browser",
                    },
                    {
                      value: "rtmp",
                      label: "Software Stream",
                      description:
                        "Stream using 3rd party software such as OBS",
                    },
                  ]}
                  name="stream"
                  value={addEventForm.values.stream}
                  onChange={addEventForm.handleChange}
                  className="mt-2"
                />
                {/* {addEventForm.values.stream === 'rtmp' && streamData && (
                  <div className="mt-3">
                    <label className="input-search mr-0 border-radius-35 w-100  input border-none mb-0">
                      <span className="text-grey">Stream Url</span>
                      <span className="text-red">*</span>
                      <input
                        className="w-100 bg-transparent text-white border-none mt-1"
                        value={streamData.rtmp_url}
                        readOnly
                      />
                    </label>
                    <label className="input-search mr-0 border-radius-35 w-100 input border-none  mb-0">
                      <span className="text-grey">Stream Key</span>
                      <input
                        className="w-100 bg-transparent text-white border-none mt-1"
                        value={streamData.stream_key}
                        readOnly
                      />
                    </label>
                  </div>
                )} */}
              </div>
            </div>
            <div className="py-3 d-flex justify-content-center justify-content-md-end mt-3 w-100">
              <button type="submit" className="btn btn-create px-5">
                Update
              </button>
            </div>
          </form>
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

export default EventEditForm;
