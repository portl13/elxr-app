import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { addDays, addMonths } from "date-fns";
import axios from "axios";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { Button } from "@material-ui/core";
import {useRouter} from "next/router";
import {useCartMutation} from "@context/CartContext";

const baseUrl = process.env.baseUrl;

const appointmentApi = baseUrl + "/wp-json/appointment/v1/appointment";

const defaultSlots = {
  morning: [],
  afternoon: [],
  evening: [],
};

function AppointmentProduct({ product, id }) {
  const router = useRouter()
  const { addProduct } = useCartMutation();
  const [maxDate, setMaxDate] = useState(addMonths(new Date(), 12));
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slots, setSlots] = useState(defaultSlots);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [booking, setBooking] = useState({});
  const [time, setTime] = useState("");

  const verifyAvaibility = async (values) => {
    setLoadingSlots(true);
    try {
      const { data } = await axios.get(`${appointmentApi}/availability`, {
        params: values,
      });
      setMaxDate(addDays(new Date(data.days.max), 1));
      setSlots({ ...slots, ...data.slots });
    } catch (e) {
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDate = async (date) => {
    setSlots(defaultSlots);
    setCurrentDate(date);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const values = {
      product_id: id,
      start_date_month: month,
      start_date_day: day,
      start_date_year: year,
    };
    setBooking(values);
    await verifyAvaibility(values);
  };

  const handleTime = (value) => {
    setBooking({ ...booking, start_date_time: value });
    setTime(value);
  };

  const bookNow = (product) => {
    addProduct({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      appointment: booking
    });

    router.push("/page-checkout");
  };

  const ifAvailable =
    slots.morning.length > 0 ||
    slots.afternoon.length > 0 ||
    slots.evening.length > 0;

  const isValid =
    Object.keys(time).length > 0 && Object.keys(booking).length > 0;

  return (
    <section className={"product-detail"}>
      <article>
        <img
          src={
            product.images.map((d) => d.src)[0] === undefined
              ? `${process.env.baseUrl}/wp-content/uploads/woocommerce-placeholder-150x150.png`
              : product.images.map((d) => d.src)[0]
          }
          alt={product.name}
        />
        <h3 className={"mt-4 mb-3 font-size-22"}>Description</h3>
        <p dangerouslySetInnerHTML={{ __html: product.description }} />
      </article>
      <article className={"product-detail-body"}>
        <h1 className={"product-detail-title"}>{product.name}</h1>
        <p dangerouslySetInnerHTML={{ __html: product.price_html }} />
        <div className="product-detail-calendar">
          <Calendar
            inline
            dateFormat="MMM YYYY"
            onChange={handleDate}
            date={currentDate}
            minDate={new Date()}
            maxDate={maxDate}
          />
        </div>
        <p className={"my-4"}>
          Choose a date above to see available time slots.
        </p>
        <div className={"d-flex justify-content-center"}>
          {loadingSlots ? <SpinnerLoader /> : null}
        </div>
        {ifAvailable ? (
          <>
            <ul className={"slots-header"}>
              <li className={"text-center"}>Morning</li>
              <li className={"text-center"}>Afternoon</li>
              <li className={"text-center"}>Evening</li>
            </ul>
            <div className={"slots-header mb-4"}>
              <div className={"text-center"}>
                {slots.morning.length <= 0 ? "-" : null}
                <div className="slots-container">
                  {slots.morning.length > 0
                    ? slots.morning.map((slots) => (
                        <button
                          onClick={() => handleTime(slots.dataValue)}
                          key={slots.dataSlot}
                          className={`slot-active slot-item ${
                            time === slots.dataValue ? "active" : null
                          }`}
                        >
                          {slots.dataLabel}
                        </button>
                      ))
                    : null}
                </div>
              </div>
              <div className={"text-center"}>
                {slots.afternoon.length <= 0 ? "-" : null}
                <div className="slots-container">
                  {slots.afternoon.length > 0
                    ? slots.afternoon.map((slots) => (
                        <button
                          key={slots.dataSlot}
                          onClick={() => handleTime(slots.dataValue)}
                          className={`slot-active slot-item ${
                            time === slots.dataValue ? "active" : null
                          }`}
                        >
                          {slots.dataLabel}
                        </button>
                      ))
                    : null}
                </div>
              </div>
              <div className={"text-center"}>
                {slots.evening.length <= 0 ? "-" : null}
                <div className="slots-container">
                  {slots.evening.length > 0
                    ? slots.evening.map((slots) => (
                        <button
                          key={slots.dataSlot}
                          onClick={() => handleTime(slots.dataValue)}
                          className={`slot-active slot-item ${
                            time === slots.dataValue ? "active" : null
                          }`}
                        >
                          {slots.dataLabel}
                        </button>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className="d-flex justify-content-end">
          <button
            onClick={() => bookNow(product)}
            disabled={!isValid}
            className={"btn btn-primary border-radius-35"}
          >
            Book Now
          </button>
        </div>
      </article>
    </section>
  );
}

export default AppointmentProduct;
