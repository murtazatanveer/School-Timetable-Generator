// hooks/useLoginForm.js
import { useState, useRef } from "react";
import { validateLoginForm } from "../utils/validation";

export const useLoginForm = () => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const passwordRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAdminToggle = (value) => {
    setIsAdmin(value);
  };

  const validateForm = () => {
    const newErrors = validateLoginForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (navigation) => {
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate("Dashboard");
      }, 1500);
    }
  };

  return {
    formData,
    showPassword,
    focusedField,
    isLoading,
    errors,
    isAdmin,
    passwordRef,
    handleInputChange,
    handleTogglePassword,
    handleAdminToggle,
    handleLogin,
    setFocusedField,
  };
};
