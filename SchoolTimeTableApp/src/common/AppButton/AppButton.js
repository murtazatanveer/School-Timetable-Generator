import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const AppButton = ({
  title,
  onPress,
  icon,
  loading = false,
  disabled = false,
  variant = "primary", // primary, secondary, destructive, outline
  size = "medium", // small, medium, large
  fullWidth = false,
  style,
  iconSize = 20,
  iconColor,
}) => {
  const getButtonStyles = () => {
    const baseStyles = [styles.button, styles[size]];

    if (disabled || loading) {
      baseStyles.push(styles.disabled);
    } else {
      switch (variant) {
        case "primary":
          baseStyles.push(styles.primary);
          break;
        case "secondary":
          baseStyles.push(styles.secondary);
          break;
        case "destructive":
          baseStyles.push(styles.destructive);
          break;
        case "outline":
          baseStyles.push(styles.outline);
          break;
        default:
          baseStyles.push(styles.primary);
      }
    }

    if (fullWidth) baseStyles.push(styles.fullWidth);
    return baseStyles;
  };

  const getTextStyles = () => {
    if (disabled || loading) return styles.textDisabled;

    switch (variant) {
      case "primary":
        return styles.textPrimary;
      case "secondary":
        return styles.textSecondary;
      case "destructive":
        return styles.textDestructive;
      case "outline":
        return styles.textOutline;
      default:
        return styles.textPrimary;
    }
  };

  const getIconColor = () => {
    if (iconColor) return iconColor;
    if (disabled || loading) return COLORS.disabledText;

    switch (variant) {
      case "primary":
        return COLORS.white;
      case "secondary":
        return COLORS.white;
      case "destructive":
        return COLORS.white;
      case "outline":
        return COLORS.primary;
      default:
        return COLORS.white;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? COLORS.primary : COLORS.white}
          size="small"
        />
      ) : (
        <View style={styles.buttonContent}>
          {icon && (
            <Ionicons name={icon} size={iconSize} color={getIconColor()} />
          )}
          <Text style={[styles.text, getTextStyles()]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  fullWidth: {
    width: "100%",
  },
  primary: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  secondary: {
    backgroundColor: COLORS.primaryLight,
    ...SHADOWS.medium,
  },
  destructive: {
    backgroundColor: COLORS.error,
    ...SHADOWS.medium,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  disabled: {
    backgroundColor: COLORS.disabledBackground,
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
  },
  small: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  medium: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  large: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  text: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  textPrimary: {
    color: COLORS.white,
  },
  textSecondary: {
    color: COLORS.white,
  },
  textDestructive: {
    color: COLORS.white,
  },
  textOutline: {
    color: COLORS.primary,
  },
  textDisabled: {
    color: COLORS.disabledText,
  },
});

export default AppButton;
