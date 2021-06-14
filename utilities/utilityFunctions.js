//These are functions that are usually needed everywhere in the project

export const duration = (milliseconds) => {
  const days = Math.floor(milliseconds / 86400000);
  if (days < 30) {
    return days + " days";
  } else if (days < 60) {
    return days / 30 + "month";
  } else {
    return days / 30 + "months";
  }
};

export const timeStamptoDate = (timeStamp) => {
  const milliseconds = timeStamp;
  const date = new Date(milliseconds);
  const day = date.toLocaleString("en-US", { day: "numeric" });
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.toLocaleString("en-US", { year: "numeric" });
  return day.toString() + " " + month + " " + year.toString();
};

export const usePercentage = (activationDate, duration) => {
  const currentTimeStamp = new Date().getTime();
  const currentMilliseconds = currentTimeStamp - activationDate;
  const percentage = Math.floor((currentMilliseconds / duration) * 100);
  if (percentage > 100) {
    return 100;
  } else {
    return percentage;
  }
};

export const middleDots = (text) => {
  const length = text.length;
  const firstPart = text.substring(0, 3);
  const lastPart = text.substring(length - 3, length);
  return firstPart + "..." + lastPart;
};
