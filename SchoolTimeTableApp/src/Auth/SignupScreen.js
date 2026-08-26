import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../Theme/colors";

const SignupScreen = ({ navigation }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    userName: "",
    schoolName: "",
    emisCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for UI interactions
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

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  // UI-only validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
    }

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = "School name is required";
    }

    if (!formData.emisCode.trim()) {
      newErrors.emisCode = "EMIS code is required";
    } else if (!/^\d{6,}$/.test(formData.emisCode)) {
      newErrors.emisCode = "EMIS code must be at least 6 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle signup - UI only
  const handleSignup = () => {
    if (validateForm()) {
      setIsLoading(true);
      // Simulate loading state
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to Login screen after successful signup
        navigation?.navigate("Login");
      }, 1500);
    }
  };

  // Get icon name based on field and focus state
  const getIconName = (field) => {
    const isFocused = focusedField === field;
    const baseColor = isFocused ? COLORS.primary : COLORS.textLight;

    switch (field) {
      case "userName":
        return { name: "person-outline", color: baseColor };
      case "schoolName":
        return { name: "business-outline", color: baseColor };
      case "emisCode":
        return { name: "document-text-outline", color: baseColor };
      case "email":
        return { name: "mail-outline", color: baseColor };
      case "password":
        return { name: "lock-closed-outline", color: baseColor };
      case "confirmPassword":
        return { name: "shield-checkmark-outline", color: baseColor };
      default:
        return { name: "ellipse-outline", color: baseColor };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header / Brand Section */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIconContainer}>
                <Ionicons
                  name="school-outline"
                  size={32}
                  color={COLORS.white}
                />
              </View>
              <Text style={styles.appName}>Make Your Timetable</Text>
            </View>
          </View>

          {/* Welcome Section */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Create Account</Text>
            <Text style={styles.welcomeSubtitle}>
              Join us to start managing your school timetable
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Username Field */}
            <View style={styles.inputWrapper}>
              <View style={styles.inputLabelContainer}>
                <Ionicons
                  name={getIconName("userName").name}
                  size={18}
                  color={getIconName("userName").color}
                  style={styles.inputIcon}
                />
                <Text style={styles.inputLabel}>Username</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  focusedField === "userName" && styles.inputFocused,
                  errors.userName && styles.inputError,
                ]}
                placeholder="Enter your username"
                placeholderTextColor={COLORS.textLight}
                value={formData.userName}
                onChangeText={(text) => handleInputChange("userName", text)}
                onFocus={() => setFocusedField("userName")}
                onBlur={() => setFocusedField(null)}
                returnKeyType="next"
                onSubmitEditing={() => schoolNameRef.current?.focus()}
                blurOnSubmit={false}
              />
              {errors.userName && (
                <View style={styles.errorContainer}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={16}
                    color={COLORS.error}
                  />
                  <Text style={styles.errorText}>{errors.userName}</Text>
                </View>
              )}
            </View>

            {/* School Name Field */}
            <View style={styles.inputWrapper}>
              <View style={styles.inputLabelContainer}>
                <Ionicons
                  name={getIconName("schoolName").name}
                  size={18}
                  color={getIconName("schoolName").color}
                  style={styles.inputIcon}
                />
                <Text style={styles.inputLabel}>School Name</Text>
              </View>
              <TextInput
                ref={schoolNameRef}
                style={[
                  styles.input,
                  focusedField === "schoolName" && styles.inputFocused,
                  errors.schoolName && styles.inputError,
                ]}
                placeholder="Enter school name"
                placeholderTextColor={COLORS.textLight}
                value={formData.schoolName}
                onChangeText={(text) => handleInputChange("schoolName", text)}
                onFocus={() => setFocusedField("schoolName")}
                onBlur={() => setFocusedField(null)}
                returnKeyType="next"
                onSubmitEditing={() => emisCodeRef.current?.focus()}
                blurOnSubmit={false}
              />
              {errors.schoolName && (
                <View style={styles.errorContainer}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={16}
                    color={COLORS.error}
                  />
                  <Text style={styles.errorText}>{errors.schoolName}</Text>
                </View>
              )}
            </View>

            {/* EMIS Code Field */}
            <View style={styles.inputWrapper}>
              <View style={styles.inputLabelContainer}>
                <Ionicons
                  name={getIconName("emisCode").name}
                  size={18}
                  color={getIconName("emisCode").color}
                  style={styles.inputIcon}
                />
                <Text style={styles.inputLabel}>EMIS Code</Text>
              </View>
              <TextInput
                ref={emisCodeRef}
                style={[
                  styles.input,
                  focusedField === "emisCode" && styles.inputFocused,
                  errors.emisCode && styles.inputError,
                ]}
                placeholder="Enter EMIS code"
                placeholderTextColor={COLORS.textLight}
                value={formData.emisCode}
                onChangeText={(text) => handleInputChange("emisCode", text)}
                onFocus={() => setFocusedField("emisCode")}
                onBlur={() => setFocusedField(null)}
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
                blurOnSubmit={false}
              />
              {errors.emisCode && (
                <View style={styles.errorContainer}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={16}
                    color={COLORS.error}
                  />
                  <Text style={styles.errorText}>{errors.emisCode}</Text>
                </View>
              )}
            </View>

            {/* Email Field */}
            <View style={styles.inputWrapper}>
              <View style={styles.inputLabelContainer}>
                <Ionicons
                  name={getIconName("email").name}
                  size={18}
                  color={getIconName("email").color}
                  style={styles.inputIcon}
                />
                <Text style={styles.inputLabel}>Email</Text>
              </View>
              <TextInput
                ref={emailRef}
                style={[
                  styles.input,
                  focusedField === "email" && styles.inputFocused,
                  errors.email && styles.inputError,
                ]}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.textLight}
                value={formData.email}
                onChangeText={(text) => handleInputChange("email", text)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
              />
              {errors.email && (
                <View style={styles.errorContainer}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={16}
                    color={COLORS.error}
                  />
                  <Text style={styles.errorText}>{errors.email}</Text>
                </View>
              )}
            </View>

            {/* Password Field */}
            <View style={styles.inputWrapper}>
              <View style={styles.inputLabelContainer}>
                <Ionicons
                  name={getIconName("password").name}
                  size={18}
                  color={getIconName("password").color}
                  style={styles.inputIcon}
                />
                <Text style={styles.inputLabel}>Password</Text>
              </View>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  ref={passwordRef}
                  style={[
                    styles.input,
                    styles.passwordInput,
                    focusedField === "password" && styles.inputFocused,
                    errors.password && styles.inputError,
                  ]}
                  placeholder="Create a password"
                  placeholderTextColor={COLORS.textLight}
                  value={formData.password}
                  onChangeText={(text) => handleInputChange("password", text)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  secureTextEntry={!showPassword}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <View style={styles.errorContainer}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={16}
                    color={COLORS.error}
                  />
                  <Text style={styles.errorText}>{errors.password}</Text>
                </View>
              )}
            </View>

            {/* Confirm Password Field */}
            <View style={styles.inputWrapper}>
              <View style={styles.inputLabelContainer}>
                <Ionicons
                  name={getIconName("confirmPassword").name}
                  size={18}
                  color={getIconName("confirmPassword").color}
                  style={styles.inputIcon}
                />
                <Text style={styles.inputLabel}>Confirm Password</Text>
              </View>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  ref={confirmPasswordRef}
                  style={[
                    styles.input,
                    styles.passwordInput,
                    focusedField === "confirmPassword" && styles.inputFocused,
                    errors.confirmPassword && styles.inputError,
                  ]}
                  placeholder="Confirm your password"
                  placeholderTextColor={COLORS.textLight}
                  value={formData.confirmPassword}
                  onChangeText={(text) =>
                    handleInputChange("confirmPassword", text)
                  }
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                  secureTextEntry={!showConfirmPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleSignup}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={22}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <View style={styles.errorContainer}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={16}
                    color={COLORS.error}
                  />
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                </View>
              )}
            </View>

            {/* Signup Button */}
            <TouchableOpacity
              style={[
                styles.signupButton,
                isLoading && styles.signupButtonDisabled,
              ]}
              onPress={handleSignup}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.signupButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation?.navigate("Login")}
                activeOpacity={0.7}
              >
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By signing up, you agree to our Terms of Service
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  headerContainer: {
    paddingTop: Platform.OS === "ios" ? SPACING.xs : SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
    ...SHADOWS.medium,
  },
  appName: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  welcomeContainer: {
    marginBottom: SPACING.xxl,
  },
  welcomeTitle: {
    fontSize: TYPOGRAPHY.sizes.xxxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xxs,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeights.normal * 16,
  },
  formContainer: {
    flex: 1,
  },
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  inputLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xxs,
  },
  inputIcon: {
    marginRight: SPACING.xxs,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.sm,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.inputBackground,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  inputError: {
    borderColor: COLORS.error,
    backgroundColor: "#FFF5F5",
  },
  passwordInputContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 48,
  },
  passwordToggle: {
    position: "absolute",
    right: SPACING.sm,
    top: 13,
    padding: SPACING.xxs,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xxs,
    paddingHorizontal: SPACING.xxs,
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.error,
    marginLeft: SPACING.xxs,
  },
  signupButton: {
    height: 54,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.xs,
    ...SHADOWS.large,
  },
  signupButtonDisabled: {
    opacity: 0.7,
  },
  signupButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    letterSpacing: 0.3,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.lg,
  },
  loginText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
  },
  loginLink: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.primary,
  },
  footer: {
    marginTop: SPACING.xxl,
    paddingVertical: SPACING.xs,
  },
  footerText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 18,
  },
});

export default SignupScreen;
