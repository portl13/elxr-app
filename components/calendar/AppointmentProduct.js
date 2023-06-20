import React, { useContext, useEffect, useState } from "react"
import { Calendar } from "react-date-range"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css"
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
  startOfMonth,
  subHours,
} from "date-fns"
import axios from "axios"
import SpinnerLoader from "@components/shared/loader/SpinnerLoader"
import { useRouter } from "next/router"
import { useCartMutation } from "@context/CartContext"
import { Alert } from "reactstrap"

import jstz from "jstz"
import { format as formatTimezone } from "date-fns-tz"

import moment from "moment-timezone"
import { objectify } from "radash"
import { UserContext } from "@context/UserContext"

const currentTimezone = jstz.determine().name()

const baseUrl = process.env.baseUrl

const appointmentApi = baseUrl + "/wp-json/appointment/v1/appointment"

const defaultSlots = {
  morning: [],
  afternoon: [],
  evening: [],
}

const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0
}

const restrictedDaysObject = [
  { value: "0", fn: isSunday },
  { value: "1", fn: isMonday },
  { value: "2", fn: isTuesday },
  { value: "3", fn: isWednesday },
  { value: "4", fn: isThursday },
  { value: "5", fn: isFriday },
  { value: "6", fn: isSaturday },
]

const getAllRestrictedDays = (date, filters = [], dates = []) => {
  if (filters.length === 0) {
    return dates
  }
  let start = null
  let end = null
  let days = []
  if (dates.length === 0) {
    const min = new Date()
    start = startOfMonth(min)
    end = endOfMonth(new Date(date))
    days = eachDayOfInterval({ start, end })
  }

  if (dates.length > 0) {
    days = dates
  }

  const internalFilter = filters
  const fil = internalFilter.pop()
  const daysFilters = days.filter((day) => !fil.fn(day))

  return getAllRestrictedDays(date, internalFilter, daysFilters)
}

export const getFormatWhitTimezone = (
  date,
  formats,
  currentUtc,
  currentTimezone
) => {
  const newDate = date
  return formatTimezone(newDate, formats, { currentTimezone })
}

const timeZoneHorus = (slots, currentUtc) => {
  const afternoon = slots?.afternoon?.map((value) => {
    const dateHours = new Date(
      `2000-01-01T${
        value?.dataValue.length === 4
          ? `0${value?.dataValue}${currentUtc}`
          : `${value?.dataValue}${currentUtc}`
      }`
    )
    return {
      ...value,
      dataLabel: getFormatWhitTimezone(
        dateHours,
        "h:mm a",
        currentUtc,
        currentTimezone
      ),
    }
  })
  const evening = slots?.evening?.map((value) => {
    const dateHours = new Date(
      `2000-01-01T${
        value?.dataValue.length === 4
          ? `0${value?.dataValue}${currentUtc}`
          : `${value?.dataValue}${currentUtc}`
      }`
    )
    return {
      ...value,
      dataLabel: getFormatWhitTimezone(
        dateHours,
        "h:mm a",
        currentUtc,
        currentTimezone
      ),
    }
  })
  const morning = slots?.morning?.map((value) => {
    const dateHours = new Date(
      `2000-01-01T${
        value?.dataValue.length === 4
          ? `0${value?.dataValue}${currentUtc}`
          : `${value?.dataValue}${currentUtc}`
      }`
    )
    return {
      ...value,
      dataLabel: getFormatWhitTimezone(
        dateHours,
        "h:mm a",
        currentUtc,
        currentTimezone
      ),
    }
  })

  return {
    afternoon,
    evening,
    morning,
  }
}

function AppointmentProduct({ product, id }) {
  console.log(product)
  const metaData = objectify(
    product?.meta_data || [],
    (f) => f.key,
    (f) => f.value
  )
  const currentUtc = metaData?.utc || moment().format("Z")
  const router = useRouter()
  const { user } = useContext(UserContext)
  const { addProduct } = useCartMutation()
  const [maxDate, setMaxDate] = useState(addMonths(new Date(), 12))
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [slots, setSlots] = useState(defaultSlots)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [booking, setBooking] = useState({})
  const [time, setTime] = useState("")
  const [notAvailable, setNotAvailable] = useState(false)
  const [restrictedDays, setRestrictedDays] = useState([])

  const verifyAvaibility = async (values) => {
    setLoadingSlots(true)
    setNotAvailable(false)
    try {
      const { data } = await axios.get(`${appointmentApi}/availability`, {
        params: values,
      })
      if (Array.isArray(data?.days) || Array.isArray(data.slots)) {
        setNotAvailable(true)
        return
      }
      setMaxDate(addDays(new Date(data.days.max), 1))
      if (user?.id === Number(product?.post_author)) {
        setSlots({ ...slots, ...data.slots })
        return
      }
      const offsetTime = timeZoneHorus({ ...slots, ...data.slots }, currentUtc)
      setSlots(offsetTime)
    } catch (e) {
      console.log(e)
    } finally {
      setLoadingSlots(false)
    }
  }

  const handleDate = async (date) => {
    setSlots(defaultSlots)
    setCurrentDate(date)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    const values = {
      product_id: id,
      start_date_month: month,
      start_date_day: day,
      start_date_year: year,
    }
    setBooking(values)
    await verifyAvaibility(values)
  }

  const handleTime = (value) => {
    setBooking({ ...booking, start_date_time: value })
    setTime(value)
  }

  const bookNow = (product) => {
    addProduct({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      appointment: booking,
    })

    router.push("/page-checkout")
  }

  const ifAvailable =
    slots.morning.length > 0 ||
    slots.afternoon.length > 0 ||
    slots.evening.length > 0

  const isValid =
    Object.keys(time).length > 0 && Object.keys(booking).length > 0

  useEffect(() => {
    if (product && !isObjectEmpty(product?.restricted_days) && maxDate) {
      const days = Object.keys(product?.restricted_days)
      const filters = restrictedDaysObject.filter((day) =>
        days.includes(day.value)
      )
      const restricted_days = getAllRestrictedDays(maxDate, filters)
      setRestrictedDays(restricted_days.map((a) => new Date(a)))
    }
  }, [product, maxDate])

  return (
    <section className={"product-detail"}>
      <article>
        <img
          src={
            product.images?.map((d) => d.src)[0] === undefined
              ? `${process.env.baseUrl}/wp-content/uploads/woocommerce-placeholder-150x150.png`
              : product.images.map((d) => d.src)[0]
          }
          alt={product.name}
        />
        <h3 className={"mt-4 mb-3 font-size-22"}>Description</h3>
        <p
          className={"product-detail-desc"}
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
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
            disabledDates={restrictedDays || []}
            onShownDateChange={() => {}}
          />
        </div>
        <p className={"my-4"}>
          Choose a date above to see available time slots.
        </p>
        {notAvailable ? (
          <Alert color={"danger"}>
            No appointments are available for that day.
          </Alert>
        ) : null}
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
                          className={`slot-active btn btn-appointment slot-item ${
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
                          className={`slot-active btn btn-appointment slot-item ${
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
                          className={`slot-active btn btn-appointment slot-item ${
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
  )
}

export default AppointmentProduct
