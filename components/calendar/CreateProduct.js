import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import BlockUi from "@components/ui/blockui/BlockUi";
import ListNavItem from "@components/layout/ListNavItem";
import ProductIcon from "@icons/ProductIcon";
import MediaLibraryCover from "@components/shared/media/MediaLibraryCover";
import InputDashForm from "@components/shared/form/InputDashForm";
import InputDashCurrency from "@components/shared/form/InputDashCurrency";
import Editor from "@components/shared/editor/Editor";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import useSWRImmutable from "swr/immutable";
import {
  createProduct,
  genericFetch,
  getProductCategories,
} from "@request/dashboard";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TIMEOUT } from "@utils/constant";
import { Calendar } from "react-date-range";
import { addMonths, format } from "date-fns";
import { css } from "@emotion/core";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";

const base = process.env.baseUrl + "/wp-json/appointment/v1/appointment";

const productUrl = base + "/product";
const wooApi = base + "/product";

const style = css`
  .rdrCalendarWrapper {
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(190, 233, 241, 0.2);
    .rdrDayDisabled,
    .rdrDayDisabled.rdrDay .rdrDayNumber {
      background-color: rgb(241 241 241) !important;
    }
    .rdrDay.rdrDayPassive .rdrDayNumber span {
      color: #979898 !important;
    }

    .rdrPprevButton {
      background: transparent;

      i {
        border-color: transparent #a8a8a8 transparent transparent;
      }
    }

    .rdrNextButton {
      background: transparent;

      i {
        border-color: transparent transparent transparent #a8a8a8;
      }
    }

    .rdrMonthAndYearPickers {
      select {
        padding: 0;
      }

      .rdrMonthPicker {
        select {
          background-color: #fff;
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 30px;
          text-transform: uppercase;
          color: #000;
        }
      }

      .rdrYearPicker {
        select {
          background-color: #fff;
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 30px;
          text-transform: uppercase;
          color: #000;
        }
      }
    }

    .rdrMonths {
      .rdrWeekDays {
        .rdrWeekDay {
          text-transform: uppercase;
          color: #000;
        }
      }

      .rdrDay {
        margin-bottom: 15px;

        .rdrDayEndPreview {
          border: 0;
          background: transparent;
        }

        .rdrDayNumber {
          background: #f6f6f6;
          width: 40px;
          height: 40px;
          border-radius: 100%;

          span {
            color: #000;
          }
        }

        &.rdrDayPassive {
          .rdrDayNumber {
            span {
              color: #251f1c;
            }
          }
        }

        .rdrSelected {
          border-radius: 100%;
          width: 40px;
          height: 40px;
          right: 0;
          left: 0;

          & ~ .rdrDayNumber {
            background-color: var(--primary-hover);
            span {
              color: var(--white-color);
              font-weight: bolder;
              font-size: 1.1rem;
            }
          }
        }

        &.rdrDayToday {
          .rdrDayNumber {
            background: linear-gradient(
              125.11deg,
              #00e0fc -16.42%,
              #ff73f8 59.72%,
              #f5d1b5 100.27%
            );
            box-shadow: 0 3px 11px rgba(0, 0, 0, 0.0821405);
            width: 40px;
            height: 40px;
            border-radius: 100%;

            span {
              color: #fff;
              font-weight: bolder;
              font-size: 1.1rem;

              :after {
                background: transparent;
              }
            }
          }
        }
      }
    }

    .rdrMonthPicker,
    .rdrYearPicker {
      select {
        background: #121425;
      }
    }
  }
`;

const restrictedDays = [
  {
    label: "Sunday",
    value: 0,
  },
  {
    label: "Monday",
    value: 1,
  },
  {
    label: "Tuesday",
    value: 2,
  },
  {
    label: "Wednesday",
    value: 3,
  },
  {
    label: "Thursday",
    value: 4,
  },
  {
    label: "Friday",
    value: 5,
  },
  {
    label: "Saturday",
    value: 6,
  },
];

export default function CreateProduct({ id = null }) {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const router = useRouter();
  const alert = useAlert();
  const [isSaving, setIsSaving] = useState(Boolean(id));
  const [category, setCategory] = useState(null);
  const [cover, setCover] = useState(null);
  const [productImage, setProductImage] = useState(null);

  const maxDate = addMonths(new Date(), 12);

  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [toTime, setToTime] = useState(moment(new Date()));
  const [fromTime, setFromTime] = useState(moment(new Date()));

  const { data: categoriesData } = useSWRImmutable(
    token ? [`/api/woocommerce/categories`, token] : null,
    getProductCategories
  );

  const addProductForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      regular_price: "",
      sale_price: "",
      categories: [],
      virtual: true,
      downloadable: true,
      featured_image: "",
      status: "",
      _wc_appointment_duration: 1,
      _wc_appointment_duration_unit: "hour",

      _wc_appointment_interval: 30,
      _wc_appointment_interval_unit: "minute",

      _wc_appointment_padding_duration: 30,
      _wc_appointment_padding_duration_unit: "minute",

      _wc_appointment_min_date: 1,
      _wc_appointment_min_date_unit: "day",

      _wc_appointment_max_date: 12,
      _wc_appointment_max_date_unit: "month",

      _wc_appointment_cancel_limit: 1,
      _wc_appointment_cancel_limit_unit: "day",

      _wc_appointment_restricted_days: [],

      _wc_appointment_availability_rules: {
        type: "time:range",
        qty: "0",
        avail_id: "",
        kind_id: "",
        from_custom: "",
        to_custom: "",
        from_months: "1",
        to_months: "1",
        from_weeks: "1",
        to_weeks: "1",
        from_days: "1",
        to_days: "1",
        from_time: "",
        to_time: "",
        priority: "10",
        appointable: "yes",
      },
      _wc_appointment_qty: 1,
      _wc_appointment_qty_min: 1,
      _wc_appointment_qty_max: 1,
    },
    onSubmit: (values) =>
      createProductSubmit({
        ...values,
        _wc_appointment_availability_rules: [
          values._wc_appointment_availability_rules,
        ],
      }),
    validationSchema: Yup.object({
      name: Yup.string().required("Product Title is Required"),
      regular_price: Yup.string().required("Price is Required"),
      description: Yup.string().required("Description is Required"),
      categories: Yup.array().required("Category is Required"),
    }),
  });

  const { data: product, mutate } = useSWRImmutable(
      id && token ? [`${wooApi}/${id}`, token] : null,
      genericFetch
  );

  const createProductSubmit = async (values) => {
    setIsSaving(true);
    try {
      await createProduct(!id ? productUrl : `${productUrl}/${id}`, token, values);
      setIsSaving(false);
      if (id){
        await mutate();
      }
      await router.push("/calendar-menu/products");
    } catch (error) {
      setIsSaving(false);
      alert.error(error.message, TIMEOUT);
    }
  };



  const handlerChangeCategory = (value) => {
    setCategory(value);
    addProductForm.setFieldValue("categories", [String(value.value)]);
  };

  const setPrice = (value, field) => {
    if (typeof value === "string") {
      addProductForm.setFieldValue(field, value);
      return;
    }
    addProductForm.setFieldValue(field, 0);
  };

  const saveDraft = () => {
    addProductForm.setFieldValue("status", "draft");
    addProductForm.submitForm();
  };

  const saveProduct = () => {
    addProductForm.submitForm();
  };

  const selectMedia = (media) => {
    addProductForm.setFieldValue("featured_image", { id: media.id });
    setCover({ url: media.source_url });
  };

  const resetMedia = () => {
    addProductForm.setFieldValue("featured_image", "");
    setCover(null);
  };

  const handleDate = (date, state) => {
    if (state === "to") {
      setTo(date);
      addProductForm.setFieldValue(
        "_wc_appointment_availability_rules.to_custom",
        format(date, "yyyy-MM-dd")
      );
    }
    if (state === "from") {
      setFrom(date);
      addProductForm.setFieldValue(
        "_wc_appointment_availability_rules.from_custom",
        format(date, "yyyy-MM-dd")
      );
    }
  };

  const handleTime = (date, state) => {
    const horusMinutes = date.split(':')
    const time = moment(new Date())
    time.set("hour", horusMinutes[0])
    time.set("minute", horusMinutes[1])
    if (state === "to") {
      setToTime(time)
      addProductForm.setFieldValue(
        "_wc_appointment_availability_rules.to_time",
        date
      );
    }
    if (state === "from") {
      setFromTime(time)
      addProductForm.setFieldValue(
        "_wc_appointment_availability_rules.from_time",
        date
      );
    }
  };

  useEffect(() => {
    if (productImage) {
      addProductForm.setFieldValue("featured_image", { id: productImage.id });
    }
  }, [productImage]);

  useEffect(() => {
    if (product) {
      isSaving && setIsSaving(false);
      addProductForm.setFieldValue("id", product.id);
      addProductForm.setFieldValue("name", product.name);
      addProductForm.setFieldValue("description", product.description);
      addProductForm.setFieldValue("regular_price", product.regular_price);
      addProductForm.setFieldValue("sale_price", product.sale_price);
      addProductForm.setFieldValue(
        "_wc_appointment_padding_duration",
        product.padding_duration
      );
      addProductForm.setFieldValue(
        "_wc_appointment_duration",
        product.duration
      );
      addProductForm.setFieldValue(
        "_wc_appointment_interval",
        product.interval
      );
      addProductForm.setFieldValue(
        "_wc_appointment_min_date",
        product.min_date
      );

      addProductForm.setFieldValue(
        "_wc_appointment_availability_rules.avail_id",
        product.avail_id
      );
      addProductForm.setFieldValue(
        "_wc_appointment_availability_rules.kind_id",
        product.id
      );

      const restricted_days = Object.values(product?.restricted_days);

      if (restricted_days.length > 0) {
        addProductForm.setFieldValue(
          "_wc_appointment_restricted_days",
          restricted_days
        );
      }

      if (product?.to_date) {
        setTo(new Date(product.to_date));
        addProductForm.setFieldValue(
          "_wc_appointment_availability_rules.to_custom",
          product.to_date
        );
      }

      if (product?.from_date) {
        setFrom(new Date(product.from_date));
        addProductForm.setFieldValue(
          "_wc_appointment_availability_rules.from_custom",
          product.from_date
        );
      }


        if (product?.to_range) {
          setToTime(
            moment(new Date(`${product?.to_date}T${product?.to_range}:00`))
          );
          addProductForm.setFieldValue(
            "_wc_appointment_availability_rules.to_time",
            product.to_range
          );
        }
        if (product?.from_range) {
          setFromTime(
            moment(new Date(`${product?.from_date || product?.to_date}T${product?.from_range}:00`))
          );
          addProductForm.setFieldValue(
            "_wc_appointment_availability_rules.from_time",
            product.from_range
          );
        }

      if (
        categoriesData &&
        product.categories &&
        product.categories.length > 0
      ) {
        const category = categoriesData.find(
          (cat) => cat.id === product.categories[0].id
        );
        if (!category) return;
        setCategory({ value: category.id, label: category.name });
        addProductForm.setFieldValue("categories", [String(category.id)]);
      }

      if (product.images && product.images.length > 0) {
        setProductImage({
          id: product.images[0].id,
          url: product.images[0].src,
        });
        setCover({ url: product.images[0].src });
      }
    }
  }, [product]);

  return (
    <div className="position-relative">
      {isSaving && <BlockUi color="var(--primary-color)" />}
      <div className="container container-80 px-3 px-md-5">
        <div className="py-5">
          <ListNavItem
            data={{
              title: `${id ? "Update" : "Create"} Appointable`,
              type: "heading",
              icon: <ProductIcon />,
            }}
          />
        </div>
        <div className="row">
          <div className="col-12 col-md-5">
            <MediaLibraryCover
              selectMedia={selectMedia}
              cover={cover}
              reset={resetMedia}
              text="Upload Cover Image"
              token={token}
            />
          </div>
          <div className="col-12">
            <form
              css={style}
              className="row"
              onSubmit={addProductForm.handleSubmit}
            >
              <div className="col-12 mt-5 mb-3">
                <InputDashForm
                  label="Product Title"
                  name="name"
                  value={addProductForm.values.name}
                  onChange={addProductForm.handleChange}
                  error={addProductForm.errors.name}
                  touched={addProductForm.touched.name}
                  type="text"
                  required={true}
                />
              </div>
              <div className="col-12 col-md-6 mb-4">
                <InputDashCurrency
                  label="Price ($)"
                  name="regular_price"
                  value={addProductForm.values.regular_price}
                  onChange={setPrice}
                  error={addProductForm.errors.regular_price}
                  touched={addProductForm.touched.regular_price}
                  required={true}
                />
              </div>
              <div className="col-12 col-md-6 mb-4">
                <InputDashForm
                  label={"Category"}
                  type="select"
                  name="categories"
                  value={category}
                  onChange={handlerChangeCategory}
                  error={addProductForm.errors.categories}
                  touched={addProductForm.touched.categories}
                  options={categoriesData?.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                />
              </div>
              <div className="col-12">
                <Editor
                  className="editor-styles"
                  onChange={(value) =>
                    addProductForm.setFieldValue("description", value)
                  }
                  value={addProductForm.values.description}
                />
                {addProductForm.touched.description &&
                  addProductForm.errors.description && (
                    <div className="invalid-feedback d-block">
                      {addProductForm.errors.description}
                    </div>
                  )}
              </div>
              <div className="col-12 mt-4">
                <h3 className={"font-size-22"}>Appointable</h3>
              </div>
              <div className="col-12 col-md-6 mb-4">
                <InputDashForm
                  label={"Duration in Hours"}
                  value={addProductForm.values._wc_appointment_duration}
                  name={"_wc_appointment_duration"}
                  onChange={addProductForm.handleChange}
                  type={"number"}
                />
              </div>
              <div className="col-12 col-md-6 mb-4">
                <InputDashForm
                  label={"Interval in Minutes"}
                  value={addProductForm.values._wc_appointment_interval}
                  name={"_wc_appointment_interval"}
                  onChange={addProductForm.handleChange}
                  type={"number"}
                />
              </div>
              <div className="col-12 col-md-6 mb-4">
                <InputDashForm
                  label={"Padding Time in Minutes"}
                  value={addProductForm.values._wc_appointment_padding_duration}
                  name={"_wc_appointment_padding_duration"}
                  onChange={addProductForm.handleChange}
                  type={"number"}
                />
              </div>{" "}
              <div className="col-12 col-md-6 mb-4">
                <InputDashForm
                  label={"Lead Time in Days"}
                  value={addProductForm.values._wc_appointment_min_date}
                  name={"_wc_appointment_min_date"}
                  onChange={addProductForm.handleChange}
                  type={"number"}
                />
              </div>
              <div className="col-12 mt-2 mb-4">
                <h3 className={"font-size-22"}>Availability</h3>
              </div>
              <div className="col-12">
                <h6 className={"mb-3"}>Restricted days</h6>
                {restrictedDays.map((day) => (
                  <label key={day.value} className={"mr-5"}>
                    {day.label}
                    <input
                      type="checkbox"
                      name={"_wc_appointment_restricted_days"}
                      value={day.value}
                      onChange={addProductForm.handleChange}
                      checked={addProductForm.values._wc_appointment_restricted_days.includes(
                        String(day.value)
                      )}
                    />
                  </label>
                ))}
              </div>
              <div className="col-12 mb-4 mt-4">
                <h6>Hours Available</h6>
              </div>
              <div className="col-12 col-md-6 text-center">
                <h5 className={"text-center font-size-16 text-primary"}>
                  From
                </h5>
                <TimePicker
                  showSecond={false}
                  format={"kk:mm"}
                  use12Hours
                  placeholder="12:00"
                  value={fromTime}
                  inputReadOnly
                  onChange={(e) => handleTime(e.format("kk:mm"), "from")}
                  className="w-100 pr-2 input-date-session calendar-date mt-3"
                />
              </div>
              <div className="col-12 col-md-6 text-center">
                <h5
                  className={
                    "text-center primary-color font-size-16 text-primary"
                  }
                >
                  To
                </h5>
                <TimePicker
                  showSecond={false}
                  format={"kk:mm"}
                  use12Hours
                  placeholder="12:00"
                  value={toTime}
                  inputReadOnly
                  onChange={(e) => handleTime(e.format("kk:mm"), "to")}
                  className="w-100 pr-2 input-date-session calendar-date mt-3"
                />
              </div>
              <div className="col-12 mb-4 mt-4">
                <h6>Custom Availability</h6>
              </div>
              <div className="col-12 col-md-6 text-center">
                <h5 className={"text-center font-size-16 text-primary"}>
                  Start Date
                </h5>
                <Calendar
                  inline
                  dateFormat="MMM YYYY"
                  onChange={(date) => handleDate(date, "from")}
                  minDate={new Date()}
                  maxDate={maxDate}
                  date={from}
                />
              </div>
              <div className="col-12 col-md-6 text-center">
                <h5
                  className={
                    "text-center primary-color font-size-16 text-primary"
                  }
                >
                  Start Date
                </h5>
                <Calendar
                  inline
                  dateFormat="MMM YYYY"
                  onChange={(date) => handleDate(date, "to")}
                  minDate={new Date()}
                  maxDate={maxDate}
                  date={to}
                />
              </div>
            </form>

            <div className="d-flex justify-content-center justify-content-md-end mb-3 mt-5">
              <div>
                <button
                  onClick={saveDraft}
                  className="btn btn-create  px-3 mr-2"
                >
                  Save as Draft
                </button>
              </div>
              <div>
                <button onClick={saveProduct} className="btn btn-create px-5">
                  {id ? "Update" : "Publish"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}