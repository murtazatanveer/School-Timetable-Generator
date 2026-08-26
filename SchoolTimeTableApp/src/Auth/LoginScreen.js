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

const LoginScreen = ({ navigation }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  // State for UI interactions
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Refs for input focus management
  const passwordRef = useRef(null);

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

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login - UI only
  const handleLogin = () => {
    if (validateForm()) {
      setIsLoading(true);
      // Simulate loading state
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to Dashboard after successful login
        navigation?.navigate("Dashboard");
      }, 1500);
    }
  };

  // Handle forgot password - UI only
  const handleForgotPassword = () => {
    // Show a mock alert or navigation
    alert("Password reset link will be sent to your registered email.");
  };

  // Get icon name based on field and focus state
  const getIconName = (field) => {
    const isFocused = focusedField === field;
    const baseColor = isFocused ? COLORS.primary : COLORS.textLight;

    switch (field) {
      case "userName":
        return { name: "person-outline", color: baseColor };
      case "password":
        return { name: "lock-closed-outline", color: baseColor };
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
              <Text style={styles.appName}>Timetable Generation</Text>
            </View>
          </View>

          {/* Welcome Section */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Welcome Back</Text>
            <Text style={styles.welcomeSubtitle}>
              Sign in to access your school timetable
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
                onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
                autoCapitalize="none"
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
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.textLight}
                  value={formData.password}
                  onChangeText={(text) => handleInputChange("password", text)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
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

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                isLoading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Log In</Text>
              )}
            </TouchableOpacity>

            {/* Signup Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation?.navigate("Signup")}
                activeOpacity={0.7}
              >
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Secure login • Protected by encryption
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
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: -SPACING.xxs,
    marginBottom: SPACING.lg,
  },
  forgotPasswordText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  loginButton: {
    height: 54,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.xxs,
    ...SHADOWS.large,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    letterSpacing: 0.3,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.lg,
  },
  signupText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
  },
  signupLink: {
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

export default LoginScreen;
