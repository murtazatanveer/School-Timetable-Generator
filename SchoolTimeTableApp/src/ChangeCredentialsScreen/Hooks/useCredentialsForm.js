import { useState, useRef } from "react";
import { Alert } from "react-native";
import { validateForm } from "../utils/validators";

export const useCredentialsForm = (navigation) => {
  const [formData, setFormData] = useState({
    oldUserName: "",
    oldPassword: "",
    newUserName: "",
    newPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const oldPasswordRef = useRef(null);
  const newUserNameRef = useRef(null);
  const newPasswordRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert(
          "Success",
          "Your credentials have been updated successfully!",
          [
            {
              text: "OK",
              onPress: () => navigation?.goBack(),
            },
          ],
        );
      }, 1500);
    }
  };

  const getInputStyle = (field) => {
    const isFocused = focusedField === field;
    const hasError = errors[field];

    if (hasError) return "error";
    if (isFocused) return "focused";
    return "default";
  };

  const getIconColor = (field) => {
    const isFocused = focusedField === field;
    const hasError = errors[field];

    if (hasError) return "error";
    if (isFocused) return "primary";
    return "textLight";
  };

  return {
    formData,
    errors,
    focusedField,
    isLoading,
    showOldPassword,
    showNewPassword,
    setShowOldPassword,
    setShowNewPassword,
    handleInputChange,
    handleSubmit,
    getInputStyle,
    getIconColor,
    setFocusedField,
    oldPasswordRef,
    newUserNameRef,
    newPasswordRef,
  };
};
