import moment from 'moment'

var dated = new Date();
var defaultDateFormat = "DD/MM/YYYY";

export const formatDate = (date, format) => {
     if (format) {
         defaultDateFormat = format;
         dated = date;
     }
    return dated = moment(date).format(defaultDateFormat);
}