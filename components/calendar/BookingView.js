import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import Avatar from "@material-ui/core/Avatar";
import VideocamIcon from "@material-ui/icons/Videocam";
import moment from "moment";
// import {calendarStyle} from './CalendarView.style'

import { css } from "@emotion/core";

export const calendarStyle = css`
.calendarBox{
  .rbc-month-view{
    border: 1px solid #181920; 
  }
  .rbc-month-header{
    border-top-left-radius: 4px;
  }
  .rbc-header{
    height: 60px;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #181920;
  }
  .rbc-header + .rbc-header{
    border-left: 1px solid #181920;
  }
  .rbc-day-bg + .rbc-day-bg{
    // border-left: 1px solid #181920;
  }
  .rbc-row-bg{
    .rbc-off-range-bg{
      background: rgba(29, 51, 91, 0.49);
    }
  }
  .rbc-event{
    background: #324776;
  }
  .rbc-day-bg{
    &.rbc-today{
      background: transparent
    }
  }
  .rbc-row{
    .rbc-now{
      &.rbc-current{
        .rbc-button-link{
            width: 37px;
            height: 37px;
            color: #fff;
            border-radius: 100%;
            background: linear-gradient(125.11deg, #00E0FC -16.42%, #FF73F8 59.72%, #F5D1B5 100.27%);
            box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.0821405);
        }
      }
    }
  }
}

.booking-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
}

.buttons-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media (min-width: 576px) {
    flex-direction: row;
  }
}
.cancelAppointment {
  width: 100%;
  padding: 0 15px;
  border-radius: 17px;
  height: 34px;
  background-color: #F3215E;
  border: 1px solid #F3215E;
  color:#fff;
  span {
    white-space: nowrap;
    font-weight: bold;
  }
  @media (min-width: 576px) {
    width: 100%;
  }
}
.makeACallBtn {
  width: 100%;
  padding: 0 15px;
  border-radius: 17px;
  height: 34px;
  background-color: transparent;
  border: 1px solid #fff;
  color:#fff;
  span {
    white-space: nowrap;
    font-weight: bold;
  }
  @media (min-width: 576px) {
    width: 100%;
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
  gap: 10px;
}

.profile-info {
  padding: 0;
}
`;

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
    padding: "15px",
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

  bookingProfile: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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
  profileName: {
    paddingTop: 1,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "17.5px",
    color: "#fff",
    fontFamily: "Quicksand",
    marginBottom: "5px",
  },
  bookingDateTime: {
    fontWeight: 300,
    fontSize: 16,
    lineHeight: "17.5px",
    color: "#fff",
    fontFamily: "Quicksand",
  },
}));

function BookingView(props) {
  const classes = useStyles();
  const b = props.values;
  const formatDate = (date, format) => moment(date).format(format);

  return (
    <div className="col-12 mb-4" css={calendarStyle}>
      <div className={classes.bookingContainer}>
        <div className="booking-container">
          <div className="bookingAvatarProfile">
            <Avatar alt={b?.staff} src="/static/images/avatar/3.jpg" />
            <div className="profile-info">
              <div className={classes.profileName}>{b?.appointment}</div>
              <h5 className={classes.bookingDateTime}>
                {formatDate(b?.dateCreated, "MMMM D YYYY")} &#183;{" "}
                {formatDate(b?.dateCreated, "hh:ss A")}
                {/* to{" "} {formatDate(b.endDate, "hh:ss A")} */}
              </h5>
            </div>
          </div>
          <div className="mobile-style buttons-container">
            <Button variant="contained" className="cancelAppointment">
              Start Meeting
            </Button>

            <Link href={"/dashboard/meetings"}>
              <Button variant="contained" className="makeACallBtn">
                Reschedule
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingView;
