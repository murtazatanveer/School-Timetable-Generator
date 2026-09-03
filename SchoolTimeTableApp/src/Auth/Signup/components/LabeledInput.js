import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../../Theme/colors";

const LabeledInput = ({
  label,
  iconName,
  iconColor,
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  focused,
  error,
  inputRef,
  returnKeyType,
  onSubmitEditing,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
  showPassword,
  onTogglePassword,
}) => {
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.inputLabelContainer}>
        <Ionicons
          name={iconName}
          size={18}
          color={iconColor}
          style={styles.inputIcon}
        />
        <Text style={styles.inputLabel}>{label}</Text>
      </View>

      {onTogglePassword ? (
        <View style={styles.passwordInputContainer}>
          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              styles.passwordInput,
              focused && styles.inputFocused,
              error && styles.inputError,
            ]}
            placeholder={placeholder}
            placeholderTextColor={COLORS.textLight}
            value={value}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            secureTextEntry={!showPassword}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={onTogglePassword}
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
          ref={inputRef}
          style={[
            styles.input,
            focused && styles.inputFocused,
            error && styles.inputError,
          ]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLight}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={16}
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
    backgroundColor: COLORS.backgroundLight,
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
});

export default LabeledInput;
