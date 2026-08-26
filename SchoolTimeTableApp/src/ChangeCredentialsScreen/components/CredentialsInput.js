import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const CredentialsInput = ({
  field,
  handleInputChange,
  setFocusedField,
  getInputStyle,
  getIconColor,
}) => {
  const {
    id,
    label,
    icon,
    placeholder,
    value,
    error,
    isFocused,
    ref,
    isPassword,
    showPassword,
    setShowPassword,
    returnKeyType,
    onSubmitEditing,
  } = field;

  const inputStyle = getInputStyle(id);
  const iconColor = getIconColor(id);

  const getBorderStyle = () => {
    if (error) return styles.inputError;
    if (isFocused) return styles.inputFocused;
    return styles.input;
  };

  return (
    <View style={styles.inputWrapper}>
      <View style={styles.inputLabelContainer}>
        <Ionicons
          name={icon}
          size={18}
          color={iconColor}
          style={styles.inputIcon}
        />
        <Text style={styles.inputLabel}>{label}</Text>
      </View>

      {isPassword ? (
        <View style={styles.passwordInputContainer}>
          <TextInput
            ref={ref}
            style={[getBorderStyle(), styles.passwordInput]}
            placeholder={placeholder}
            placeholderTextColor={COLORS.textLight}
            value={value}
            onChangeText={(text) => handleInputChange(id, text)}
            onFocus={() => setFocusedField(id)}
            onBlur={() => setFocusedField(null)}
            secureTextEntry={!showPassword}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
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
      ) : (
        <TextInput
          ref={ref}
          style={getBorderStyle()}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLight}
          value={value}
          onChangeText={(text) => handleInputChange(id, text)}
          onFocus={() => setFocusedField(id)}
          onBlur={() => setFocusedField(null)}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={false}
          autoCapitalize="none"
        />
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={14}
            color={COLORS.error}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    padding: SPACING.md,
  },
  inputLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  inputIcon: {
    marginRight: 6,
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
});

export default CredentialsInput;
