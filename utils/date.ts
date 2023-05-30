import moment from "moment";

export const actualDate = {
  day: moment().format("DD"),
  month: moment().format("MM"),
  year: moment().format("YYYY"),
  weekDayAbr: moment().format("ddd"),
  weekDay: moment().format("dddd"),
  calendarFormat: `${moment().format("YYYY")}-${moment().format(
    "MM"
  )}-${moment().format("DD")}`,
};
