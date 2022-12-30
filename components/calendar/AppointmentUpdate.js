import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "@context/UserContext";
import { Calendar } from "react-date-range";
import { Spinner } from "reactstrap";
import { Button, makeStyles } from "@material-ui/core";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { css } from "@emotion/core";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import axios from "axios";

import { addDays, addMonths } from "date-fns";
import {useRouter} from "next/router";
import BlockUi from "@components/ui/blockui/BlockUi";

export const AppointmentStyle = css`
  &.create-appointment-container {
    max-width: 1160px;
    padding: 20px;

    .page-Title {
      background: rgba(29, 51, 91, 0.48);
      height: 50px;
      width: 100%;
      border-radius: 22px;
      font-family: "Quicksand";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      /* identical to box height */
      color: #ffffff;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      justify-content: center;
      @media (min-width: 576px) {
        max-width: 323px;
      }

      img {
        margin-right: 10px;
      }
    }

    .calendar-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
      width: 100%;
      padding: 20px;

      @media (min-width: 768px) {
        flex-direction: row;
      }
    }

    .menu-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 20px;
      width: 100%;

      @media (min-width: 768px) {
        flex-direction: row;
      }
    }

    .options-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 20px;
      width: 100%;
      margin: 20px 0;
    }

    .custom-dropdownmenu {
      mix-blend-mode: normal;
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
      border-radius: 22px;
      font-family: "Quicksand";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      padding: 0 20px;
      line-height: 12px;
      /* identical to box height */
      color: var(--typo);
      width: 100%;
      height: 44px;
      border: 0;
    }

    .calendar-grid {
      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 20px;
      max-width: 100%;
    }

    .slot-container {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 15px;
    }

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
            font-family: "Oswald";
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
            font-family: "Oswald";
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

    .slot-item {
      border: 1px solid transparent;
      border-radius: 20px;
      background: #fff;
      color: #000;

      &:hover,
      &.active,
      &:focus {
        background: #f3215e;
        color: #fff;
      }
    }

    .custom-control-label {
      color: var(--typo);
      display: inline-block;
    }

    .custom-control-label:before,
    .custom-control-label:after {
      left: -27px;
    }
  }

  .button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    max-width: 1160px;
    padding: 0 20px;
  }

  .savebtn {
    background: #f3215e;
    border-radius: 17px;
    height: 34px;
    width: 100%;
    font-family: "Quicksand";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    /* identical to box height */
    color: #ffffff;

    &:hover {
      color: #f3215e;
      background: #ffffff;
    }

    .spinner-border {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }

    @media (min-width: 768px) {
      width: 200px;
    }
  }

  .appointment-info-box {
    border-bottom: 1px solid #43494f;
    margin-bottom: 20px;

    .card-main-head {
      font-family: "Quicksand";
      font-style: normal;
      font-weight: 700;
      font-size: 26px;
      line-height: 32px;
      /* identical to box height */
      color: var(--typo);
      margin-bottom: 50px;
      padding: 15px 15px;
    }

    .item-row {
      margin-bottom: 30px;

      .card-head {
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
        padding-left: 15px;
        /* identical to box height */
        color: var(--typo);
      }

      .card-normal-text {
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
        /* identical to box height */
        color: var(--typo);

        .tag {
          background: #f3215e;
          border-radius: 17px;
          display: inline-flex;
          padding: 5px 10px;
          height: 40px;
        }
      }
    }

    .stats-dropdownmenu {
      border: 0;
      height: 40px;
      color: var(--typo);
      padding: 10px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
      border-radius: 22px;
    }

    .update-btn {
      background: #f3215e;
      border-radius: 17px;
      font-family: "Quicksand";
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 30px;
      /* identical to box height */
      color: #000000;
      border: 0;
      height: 40px;
      width: 127px;
      margin-left: 10px;
    }
  }
`;

const woocomAPIUrl = process.env.woocomApi;

const baseUrl = process.env.baseUrl;

const appointmentApi = baseUrl + "/wp-json/appointment/v1/appointment";

const wcAppointmentApi = baseUrl + "/wp-json/wc-appointments/v1/products";

const wcAppointment = baseUrl + "/wp-json/wc-appointments/v1/appointments";

function convertTime12To24(time) {
  let hours   = Number(time.match(/^(\d+)/)[1]);
  let minutes = Number(time.match(/:(\d+)/)[1]);
  let AMPM    = time.match(/\s(.*)$/)[1];
  if (AMPM === "PM" && hours < 12) hours = hours + 12;
  if (AMPM === "AM" && hours === 12) hours = hours - 12;
  let sHours   = hours.toString();
  let sMinutes = minutes.toString();
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  return (sHours + ":" + sMinutes);
}



const useStyles = makeStyles((theme) => ({
  slotList: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 29,
    color: "var(--typo)",
  },
}));

const defaultSlots = {
  morning: [],
  afternoon: [],
  evening: [],
};

export default function AppointmentUpdate({ id }) {
  const router = useRouter()
  const { user } = useContext(UserContext);

  const token = user?.token;

  const classes = useStyles();

  const [submitLoader, setSubmitLoader] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [slots, setSlots] = useState(defaultSlots);
  const [maxDate, setMaxDate] = useState(addMonths(new Date(), 12));

  const appointmentSettings = useFormik({
    initialValues: {
      product_id: "",
      start_date_month: "",
      start_date_day: "",
      start_date_year: "",
    },
    onSubmit: (values) => verifyAvaibility(values),
    validationSchema: Yup.object({
      product_id: Yup.string().required("Product is Required"),
      start_date_month: Yup.string().required("Date is required"),
      start_date_day: Yup.string().required("Date is required"),
      start_date_year: Yup.string().required("Date is required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      product_id: "",
      customer_id: "",
      start_date_month: "",
      start_date_day: "",
      start_date_year: "",
      start_date_time: "",
      cost: "0",
      duration: "0",
    },
    onSubmit: (values) => createAppoinment(values),
    validationSchema: Yup.object({
      customer_id: Yup.string().required("Customer is Required"),
      product_id: Yup.string().required("Product is Required"),
      start_date_month: Yup.string().required("Date is required"),
      start_date_day: Yup.string().required("Date is required"),
      start_date_year: Yup.string().required("Date is required"),
      start_date_time: Yup.string().required("Time is Required"),
    }),
  });

  const createAppoinment = async (values) => {
    setSubmitLoader(true)
    try {
      await axios.post(`${appointmentApi}/${id}`,values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await router.replace('/calendar-menu/appointments-list')
    }catch (e) {

    }
    finally {
      setSubmitLoader(false)
    }
  }

  const verifyAvaibility = async (values) => {
    setSlots(defaultSlots)
    setLoadingSlots(true);
    try {
      const { data } = await axios.get(`${appointmentApi}/availability`, {
        params: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMaxDate(addDays(new Date(data.days.max), 1));
      setSlots({ ...slots, ...data.slots });
    } catch (e) {
    } finally {
      setLoadingSlots(false);
    }
  };

  const { data: productList } = useSWR(
      token ? [wcAppointmentApi, token] : null,
      genericFetch
  );

  const { data: customerList } = useSWR(
    token ? [`${woocomAPIUrl}/customers?per_page=100&page=1`, token] : null,
    genericFetch
  );

  const { data: appointment } = useSWR(
      token ? [`${wcAppointment}/${id}`, token] : null,
      genericFetch
  );

  useEffect(() => {
    if (appointment) {
      const date = new Date(appointment.start * 1000)
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      const time = convertTime12To24(appointment.time)
      appointmentSettings.setFieldValue("start_date_month", month);
      appointmentSettings.setFieldValue("start_date_day", day);
      appointmentSettings.setFieldValue("start_date_year", year);
      formik.setFieldValue("start_date_month", month);
      formik.setFieldValue("start_date_day", day);
      formik.setFieldValue("start_date_year", year);
      formik.setFieldValue("start_date_time", time);
      appointmentSettings.setFieldValue("appointmentDate", date);

      appointmentSettings.setFieldValue("product_id", appointment.product_id);
      formik.setFieldValue("product_id", appointment.product_id);
      formik.setFieldValue("customer_id", appointment.customer_id);


      setIsLoading(false)

      verifyAvaibility({
        "product_id": appointment.product_id,
        "start_date_month": month,
        "start_date_day": day,
        "start_date_year": year
      }).then()
    }
  }, [appointment]);

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    appointmentSettings.setFieldValue("start_date_month", month);
    appointmentSettings.setFieldValue("start_date_day", day);
    appointmentSettings.setFieldValue("start_date_year", year);
    formik.setFieldValue("start_date_month", month);
    formik.setFieldValue("start_date_day", day);
    formik.setFieldValue("start_date_year", year);
  }, []);

  const handleInputChange = async (e) => {
    await appointmentSettings.setFieldValue("product_id", e);
    await formik.setFieldValue("product_id", e);
    if (
      appointmentSettings.values.start_date_day !== "" &&
      appointmentSettings.values.start_date_year !== "" &&
      appointmentSettings.values.start_date_month !== ""
    ) {
      setSlots(defaultSlots);
      await appointmentSettings.submitForm();
    }
  };

  const handleDate = async (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    await appointmentSettings.setFieldValue("start_date_month", month);
    await appointmentSettings.setFieldValue("start_date_day", day);
    await appointmentSettings.setFieldValue("start_date_year", year);

    await formik.setFieldValue("start_date_month", month);
    await formik.setFieldValue("start_date_day", day);
    await formik.setFieldValue("start_date_year", year);

    await appointmentSettings.setFieldValue("appointmentDate", date);

    if (appointmentSettings.isValid) {
      setSlots(defaultSlots);
      await appointmentSettings.submitForm();
    }
  };

  const handleTime = async (time) => {
    await formik.setFieldValue("start_date_time", time);
  };

  const handleCustomer = async (customer_id) => {
    await formik.setFieldValue("customer_id", customer_id);
  };

  const createAppointment = async () => {
    await formik.submitForm();
  };
  
  return (
    <>
      <div css={AppointmentStyle} className="row create-appointment-container position-relative">
        {isLoading && <BlockUi color="var(--primary-color)" />}
        <div>
          <div className="d-flex justify-content-center">
            <div className="page-Title">
              <img
                src="/img/icon-movil/studio-menu/appointment-icon.svg"
                alt=""
              />{" "}
              Edit Appointment
            </div>
          </div>
          <div className="menu-container">
            <div className="options-container">
              <select
                value={appointmentSettings?.values?.product_id}
                name={"product_id"}
                onChange={(e) => handleInputChange(e.target.value)}
                className="custom-dropdownmenu"
              >
                <option value="">Select Product</option>
                {productList?.length &&
                  productList.map((c) => (
                    <option
                      key={c.id}
                      value={c.id}
                    >
                      {c.name}
                    </option>
                  ))}
              </select>
              {formik?.touched.product_id && formik?.errors.product_id && (
                <div className="invalid-feedback d-block">
                  {formik.errors.product_id}
                </div>
              )}
              <select
                value={formik?.values?.customer_id}
                name={"customer_id"}
                onChange={(e) => handleCustomer(e.target.value)}
                className="custom-dropdownmenu"
              >
                <option value="">Select Customer</option>
                {customerList?.length &&
                  customerList.map((c) => (
                    <option
                      key={c.id}
                      value={c.id}
                    >
                      {c.username}
                    </option>
                  ))}
              </select>

              {formik?.touched.customer_id && formik?.errors.customer_id && (
                <div className="invalid-feedback d-block">
                  {formik.errors.customer_id}
                </div>
              )}
            </div>

            <div className="custom-control custom-radio mb-5">
              <input
                className="custom-control-input"
                type="radio"
                id="calendaricon"
                checked
                readOnly
              />
              <label className="custom-control-label" htmlFor="calendaricon">
                <span>
                  Create a new corresponding order for this new appointment.
                  Please note The appointment will not be active until the order
                  is processed/completed.
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="calendar-container">
          <div>
            <Calendar
              inline
              dateFormat="MMM YYYY"
              onChange={handleDate}
              date={appointmentSettings?.values?.appointmentDate}
              minDate={new Date()}
              maxDate={maxDate}
            />
            {formik?.touched.start_date_month &&
              formik?.errors.start_date_month && (
                <div className="col-12">
                  <div className="invalid-feedback d-block">
                    {formik.errors.start_date_month}
                  </div>
                </div>
              )}
          </div>

          <div className="calendar-grid">
            <p className={"mb-0"}>
              Choose a date above to see available time slots.
            </p>
            <div className={classes.slotList}>Morning</div>
            <div className="slot-container">
              {loadingSlots ? (
                <Spinner animation="grow" variant="primary" />
              ) : null}
              {!loadingSlots && slots?.morning.length <= 0 ? (
                <Button variant="outlined" className="slot-item">
                  NA
                </Button>
              ) : null}
              {slots.morning.length > 0
                ? slots.morning.map((slots) => (
                    <Button
                      onClick={() => handleTime(slots.dataValue)}
                      key={slots.dataSlot}
                      variant="outlined"
                      className={`slot-active slot-item ${
                        formik.values.start_date_time === slots.dataValue
                          ? "active"
                          : ""
                      }`}
                    >
                      {slots.dataLabel}
                    </Button>
                  ))
                : null}
            </div>

            <div className={classes.slotList}>Afternoon</div>
            <div className="slot-container">
              {loadingSlots ? (
                <Spinner animation="grow" variant="primary" />
              ) : null}

              {!loadingSlots && slots?.afternoon <= 0 ? (
                <Button variant="outlined" className="slot-item">
                  NA
                </Button>
              ) : null}

              {slots.afternoon.length > 0
                ? slots.afternoon.map((slots) => (
                    <Button
                      key={slots.dataSlot}
                      onClick={() => handleTime(slots.dataValue)}
                      variant="outlined"
                      className={`slot-active slot-item ${
                        formik.values.start_date_time === slots.dataValue
                          ? "active"
                          : ""
                      }`}
                    >
                      {slots.dataLabel}
                    </Button>
                  ))
                : null}
            </div>

            <div className={classes.slotList}>Evening</div>

            <div className="slot-container">
              {loadingSlots ? (
                <Spinner animation="grow" variant="primary" />
              ) : null}
              {!loadingSlots && slots?.evening <= 0 ? (
                <Button variant="outlined" className="slot-item">
                  NA
                </Button>
              ) : null}

              {slots.evening.length > 0
                ? slots.evening.map((slots) => (
                    <Button
                      key={slots.dataSlot}
                      onClick={() => handleTime(slots.dataValue)}
                      variant="outlined"
                      className={`slot-active slot-item ${
                        formik.values.start_date_time === slots.dataValue
                          ? "active"
                          : ""
                      }`}
                    >
                      {slots.dataLabel}
                    </Button>
                  ))
                : null}
            </div>

            {formik?.touched.start_date_time && formik?.errors.start_date_time && (
              <div className="col-12">
                <div className="invalid-feedback d-block">
                  {formik.errors.start_date_time}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div css={AppointmentStyle}>
        <div className="button-container">
          <Button onClick={createAppointment} className="savebtn">
            {submitLoader && <Spinner animation="grow" variant="primary" />}
            Update
          </Button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { id },
  };
}
