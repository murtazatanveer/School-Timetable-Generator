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

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  focused,
  error,
  secureTextEntry,
  showPassword,
  onTogglePassword,
  ref,
  returnKeyType,
  onSubmitEditing,
  keyboardType,
  autoCapitalize,
  inputRef,
}) => {
  return (
    <View style={styles.inputWrapper}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={styles.passwordContainer}>
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            focused && styles.inputFocused,
            error && styles.inputError,
          ]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {onTogglePassword && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={onTogglePassword}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xxs,
  },
  input: {
    height: 56,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textPrimary,
  },
  inputFocused: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  inputError: {
    borderWidth: 1.5,
    borderColor: COLORS.error,
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.error,
    marginTop: SPACING.xxs,
    marginLeft: SPACING.xs,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordToggle: {
    position: "absolute",
    right: SPACING.md,
    top: 18,
    padding: SPACING.xxs,
  },
});

export default FormInput;
