import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { COLORS, SPACING } from "../Theme/colors";
import { useCredentialsForm } from "./Hooks/useCredentialsForm";
import CredentialsSection from "./components/CredentialsSection";
import AppButton from "../common/AppButton/AppButton";
import Header from "../common/AppHeader/Header";

const ChangeCredentialsScreen = ({ navigation }) => {
  const {
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
  } = useCredentialsForm(navigation);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.container}>
        <Header
          navigation={navigation}
          title="Change Credentials"
          icon="key-outline"
          subtitle="Update your login credentials"
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Current Credentials Section */}
          <CredentialsSection
            title="Current Credentials"
            fields={[
              {
                id: "oldUserName",
                label: "Old User Name",
                icon: "person-outline",
                placeholder: "Enter your old username",
                value: formData.oldUserName,
                error: errors.oldUserName,
                isFocused: focusedField === "oldUserName",
                ref: null,
                returnKeyType: "next",
                onSubmitEditing: () => oldPasswordRef.current?.focus(),
              },
              {
                id: "oldPassword",
                label: "Old Password",
                icon: "lock-closed-outline",
                placeholder: "Enter your old password",
                value: formData.oldPassword,
                error: errors.oldPassword,
                isFocused: focusedField === "oldPassword",
                ref: oldPasswordRef,
                isPassword: true,
                showPassword: showOldPassword,
                setShowPassword: setShowOldPassword,
                returnKeyType: "next",
                onSubmitEditing: () => newUserNameRef.current?.focus(),
              },
            ]}
            handleInputChange={handleInputChange}
            setFocusedField={setFocusedField}
            getInputStyle={getInputStyle}
            getIconColor={getIconColor}
          />

          {/* New Credentials Section */}
          <CredentialsSection
            title="New Credentials"
            fields={[
              {
                id: "newUserName",
                label: "New User Name",
                icon: "person-add-outline",
                placeholder: "Enter your new username",
                value: formData.newUserName,
                error: errors.newUserName,
                isFocused: focusedField === "newUserName",
                ref: newUserNameRef,
                returnKeyType: "next",
                onSubmitEditing: () => newPasswordRef.current?.focus(),
              },
              {
                id: "newPassword",
                label: "New Password",
                icon: "shield-checkmark-outline",
                placeholder: "Enter your new password (min 8 chars)",
                value: formData.newPassword,
                error: errors.newPassword,
                isFocused: focusedField === "newPassword",
                ref: newPasswordRef,
                isPassword: true,
                showPassword: showNewPassword,
                setShowPassword: setShowNewPassword,
                returnKeyType: "done",
                onSubmitEditing: handleSubmit,
              },
            ]}
            handleInputChange={handleInputChange}
            setFocusedField={setFocusedField}
            getInputStyle={getInputStyle}
            getIconColor={getIconColor}
          />

          <AppButton
            title="Change Credentials"
            icon="save-outline"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            style={{ marginTop: SPACING.xl }}
          />

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 120,
  },
  bottomSpacing: {
    height: SPACING.xxl,
  },
});

export default ChangeCredentialsScreen;
