import moment from 'moment'
import { format } from 'date-fns'

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