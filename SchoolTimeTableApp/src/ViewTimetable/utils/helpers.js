export const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

export const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const formatDay = (date) => {
  const options = { weekday: "long" };
  return date.toLocaleDateString("en-US", options);
};

export const isCurrentPeriod = (timeStr) => {
  const now = new Date();
  const [hours, minutes] = timeStr
    .replace(" AM", "")
    .replace(" PM", "")
    .split(":");
  let hour = parseInt(hours);
  const minute = parseInt(minutes);
  const isPM = timeStr.includes("PM");
  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;

  const periodTime = new Date();
  periodTime.setHours(hour, minute, 0, 0);

  const diff = (now - periodTime) / (1000 * 60);
  return diff >= 0 && diff < 45;
};
