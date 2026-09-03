// utils/signupValidation.js
export const validateSignupForm = (formData) => {
  const newErrors = {};

  // Username validation
  if (!formData.userName.trim()) {
    newErrors.userName = "Username is required";
  }

  // School Name validation
  if (!formData.schoolName.trim()) {
    newErrors.schoolName = "School name is required";
  }

  // EMIS Code validation
  if (!formData.emisCode.trim()) {
    newErrors.emisCode = "EMIS code is required";
  } else if (!/^\d{6,}$/.test(formData.emisCode)) {
    newErrors.emisCode = "EMIS code must be at least 6 digits";
  }

  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Please enter a valid email address";
  }

  // Password validation
  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  // Confirm Password validation
  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  return newErrors;
};
