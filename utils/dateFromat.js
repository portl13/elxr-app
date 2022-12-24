import moment from 'moment'
import {format, formatDistanceToNow} from 'date-fns'
import jstz from "jstz";
import {utcToZonedTime} from "date-fns-tz";

export const getFormatedDate = (date, formats) => {
  return moment(date).format(formats)
}

export const getFormatedDateFromDate = (date, formats) => {
  return format(new Date(date), formats)
}

export const getFormat = (date, formats) => {
  return format(new Date(date), formats)
}

export const convertToUTC = (date) => {
  return date.replace(/ /g, "T")
}

export const getUTCFormat  = (date) =>{
  const d = new Date(date);
  const isoDate = d.toISOString();
  return `${isoDate.substr(0, 10)} ${isoDate.substr(11, 8)}`;
}


export const formatCustomDistance = (date) => {
  const newDate = new Date(`${date}Z`);
  const timeZone = jstz.determine().name()
  const zonedDate = utcToZonedTime(newDate, timeZone)
  return formatDistanceToNow(zonedDate,{addSuffix: true})
}