//import moment from "moment";
import { format, formatDistanceToNow, subHours } from "date-fns";
import jstz from "jstz";
import {
  utcToZonedTime,
  format as formatTimezone
} from "date-fns-tz";

import moment from 'moment-timezone';


export const getFormatedDate = (date, formats) => {
  return moment(date).tz(jstz.determine().name()).format(formats);
};

export const getFormatedDateFromDate = (date, formats) => {
  return format(new Date(date), formats);
};

export const getFormat = (date, formats) => {
  return format(new Date(date), formats);
};

export const convertToUTC = (date) => {
  if (!date) return "";
  return date.replace(/ /g, "T");
};

export const getUTCFormat = (date) => {
  const d = new Date(date);
  const isoDate = d.toISOString();
  return `${isoDate.substr(0, 10)} ${isoDate.substr(11, 8)}`;
};

export const getFormatWhitTimezone = (date, timezone, formats, utc = null) => {
  const currentTimezone = jstz.determine().name();
  const currentUtc = !Boolean(utc) ? moment().format("Z") : utc
  const newDate = new Date(`${convertToUTC(date)}${currentUtc}`)
  return formatTimezone(subHours(newDate, 1) , formats, { currentTimezone});
};

export const formatCustomDistance = (date) => {
  const newDate = new Date(`${date}Z`);
  const timeZone = jstz.determine().name();
  const zonedDate = utcToZonedTime(newDate, timeZone);
  return formatDistanceToNow(zonedDate, { addSuffix: true });
};

export const formatTimeZone = (timeZones) => {
  return timeZones.map((tz) => ({ value: tz.tzCode, label: tz.label, utc: tz.utc }));
};
