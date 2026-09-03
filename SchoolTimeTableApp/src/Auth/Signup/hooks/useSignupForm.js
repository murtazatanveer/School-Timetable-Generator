// hooks/useSignupForm.js
import { useState, useRef } from "react";
import { validateSignupForm } from "../utils/signupValidation";

export const useSignupForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    schoolName: "",
    emisCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Refs for input focus management
  const schoolNameRef = useRef(null);
  const emisCodeRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const validateForm = () => {
    const newErrors = validateSignupForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (navigation) => {
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigation?.navigate("Login");
      }, 1500);
    }
  };

  return {
    formData,
    showPassword,
    showConfirmPassword,
    focusedField,
    isLoading,
    errors,
    schoolNameRef,
    emisCodeRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    handleInputChange,
    handleSignup,
    setShowPassword,
    setShowConfirmPassword,
    setFocusedField,
  };
};
