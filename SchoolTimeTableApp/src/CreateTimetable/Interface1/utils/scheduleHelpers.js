export const generateTimeSlots = (
  startTime,
  duration,
  slots,
  formDataState = null,
) => {
  const start = startTime;
  const dur = duration;
  const slotCount = slots;

  if (!start || !dur || !slotCount) return [];

  const slotsArray = [];
  const [time, period] = start.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  let hour = hours;
  let minute = minutes;
  const totalSlots = parseInt(slotCount);
  const durationMinutes = parseInt(dur);

  for (let i = 0; i < totalSlots; i++) {
    const displayHour = hour > 12 ? hour - 12 : hour;
    const displayMinute = minute.toString().padStart(2, "0");
    const ampm = hour >= 12 ? "PM" : "AM";
    slotsArray.push(`${displayHour}:${displayMinute} ${ampm}`);

    minute += durationMinutes;
    if (minute >= 60) {
      hour += Math.floor(minute / 60);
      minute = minute % 60;
    }
  }
  return slotsArray;
};

export const validateScheduleForm = (formData) => {
  const errors = {};
  let isValid = true;

  if (!formData.timetableName.trim()) {
    errors.timetableName = "Timetable name is required";
    isValid = false;
  }
  if (!formData.workingDays) {
    errors.workingDays = "Please select working days";
    isValid = false;
  }
  if (!formData.slotsPerDay) {
    errors.slotsPerDay = "Please select slots per day";
    isValid = false;
  }
  if (!formData.breakAfterSlot) {
    errors.breakAfterSlot = "Please select break slot";
    isValid = false;
  }
  if (!formData.breakDuration) {
    errors.breakDuration = "Please select break duration";
    isValid = false;
  }
  if (!formData.firstSlotTime) {
    errors.firstSlotTime = "Please select start time";
    isValid = false;
  }
  if (!formData.slotDuration) {
    errors.slotDuration = "Please select slot duration";
    isValid = false;
  }

  if (formData.breakAfterSlot && formData.slotsPerDay) {
    if (parseInt(formData.breakAfterSlot) >= parseInt(formData.slotsPerDay)) {
      errors.breakAfterSlot = "Break must be before the last slot";
      isValid = false;
    }
  }

  return { isValid, errors };
};
