import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import AppButton from "../../common/AppButton/AppButton";

const { width, height } = Dimensions.get("window");

const UserPopup = ({
  visible,
  onClose,
  onSave,
  editingUser = null,
  title = "Add New User",
  icon = "person-add-outline",
  buttonText = "Add User",
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const isEditing = !!editingUser;

  useEffect(() => {
    if (visible) {
      if (editingUser) {
        // Populate fields for editing
        setUserName(editingUser.name || "");
        setPassword(editingUser.password || "");
        setAccountType(editingUser.role === "Admin" ? "admin" : "user");
      } else {
        // Reset for new user
        setUserName("");
        setPassword("");
        setAccountType("user");
      }
      setErrors({});
      setShowPassword(false);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, editingUser]);

  const validateForm = () => {
    const newErrors = {};

    if (!userName.trim()) {
      newErrors.userName = "User Name is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onSave({
          userName,
          password,
          accountType,
          role: accountType === "admin" ? "Admin" : "User",
        });
      }, 1500);
    }
  };

  const accountOptions = [
    {
      id: "user",
      title: "User",
      icon: "person-outline",
      description: "Standard user access",
      color: COLORS.secondary,
    },
    {
      id: "admin",
      title: "Admin",
      icon: "shield-checkmark-outline",
      description: "Full administrative access",
      color: COLORS.primary,
    },
  ];

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.popupContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
                },
              ]}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
              >
                {/* Header */}
                <View style={styles.popupHeader}>
                  <View style={styles.popupHeaderLeft}>
                    <View style={styles.headerIconContainer}>
                      <Ionicons
                        name={isEditing ? "pencil-outline" : icon}
                        size={22}
                        color={COLORS.white}
                      />
                    </View>
                    <Text style={styles.popupTitle}>
                      {isEditing ? "Edit User" : title}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButton}
                  >
                    <Ionicons
                      name="close"
                      size={24}
                      color={COLORS.textSecondary}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.popupDivider} />

                {/* Form */}
                <View style={styles.formContainer}>
                  {/* Account Type Selection */}
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputLabelContainer}>
                      <Ionicons
                        name="people-outline"
                        size={18}
                        color={COLORS.primary}
                      />
                      <Text style={styles.inputLabel}>Account Type</Text>
                    </View>
                    <View style={styles.accountTypeContainer}>
                      {accountOptions.map((option) => {
                        const isSelected = accountType === option.id;
                        return (
                          <TouchableOpacity
                            key={option.id}
                            style={[
                              styles.accountOption,
                              isSelected && styles.accountOptionSelected,
                              isSelected && { borderColor: option.color },
                              isSelected && {
                                backgroundColor: option.color + "15",
                              },
                            ]}
                            onPress={() => setAccountType(option.id)}
                            activeOpacity={0.7}
                          >
                            <View style={styles.accountOptionContent}>
                              <View
                                style={[
                                  styles.accountOptionIcon,
                                  isSelected && {
                                    backgroundColor: option.color,
                                  },
                                ]}
                              >
                                <Ionicons
                                  name={option.icon}
                                  size={20}
                                  color={
                                    isSelected ? COLORS.white : option.color
                                  }
                                />
                              </View>
                              <View style={styles.accountOptionText}>
                                <Text
                                  style={[
                                    styles.accountOptionTitle,
                                    isSelected && { color: option.color },
                                  ]}
                                >
                                  {option.title}
                                </Text>
                                <Text style={styles.accountOptionDescription}>
                                  {option.description}
                                </Text>
                              </View>
                              {isSelected && (
                                <View style={styles.accountOptionCheck}>
                                  <Ionicons
                                    name="checkmark-circle"
                                    size={22}
                                    color={option.color}
                                  />
                                </View>
                              )}
                            </View>
                            {isSelected && (
                              <View
                                style={[
                                  styles.accountOptionIndicator,
                                  { backgroundColor: option.color },
                                ]}
                              />
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {/* User Name Field */}
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputLabelContainer}>
                      <Ionicons
                        name="person-outline"
                        size={18}
                        color={COLORS.primary}
                      />
                      <Text style={styles.inputLabel}>User Name</Text>
                    </View>
                    <TextInput
                      style={[
                        styles.input,
                        errors.userName && styles.inputError,
                      ]}
                      placeholder="Enter user name"
                      placeholderTextColor={COLORS.textLight}
                      value={userName}
                      onChangeText={(text) => {
                        setUserName(text);
                        if (errors.userName) {
                          setErrors({ ...errors, userName: null });
                        }
                      }}
                      autoCapitalize="none"
                      returnKeyType="next"
                    />
                    {errors.userName && (
                      <View style={styles.errorContainer}>
                        <Ionicons
                          name="alert-circle-outline"
                          size={14}
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
                        name="lock-closed-outline"
                        size={18}
                        color={COLORS.primary}
                      />
                      <Text style={styles.inputLabel}>Password</Text>
                    </View>
                    <View style={styles.passwordInputContainer}>
                      <TextInput
                        style={[
                          styles.input,
                          styles.passwordInput,
                          errors.password && styles.inputError,
                        ]}
                        placeholder="Enter password (min 6 chars)"
                        placeholderTextColor={COLORS.textLight}
                        value={password}
                        onChangeText={(text) => {
                          setPassword(text);
                          if (errors.password) {
                            setErrors({ ...errors, password: null });
                          }
                        }}
                        secureTextEntry={!showPassword}
                        returnKeyType="done"
                        onSubmitEditing={handleSave}
                      />
                      <TouchableOpacity
                        style={styles.passwordToggle}
                        onPress={() => setShowPassword(!showPassword)}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={
                            showPassword ? "eye-outline" : "eye-off-outline"
                          }
                          size={22}
                          color={COLORS.textSecondary}
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.password && (
                      <View style={styles.errorContainer}>
                        <Ionicons
                          name="alert-circle-outline"
                          size={14}
                          color={COLORS.error}
                        />
                        <Text style={styles.errorText}>{errors.password}</Text>
                      </View>
                    )}
                  </View>

                  {/* Save/Update Button */}
                  <AppButton
                    title={isEditing ? "Update User" : buttonText}
                    icon={isEditing ? "save-outline" : icon}
                    onPress={handleSave}
                    loading={isLoading}
                    disabled={isLoading}
                    fullWidth={true}
                    style={styles.addButton}
                  />
                </View>
              </KeyboardAvoidingView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.large,
    overflow: "hidden",
  },
  keyboardView: {
    flex: 1,
  },
  popupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  popupHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  headerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  popupTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  closeButton: {
    padding: 4,
  },
  popupDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.lg,
  },
  formContainer: {
    padding: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  inputLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.backgroundLight,
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
    right: 14,
    top: 13,
    padding: 4,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    paddingHorizontal: 4,
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.error,
    marginLeft: 4,
  },
  addButton: {
    marginTop: 4,
  },
  accountTypeContainer: {
    gap: SPACING.xs,
  },
  accountOption: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
    position: "relative",
  },
  accountOptionSelected: {
    borderWidth: 2,
  },
  accountOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.sm,
    gap: SPACING.sm,
  },
  accountOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  accountOptionText: {
    flex: 1,
  },
  accountOptionTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  accountOptionDescription: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  accountOptionCheck: {
    marginLeft: SPACING.xs,
  },
  accountOptionIndicator: {
    height: 3,
    width: "100%",
  },
});

export default UserPopup;
