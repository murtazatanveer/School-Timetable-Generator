import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../../Theme/colors";
import HeaderWithLogo from "./components/HeaderWithLogo";
import WelcomeHeader from "./components/WelcomeHeader";
import LabeledInput from "./components/LabeledInput";
import AppButton from "../../common/AppButton/AppButton";
import { useSignupForm } from "./hooks/useSignupForm";

const SignupScreen = ({ navigation }) => {
  const {
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
  } = useSignupForm();

  const getIconColor = (field) => {
    return focusedField === field ? COLORS.primary : COLORS.textLight;
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
          <HeaderWithLogo />
          <WelcomeHeader
            title="Create Account"
            subtitle="Join us to start managing your school timetable"
          />

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Username Field */}
            <LabeledInput
              label="Username"
              iconName="person-outline"
              iconColor={getIconColor("userName")}
              placeholder="Enter your username"
              value={formData.userName}
              onChangeText={(text) => handleInputChange("userName", text)}
              onFocus={() => setFocusedField("userName")}
              onBlur={() => setFocusedField(null)}
              focused={focusedField === "userName"}
              error={errors.userName}
              returnKeyType="next"
              onSubmitEditing={() => schoolNameRef.current?.focus()}
            />

            {/* School Name Field */}
            <LabeledInput
              label="School Name"
              iconName="business-outline"
              iconColor={getIconColor("schoolName")}
              placeholder="Enter school name"
              value={formData.schoolName}
              onChangeText={(text) => handleInputChange("schoolName", text)}
              onFocus={() => setFocusedField("schoolName")}
              onBlur={() => setFocusedField(null)}
              focused={focusedField === "schoolName"}
              error={errors.schoolName}
              inputRef={schoolNameRef}
              returnKeyType="next"
              onSubmitEditing={() => emisCodeRef.current?.focus()}
            />

            {/* EMIS Code Field */}
            <LabeledInput
              label="EMIS Code"
              iconName="document-text-outline"
              iconColor={getIconColor("emisCode")}
              placeholder="Enter EMIS code"
              value={formData.emisCode}
              onChangeText={(text) => handleInputChange("emisCode", text)}
              onFocus={() => setFocusedField("emisCode")}
              onBlur={() => setFocusedField(null)}
              focused={focusedField === "emisCode"}
              error={errors.emisCode}
              inputRef={emisCodeRef}
              keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
            />

            {/* Email Field */}
            <LabeledInput
              label="Email"
              iconName="mail-outline"
              iconColor={getIconColor("email")}
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              focused={focusedField === "email"}
              error={errors.email}
              inputRef={emailRef}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />

            {/* Password Field */}
            <LabeledInput
              label="Password"
              iconName="lock-closed-outline"
              iconColor={getIconColor("password")}
              placeholder="Create a password"
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              focused={focusedField === "password"}
              error={errors.password}
              inputRef={passwordRef}
              secureTextEntry={!showPassword}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />

            {/* Confirm Password Field */}
            <LabeledInput
              label="Confirm Password"
              iconName="shield-checkmark-outline"
              iconColor={getIconColor("confirmPassword")}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(text) =>
                handleInputChange("confirmPassword", text)
              }
              onFocus={() => setFocusedField("confirmPassword")}
              onBlur={() => setFocusedField(null)}
              focused={focusedField === "confirmPassword"}
              error={errors.confirmPassword}
              inputRef={confirmPasswordRef}
              secureTextEntry={!showConfirmPassword}
              showPassword={showConfirmPassword}
              onTogglePassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              returnKeyType="done"
              onSubmitEditing={() => handleSignup(navigation)}
            />

            {/* Signup Button - REPLACED with AppButton */}
            <AppButton
              title="Create Account"
              onPress={() => handleSignup(navigation)}
              loading={isLoading}
              variant="primary"
              size="large"
              fullWidth={true}
              icon="person-add-outline"
            />

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation?.navigate("LoginScreen")}
                activeOpacity={0.7}
              >
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  formContainer: {
    flex: 1,
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
});

export default SignupScreen;
