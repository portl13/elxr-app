import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import moment from "moment";
function Billing({ subscriberData }) {
  const [trialDate, setTrialDate] = useState();
  const [nextDate, setNextDate] = useState();
  const [endDate, setEndDate] = useState();
  const [trialMin, setTrialMin] = useState();
  const [trialHour, setTrialHour] = useState();
  const [nextMin, setNextMin] = useState();
  const [nextHour, setNextHour] = useState();
  useEffect(() => {
    if (subscriberData.subscription_status !== "cancelled") {
      var trial = new Date();
      setTrialDate(moment(trial).format("YYYY-MM-DD"));
      setNextDate(moment(trial).format("YYYY-MM-DD"));
      setTrialMin(trial.getMinutes());
      setTrialHour(trial.getHours());
      setNextMin(trial.getMinutes());
      setNextHour(trial.getHours());
    }
  }, []);

  return (
    <>
      <div className="billing-wrapper">
        <div className="overview-section">
          <div className="overview-panel">
            <div className="left-panel">Recurring:</div>
            {subscriberData.subscription_status === "cancelled" ? (
              <div className="right-panel">every moth</div>
            ) : (
              <div className="right-panel">
                <Input type="select">
                  <option value="1">every</option>
                  <option value="2">every 2nd</option>
                  <option value="3">every 3rd</option>
                  <option value="4">every 4th</option>
                  <option value="5">every 5th</option>
                  <option value="6">every 6th</option>
                </Input>
                <Input type="select">
                  <option value="day">day</option>
                  <option value="week">week</option>
                  <option value="month">month</option>
                  <option value="year">year</option>
                </Input>
              </div>
            )}
          </div>
          <div className="overview-panel">
            <div className="left-panel">Start Date:</div>
            <div className="right-panel">
              {moment(subscriberData.order_date).format("MMMM DD,YYYY")}
            </div>
          </div>
          <div className="overview-panel">
            <div className="left-panel">Trial End:</div>
            {subscriberData.subscription_status === "cancelled" ? (
              <div className="right-panel">-</div>
            ) : (
              <div className="right-panel">
                <input className="date-range" type="text" value={trialDate} />
                <span>@</span>
                <input className="time-range" type="text" value={trialHour} />
                <span>:</span>
                <input className="time-range" type="text" value={trialMin} />
              </div>
            )}
          </div>
          <div className="overview-panel">
            <div className="left-panel">Next Payment:</div>
            {subscriberData.subscription_status === "cancelled" ? (
              <div className="right-panel">-</div>
            ) : (
              <div className="right-panel">
                <input className="date-range" type="text" value={nextDate} />
                <span>@</span>
                <input className="time-range" type="text" value={nextHour} />
                <span>:</span>
                <input className="time-range" type="text" value={nextMin} />
              </div>
            )}
          </div>
          {subscriberData.subscription_status === "cancelled" && (
            <div className="overview-panel">
              <div className="left-panel">Cancelled Date:</div>
              <div className="right-panel">
                {moment(subscriberData.order_date).format("MMMM DD,YYYY")}
              </div>
            </div>
          )}
          <div className="overview-panel">
            <div className="left-panel">End Date:</div>
            {subscriberData.subscription_status === "cancelled" ? (
              <div className="right-panel">
                {moment(subscriberData.order_date).format("MMMM DD,YYYY")}
              </div>
            ) : (
              <div className="right-panel">
                <input className="date-range" placeholder="YYYY-MM-DD" />
                <span>@</span>
                <input className="time-range" placeHolder="HH" />
                <span>:</span>
                <input className="time-range" placeholder="MM" />
              </div>
            )}
          </div>
          <div className="overview-panel">
            <div className="left-panel">Timezone:</div>
            <div className="right-panel">
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </div>
          </div>
          {subscriberData.subscription_status !== "cancelled" && (
            <div className="btn-group">
              <button type="">Update</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Billing;
