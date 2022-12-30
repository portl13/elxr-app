import React, { useContext, useState } from "react";
import { UserContext } from "@context/UserContext";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { css } from "@emotion/core";

export const calendarStyle = css`
.calendar-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(190,233,241,0.2);
  @media (max-width: 576px) {
    margin-bottom: 20px;
  }
}
.calendar-label-container {
  width: calc(100% - 80px);
}
.calendar-label {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-transform: uppercase;
  color: #000;
}
.calendarBox {
  .rbc-month-view {
    border: 1px solid rgba(181, 181, 174, 0.2);
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
  }
  .rbc-row-content {
    z-index: 2;
  }
  .rbc-date-cell {
    text-align: center;
    padding: 12px 0 5px !important;
  }
  .rbc-header {
    height: 60px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(181, 181, 174, 0.2);
    text-transform: uppercase;
    color: #000;
  }
  .rbc-header + .rbc-header {
    border-left: 1px solid rgba(181, 181, 174, 0.2);
  }
  .rbc-row-bg {
    .rbc-off-range-bg {
      background: transparent;
    }
  }
  .rbc-event {
    background: #324776;
  }
  .rbc-day-bg {
    &.rbc-today{
      background: transparent
    }
  }
  .rbc-row{
    .rbc-date-cell {
      .rbc-button-link {
        color: #000;
      }
    }
    .rbc-off-range {
      .rbc-button-link {
        color: #999;
      }
    }
    .rbc-current {
      .rbc-button-link {
        width: 37px;
        height: 37px;
        color: #fff;
        margin-top: -10px;
        border-radius: 100%;
        background: linear-gradient(125.11deg, #00E0FC -16.42%, #FF73F8 59.72%, #F5D1B5 100.27%);
        box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.0821405);
      }
    }
  }
}
.cancelAppointment {
  width: 49%;
  border-radius: 17px;
  height: 34px;
  background-color: #F3215E;
  font-size: 14px;
  color:#fff;
  margin-right: 10px;
  padding: 0;
  @media (min-width: 576px) {
    width: 100%;
    max-width: 250px;
  }
}
.makeACallBtn {
  width: 49%;
  color: #ffffff;
  background: transparent;
  border-radius: 17px;
  border: 1px solid #fff;
  height: 34px;
  @media (min-width: 576px) {
    width: 100%;
    max-width: 250px;
  }
}
.page-Title {
  background: rgba(29, 51, 91, .48);
  height: 50px;
  width: 100%;
  max-width: 323px;
  border-radius: 22px;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  /* identical to box height */
  color: #FFFFFF;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
  img{
    margin-right: 10px;
  }
}
.bookingAvatarProfile {
  display: flex;
  .profile-info {
    padding-top: 10px;
    padding-left: 10px;
    width: calc(100% - 40px)
  }
}
`;

const woocomAppointAPIUrl = process.env.woocomAppointApi;

const localizer = momentLocalizer(moment);

function CalendarView({ myEventsList, setAppointment }) {
    const { user } = useContext(UserContext);
    const token = user?.token;
    const views = {
        month: true,
        week: true,
    };

    const handleSelect = () => {
        console.log("-----handleSelect", e);
    };
    const handleSelectedEvent = (e) => {
        setAppointment(e)
        //console.log("-----handleSelectedEvent", e.orderId);
        //Router.push("/dashboard/order/" + e.orderId);
    };

    return (
        <div css={calendarStyle}>
            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    className="calendarBox"
                    defaultDate={moment().toDate()}
                    style={{ height: 800 }}
                    views={views}
                    components={{ toolbar: CustomToolbar }}
                    onSelectSlot={(e) => handleSelect(e)}
                    onSelectEvent={(e) => handleSelectedEvent(e)}
                />
            </div>
        </div>
    );
}

function CustomToolbar(toolbar) {
    const [viewState, setViewState] = useState("month");

    const goToBack = () => {
        if (toolbar.view === "week") {
            const mDate = toolbar.date;
            const newDate = new Date(
                mDate.getFullYear(),
                mDate.getMonth(),
                mDate.getDate() - 7,
                1
            );
            toolbar.onNavigate("prev", newDate);
        } else {
            toolbar.date.setMonth(toolbar.date.getMonth() - 1);
            toolbar.onNavigate("prev");
        }
    };

    const goToNext = () => {
        if (toolbar.view === "week") {
            const mDate = toolbar.date;
            const newDate = new Date(
                mDate.getFullYear(),
                mDate.getMonth(),
                mDate.getDate() + 7,
                1
            );
            toolbar.onNavigate("prev", newDate);
        } else {
            toolbar.date.setMonth(toolbar.date.getMonth() + 1);
            toolbar.onNavigate("next");
        }
    };

    // const goToCurrent = () => {
    //   const now = new Date();
    //   toolbar.date.setMonth(now.getMonth());
    //   toolbar.date.setYear(now.getFullYear());
    //   toolbar.onNavigate("current");
    // };

    const goToWeekView = () => {
        toolbar.onView("week");
        setViewState("week");
    };
    const goToMonthView = () => {
        toolbar.onView("month");
        setViewState("month");
    };

    const label = () => {
        if (toolbar.view === "week") {
            const labelSplit = toolbar.label.split(" ");
            let labelDisplay = toolbar.label;
            if (labelSplit?.length && labelSplit.length === 4) {
                labelDisplay = `${labelSplit[1]} ${labelSplit[0]} - ${labelSplit[3]} ${labelSplit[0]}`;
            }
            return (
                <span className="calendar-label">
          {labelDisplay}
        </span>
            );
        }
        const date = moment(toolbar.date);
        return (
            <span className="calendar-label">
        {date.format("MMMM")} {date.format("YYYY")}
      </span>
        );
    };

    return (
        <div className="row align-item-center mb-3">
            <div className="col-sm-12 text-center text-lg-center">
        <span
            style={{ fontSize: "34px", cursor: "pointer", color: "#313131" }}
            onClick={goToBack}
        >
          &#8249;
        </span>
                {/* <button  onClick={goToCurrent}>
          today
        </button> */}
                <label className="calendar-label-container mx-4">{label()}</label>
                <span
                    onClick={goToNext}
                    style={{ fontSize: "34px", cursor: "pointer", color: "#313131" }}
                >
          &#8250;
        </span>
            </div>
            {/* <div className="col-sm-4 d-flex calander-btn">
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={goToMonthView}
            style={
              viewState === "month"
                ? {
                    color: "#000",
                    background: "#243f7e",
                    borderTopLeftRadius: "40px",
                    borderBottomLeftRadius: "40px",
                  }
                : {
                    background: "#000",
                    color: "#fff",
                    borderTopLeftRadius: "40px",
                    borderBottomLeftRadius: "40px",
                  }
            }
          >
            Month
          </Button>
          <Button
            variant="contained"
            onClick={goToWeekView}
            style={
              viewState === "week"
                ? {
                    color: "#000",
                    background: "#243f7e",
                    borderTopRightRadius: "40px",
                    borderBottomRightRadius: "40px",
                  }
                : {
                    background: "#000",
                    borderTopRightRadius: "40px",
                    borderBottomRightRadius: "40px",
                    color: "#fff",
                  }
            }
          >
            Week
          </Button>
        </div>
      </div> */}
        </div>
    );
}

export default CalendarView;
