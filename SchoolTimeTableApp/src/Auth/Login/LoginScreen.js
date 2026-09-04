// screens/LoginScreen.js
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../../Theme/colors";
import DecorativeCurves from "./components/DecorativeCurves";
import AdminToggle from "./components/AdminToggle";
import FormInput from "./components/FormInput";
import AppButton from "../../common/AppButton/AppButton";
import { useLoginForm } from "./hooks/useLoginForm";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const {
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
  } = useLoginForm();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <DecorativeCurves />

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
          {/* Login Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.loginTitle}>Log In</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <AdminToggle isAdmin={isAdmin} onToggle={handleAdminToggle} />

            <FormInput
              placeholder={isAdmin ? "Admin Username" : "Username"}
              value={formData.userName}
              onChangeText={(text) => handleInputChange("userName", text)}
              onFocus={() => setFocusedField("userName")}
              onBlur={() => setFocusedField(null)}
              focused={focusedField === "userName"}
              error={errors.userName}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              autoCapitalize="none"
            />

            <FormInput
              inputRef={passwordRef}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              focused={focusedField === "password"}
              error={errors.password}
              secureTextEntry={!showPassword}
              showPassword={showPassword}
              onTogglePassword={handleTogglePassword}
              returnKeyType="done"
              onSubmitEditing={() => handleLogin(navigation)}
            />

            {/* REPLACED PrimaryButton with AppButton */}
            <AppButton
              title="Log In"
              onPress={() => handleLogin(navigation)}
              loading={isLoading}
              variant="primary"
              size="large"
              fullWidth={true}
              icon="lock-closed"
            />

            {/* Signup Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't Have An Account? </Text>
              <TouchableOpacity
                onPress={() => navigation?.navigate("SignupScreen")}
                activeOpacity={0.7}
              >
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
    zIndex: 2,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.xxl,
    paddingTop: height * 0.18,
    paddingBottom: height * 0.22,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  loginTitle: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    letterSpacing: -1,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
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
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
});

export default LoginScreen;
