import React, { useState } from "react";
import Head from "next/head";
import { Calendar } from "react-date-range";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { makeStyles } from "@material-ui/core/styles";
import TimePicker from "rc-time-picker";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import "rc-time-picker/assets/index.css";

import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
// import {setAvailabilityStyle} from './set-availability.style'
import { css } from "@emotion/core";

export const setAvailabilityStyle = css`
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
  .availablity-form {
    position: relative;
    width: 100%;
    .time-outer-box {
      position: relative;
      width: 100%;
      margin-bottom: 15px;
      @media (min-width: 758px) {
        margin-bottom: 0;
      }
      .rc-time-picker {
        width: 100%;
        .rc-time-picker-input {
          background: rgba(29, 51, 91, 0.48);
          border-radius: 22px;
          height: 54px;
          font-family: "Quicksand";
          font-style: normal;
          font-weight: 300;
          font-size: 10px;
          line-height: 12px;
          /* identical to box height */
          color: #fff;
          border: 0;
          padding-left: 30px;
          &::-moz-placeholder {
            color: #fff;
          }

          &:-ms-input-placeholder {
            color: #fff;
          }

          &::-webkit-input-placeholder {
            color: #fff;
          }

          &::placeholder {
            color: #fff;
          }
        }
        .rc-time-picker-clear {
          position: absolute;
          right: 40px;
          top: 14px;
        }
      }
      .time-icon {
        position: absolute;
        right: 15px;
        top: 15px;
      }
    }
    .saveBtn {
      background: #f3215e;
      border-radius: 17px;
      width: 119px;
      color: #fff;
      text-transform: capitalize;
    }
  }
  .MuiSwitch-switchBase{
    color: #383567 !important;
  }
  .MuiSwitch-track{
    background-color: #fff !important;
  }
  .MuiCheckbox-colorPrimary.Mui-checked{
    color: rgba(0, 0, 0, 0.54) !important;
  }
  .MuiSwitch-colorPrimary.Mui-checked{
    color: #383567 !important;
  }
  .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track{
    background-color: #fff !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "100%",
    maxWidth: 506,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
  closeBtn: {
    cursor: "pointer",
    color: "#141414",
  },
  modalTitle: {
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 20,
  },
  setDaily: {
    fontSize: 16,
    fontFamily: "Quicksand",
    fontWeight: 300,
    fontSize: 14,
    color: "#FFFFFF",
  },
  setDailyDesc: {
    fontSize: 16,
    fontFamily: "Quicksand",
    fontWeight: 300,
    fontSize: 14,
    color: "#FFFFFF",
  },
  dailyTimeFormInput: {
    width: "100%",
    borderRadius: 40,
    padding: "5px 10px",
    background: "#F6F6F6",
  },
  timeFormInput: {
    width: "100%",
    borderRadius: 40,
    padding: 10,
    background: "#F6F6F6",
  },
  defineDuration: {
    fontSize: 16,
    fontFamily: "Quicksand",
    fontWeight: 300,
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 14,
  },
  slotFormInput: {
    width: "100%",
    borderRadius: 40,
    padding: 10,
    background: "#F6F6F6",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  exceptionalDates: {
    color: "#FF5E54",
    fontFamily: "Quicksand",
    fontWeight: 300,
    fontSize: 14,
  },
  exceptionalDatesDesc: {
    fontFamily: "Quicksand",
    fontWeight: 300,
    fontSize: 14,
  },

  saveBtn: {
    // width: "100%",
    // paddingTop: 21,
    // paddingBottom: 21,
    borderRadius: 40,
    fontSize: 15,
    fontWeight: 700,
    color: "#000000",
  },
}));

export default function SetAvailabilityPage() {
  const classes = useStyles();

  const [dailyAvailability, setDailyAvailability] = useState(false);
  const [slotDuration, setSlotDuration] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [isExceptional, setIsExceptional] = useState(false);
  const [exceptionalDates, setExceptionalDates] = useState();
  const [dailyAvailValue, setDailyAvailValue] = useState([
    {
      id: "monday",
      label: "Monday",
      status: false,
      start: "",
      end: "",
    },
    {
      id: "tuesday",
      label: "Tuesday",
      status: false,
      start: "",
      end: "",
    },
    {
      id: "wednesday",
      label: "Wednesday",
      status: false,
      start: "",
      end: "",
    },
    {
      id: "thursday",
      label: "Thursday",
      status: false,
      start: "",
      end: "",
    },
    {
      id: "friday",
      label: "Friday",
      status: false,
      start: "",
      end: "",
    },
    {
      id: "saturday",
      label: "Saturday",
      status: false,
      start: "",
      end: "",
    },
    {
      id: "sunday",
      label: "Sunday",
      status: false,
      start: "",
      end: "",
    },
  ]);

  const handleAvailCheckEvent = (event, key, type) => {
    const newValue = dailyAvailValue;
    switch (type) {
      case "checkbox":
        newValue[key][event.target.name] = event.target.checked;
        break;
      case "time":
        // newValue[key][event.target.name] = event.target.value;
        break;
    }
    setDailyAvailValue(newValue);
  };

  return (
    <>
      <Head>
        <title>Set Availability</title>
      </Head>
      <MainLayout sidebar={<MainSidebar />}>
        <BackButton />
        <div
          className="d-flex justify-content-center"
          css={setAvailabilityStyle}
        >
          <div className="page-Title">
            <img src="/img/icon-movil/studio-menu/schedule.svg" alt="" /> Set
            Availability
          </div>
        </div>
        <div className="row" css={setAvailabilityStyle}>
          <div className="col-sm-6 col-lg-4 offset-sm-3 offset-lg-4">
            <form className="availablity-form" noValidate>
              <div className="row">
                <div className="col-12 mb-2">
                  <div className={classes.setDaily}>Set Daily Availability</div>
                </div>
                <div className="col-sm-6">
                  <div className="time-outer-box">
                    <TimePicker
                      placeholder="Start Time"
                      className="time-slot-input"
                      defaultValue={startTime}
                      use12Hours
                      showSecond={false}
                      focusOnOpen
                      format="hh:mm A"
                    />
                    <img
                      className="time-icon"
                      src="/img/time-icon.png"
                      alt="time"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="time-outer-box">
                    <TimePicker
                      placeholder="End Time"
                      className="time-slot-input"
                      defaultValue={endTime}
                      use12Hours
                      showSecond={false}
                      focusOnOpen
                      format="hh:mm A"
                    />
                    <img
                      className="time-icon"
                      src="/img/time-icon.png"
                      alt="time"
                    />
                  </div>
                </div>
                <div className="col-sm-8 mt-4">
                  <div className={classes.setDaily}>Set Daily Availability</div>
                  <div className={classes.setDailyDesc}>
                    Define schedule for each day of the week
                  </div>
                </div>
                <div className="col-sm-4 text-right">
                  <Switch
                    checked={dailyAvailability}
                    onChange={(event) => {
                      setDailyAvailability(event.target.checked);
                    }}
                    color="primary"
                    name="dailyAvailability"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </div>
              </div>
              {dailyAvailability && (
                <div className="row each-day-row">
                  {dailyAvailValue.map((item, index) => (
                    <>
                      <div className="col-sm-4 mb-2">
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="status"
                              color="primary"
                              icon={<CircleUnchecked />}
                              checkedIcon={<CircleCheckedFilled />}
                            />
                          }
                          label={item.label}
                          onClick={(event) => {
                            handleAvailCheckEvent(event, index, "checkbox");
                          }}
                        />
                      </div>
                      <div className="col-sm-4">
                        <div className="time-outer-box">
                          <TimePicker
                            placeholder="Start Time"
                            className="time-slot-input"
                            defaultValue={item.start}
                            onChange={(event) => {
                              handleAvailCheckEvent(event, index, "time");
                            }}
                            use12Hours
                            showSecond={false}
                            focusOnOpen
                            format="hh:mm A"
                          />
                          <img
                            className="time-icon"
                            src="/img/time-icon.png"
                            alt="time"
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="time-outer-box">
                          <TimePicker
                            placeholder="End Time"
                            className="time-slot-input"
                            defaultValue={item.end}
                            onChange={(event) => {
                              handleAvailCheckEvent(event, index, "time");
                            }}
                            use12Hours
                            showSecond={false}
                            focusOnOpen
                            format="hh:mm A"
                          />
                          <img
                            className="time-icon"
                            src="/img/time-icon.png"
                            alt="time"
                          />
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              )}
              <div className="row mt-4 mb-3">
                <div className="col-12">
                  <div className={classes.defineDuration}>
                    Define Duration for each slot
                  </div>
                  <div className="time-outer-box">
                    <TimePicker
                      placeholder="Slot"
                      className="time-slot-input"
                      defaultValue={slotDuration}
                      onChange={(event) => {
                        console.log("event", event);
                        // setSlotDuration(event.target.value);
                      }}
                      showSecond={false}
                      focusOnOpen
                      format="hh:mm"
                    />
                    <img
                      className="time-icon"
                      src="/img/time-icon.png"
                      alt="time"
                    />
                  </div>
                </div>
                <div className="col-8 mt-3">
                  <div className={classes.exceptionalDates}>
                    Set Exceptional Dates
                  </div>
                  <div className={classes.exceptionalDatesDesc}>
                    Select date(s) you are unavailable on
                  </div>
                </div>
                <div className="col-4 text-right mt-3">
                  <Switch
                    checked={isExceptional}
                    onChange={(event) => {
                      setIsExceptional(event.target.checked);
                    }}
                    color="primary"
                    name="isExceptional"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </div>
                {isExceptional && (
                  <div className="col-12 text-center">
                    <Calendar
                      onChange={(item) => setExceptionalDates(item)}
                      date={exceptionalDates}
                    />
                  </div>
                )}
                <div className="col-12 mt-4 mb-4 text-right">
                  <Button variant="contained" className="saveBtn">
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
