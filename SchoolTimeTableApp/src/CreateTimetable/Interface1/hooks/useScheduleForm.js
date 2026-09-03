import { useState, useEffect } from "react";
import {
  generateTimeSlots,
  validateScheduleForm,
} from "../utils/scheduleHelpers";

export const useScheduleForm = (initialData, onNext) => {
  const [formData, setFormData] = useState({
    timetableName: initialData.timetableName || "",
    workingDays: initialData.workingDays || "",
    slotsPerDay: initialData.slotsPerDay || "",
    breakAfterSlot: initialData.breakAfterSlot || "",
    breakDuration: initialData.breakDuration || "",
    firstSlotTime: initialData.firstSlotTime || "08:00 AM",
    slotDuration: initialData.slotDuration || "",
  });

  const [errors, setErrors] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const { isValid, errors: newErrors } = validateScheduleForm(formData);
    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }

    if (
      field === "firstSlotTime" ||
      field === "slotDuration" ||
      field === "slotsPerDay"
    ) {
      const updatedFormData = { ...formData, [field]: value };
      const slots = generateTimeSlots(
        field === "firstSlotTime" ? value : formData.firstSlotTime,
        field === "slotDuration" ? value : formData.slotDuration,
        field === "slotsPerDay" ? value : formData.slotsPerDay,
        updatedFormData,
      );
      setTimeSlots(slots);
    }
  };

  const handleNext = () => {
    if (isFormValid) {
      const slots = generateTimeSlots(
        formData.firstSlotTime,
        formData.slotDuration,
        formData.slotsPerDay,
      );
      setTimeSlots(slots);
      onNext(formData);
    }
  };

  return {
    formData,
    errors,
    timeSlots,
    isFormValid,
    handleInputChange,
    handleNext,
  };
};
