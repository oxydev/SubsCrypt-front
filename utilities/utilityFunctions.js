//These are functions that are usually needed everywhere in the project

//convert duration timestamp to dat format
export const duration = (milliseconds) => {
  const days = Math.floor(milliseconds / 86400000);
  if (days < 30) {
    return days + " Days";
  } else if (days < 60) {
    return days / 30 + " Month";
  } else {
    return days / 30 + " Months";
  }
};

//covert timestamp to data format
export const timeStamptoDate = (timeStamp) => {
  const milliseconds = timeStamp;
  const date = new Date(milliseconds);
  const day = date.toLocaleString("en-US", { day: "numeric" });
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.toLocaleString("en-US", { year: "numeric" });
  return day.toString() + " " + month + " " + year.toString();
};

//set the amount of a plan usage in percentage according to the plan duration and activation data
export const usePercentage = (activationDate, duration) => {
  const currentTimeStamp = new Date().getTime();
  const currentMilliseconds = currentTimeStamp - activationDate;
  const percentage = Math.floor((currentMilliseconds / duration) * 100);
  if (percentage > 100) {
    return 100;
  } else if (percentage < 0) {
    return 0;
  } else {
    return percentage;
  }
};

//convert the address to the format which 3 dots is between
export const middleDots = (text) => {
  const length = text.length;
  const firstPart = text.substring(0, 5);
  const lastPart = text.substring(length - 5, length);
  return firstPart + "..." + lastPart;
};
