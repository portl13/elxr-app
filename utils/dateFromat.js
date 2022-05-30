import moment from 'moment'

export const getFormatedDate = (date, formats) => {
    return moment(date).format(formats)
}
