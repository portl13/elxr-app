import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import { makeStyles } from "@material-ui/core/styles";

import { css } from "@emotion/core";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import AppointmentModal from "@components/calendar/AppointmentModal";
import BlockUi from "@components/ui/blockui/BlockUi";
import CalendarView from "@components/calendar/CalendarView";

export const calendarStyle = css`
  .calendarBox {
    .rbc-month-view {
      border: 1px solid #181920;
    }
    .rbc-month-header {
      border-top-left-radius: 4px;
    }
    .rbc-header {
      height: 60px;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #181920;
    }
    .rbc-header + .rbc-header {
      border-left: 1px solid #181920;
    }
    .rbc-day-bg + .rbc-day-bg {
      // border-left: 1px solid #181920;
    }
    .rbc-row-bg {
      .rbc-off-range-bg {
        background: rgba(29, 51, 91, 0.49);
      }
    }
    .rbc-event {
      background: #324776;
    }
    .rbc-day-bg {
      &.rbc-today {
        background: transparent;
      }
    }
    .rbc-row {
      .rbc-now {
        &.rbc-current {
          .rbc-button-link {
            width: 37px;
            height: 37px;
            color: #fff;
            border-radius: 100%;
            background: linear-gradient(
              125.11deg,
              #00e0fc -16.42%,
              #ff73f8 59.72%,
              #f5d1b5 100.27%
            );
            box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.0821405);
          }
        }
      }
    }
  }
  .makeACallBtn {
    width: 100%;
    padding: 0 15px;
    border-radius: 17px;
    height: 34px;
    background-color: transparent;
    border: 1px solid #fff;
    color: #fff;
    span {
      white-space: nowrap;
    }
    @media (min-width: 576px) {
      width: 100%;
    }
  }

  .page-Title {
    background: rgba(29, 51, 91, 0.48);
    height: 50px;
    width: 100%;
    max-width: 323px;
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
    img {
      margin-right: 10px;
    }
  }
`;

const appointmentApi = process.env.baseUrl + "/wp-json/appointment/v1/appointment?all&length=100";

const useStyles = makeStyles((theme) => ({
  activeView: {
    padding: "5px 16px",
    marginLeft: 10,
    marginRight: 10,
    background:
      "linear-gradient(91.18deg, #00E0FC 0.58%, #FF73F8 49.44%, #F5D1B5 99.17%)",
    borderRadius: "40px",
  },
  inactiveView: {
    marginLeft: "10px",
    marginRight: "10px",

    fontFamily: "Quicksand",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "14px",
    lineHeight: "18px",

    textAlign: "center",

    color: "#313131",
  },
  calendarView: {
    // background: "#fff",
    borderRadius: "10px",
    padding: "10px",
  },
  bookingActiveBtn: {
    border: "1px solid #313131",
    color: "#313131",
    marginRight: "20px",
    borderRadius: "40px",
  },
  bookingInactiveBtn: {
    border: "1px solid #ababab",
    color: "#313131",
    marginRight: "20px",
    borderRadius: "40px",
  },
  cancelAppointment: {
    width: "100%",
    borderRadius: "40px",
  },
  bookingProfile: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  makeACallBtn: {
    width: "100%",
    left: "0%",
    right: "0%",
    top: "0%",
    bottom: "0%",
    color: "#ffffff",
    background:
      "linear-gradient(106.26deg, #00E0FC -20.69%, #FF73F8 59.13%, #F5D1B5 101.63%)",
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.0821405)",
    backdropFilter: "blur(27.1828px)",
    borderRadius: "40px",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: "10px",
  },
  availabilityBtn: {
    background: "#2166E3",
    color: "#ffffff",
    borderRadius: "40px",
  },
  bookingContainer: {
    borderRadius: 10,
    background: "rgba(29, 51, 91, 0.49)",
    padding: "30px 45px 30px 35px",
  },
  bookingAvatarProfile: {
    display: "flex",
    alignItems: "stretch",
  },
  profileName: {
    paddingTop: 13,
    paddingLeft: 5,
    marginBottom: 20,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "17.5px",
  },
  bookingDateTime: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "17.5px",
    marginBottom: 20,
  },
  bookingHeading: {
    fontFamily: "Quicksand",
    fontWeight: 300,
    fontSize: "26px",
    color: "var(--typo)",
  },
}));

function Calendar() {
  const { user } = useContext(UserContext);
  const token = user?.token;

  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [myEventsList, setMyEventsList] = useState([]);

  const [open, setOpen] = useState(false);
  const [appointment, setAppointment] = useState();

  const { data, error } = useSWR(
    token ? [appointmentApi, token] : null,
    genericFetch
  );

  useEffect(() => {
    if (data) {
      const appointments = data.map((appointment) => {
        return {
          ...appointment,
          id: appointment.id,
          orderId: appointment.order_id,
          title: `${appointment.customer_name} - ${appointment.start_time} to ${appointment.end_time}`,
          start: new Date(appointment.start * 1000),
          end: new Date(appointment.end * 1000),
        };
      });
      setMyEventsList(appointments);
      setIsLoading(false)
    }
  }, [data]);


  const onHide = () => {
    setOpen(!open);
    setAppointment(null);
  };

  const setAppointmentAndOpen = (appointment) => {
    setAppointment(appointment);
    setOpen(true);
  };

  return (
    <>
      <div  className="row position-relative">
        {isLoading && <BlockUi color="var(--primary-color)" />}
        <div className="col-12">
          <div className={classes.calendarView}>

              <CalendarView
                setAppointment={setAppointmentAndOpen}
                myEventsList={myEventsList}
              />


          </div>
        </div>
      </div>
      {open ? (
        <AppointmentModal
          show={open}
          onHide={onHide}
          appointment={appointment}
        />
      ) : null}
    </>
  );
}

export default Calendar;
