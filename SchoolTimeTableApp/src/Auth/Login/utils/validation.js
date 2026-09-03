// utils/validation.js
export const validateLoginForm = (formData) => {
  const newErrors = {};

  if (!formData.userName.trim()) {
    newErrors.userName = "Username is required";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  return newErrors;
};
