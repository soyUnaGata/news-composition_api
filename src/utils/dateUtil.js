import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const formatDate = (date) => {
  return dayjs(date).utcOffset(-5).format("DD.MM.YYYY HH:mm");
};
