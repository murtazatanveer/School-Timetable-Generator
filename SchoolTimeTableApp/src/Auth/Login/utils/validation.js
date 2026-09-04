// utils/validation.js
export const validateLoginForm = (formData) => {
  const newErrors = {};

  if (!formData.userName.trim()) {
    newErrors.userName = "Username is required";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  }

  return newErrors;
};
