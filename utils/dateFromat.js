import moment from 'moment'
import { format } from 'date-fns'
export const getFormatedDate = (date, formats) => {
  return moment(date).format(formats)
}

export const getFormatedDateFromDate = (date, formats) => {
  return format(new Date(date * 1000), formats)
}