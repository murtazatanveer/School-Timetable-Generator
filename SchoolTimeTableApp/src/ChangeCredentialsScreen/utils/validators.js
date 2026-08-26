export const validateForm = (formData) => {
  const newErrors = {};

  if (!formData.oldUserName.trim()) {
    newErrors.oldUserName = "Old User Name is required";
  }

  if (!formData.oldPassword.trim()) {
    newErrors.oldPassword = "Old Password is required";
  }

  if (!formData.newUserName.trim()) {
    newErrors.newUserName = "New User Name is required";
  }

  if (!formData.newPassword.trim()) {
    newErrors.newPassword = "New Password is required";
  } else if (formData.newPassword.length < 6) {
    newErrors.newPassword = "New Password must be at least 6 characters";
  }

  return newErrors;
};
