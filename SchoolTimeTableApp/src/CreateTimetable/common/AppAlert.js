import { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const { width } = Dimensions.get("window");

const AppAlert = ({
  visible,
  onClose,
  type = "info", // 'success' | 'error' | 'warning' | 'info' | 'clash' | 'duplicate'
  title,
  message,
  details,
  confirmText = "Got It",
  onConfirm,
}) => {
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animation values
      scale.setValue(0.8);
      opacity.setValue(0);
    }
  }, [visible, scale, opacity]);

  const getIconConfig = () => {
    switch (type) {
      case "success":
        return {
          name: "checkmark-circle",
          color: COLORS.success,
          bg: "#E8F8E8",
        };
      case "error":
        return {
          name: "alert-circle",
          color: COLORS.error,
          bg: "#FFE8E8",
        };
      case "warning":
        return {
          name: "warning",
          color: COLORS.warning,
          bg: "#FFF5E6",
        };
      case "info":
        return {
          name: "information-circle",
          color: COLORS.info,
          bg: "#E8F0FE",
        };
      case "clash":
        return {
          name: "alert-circle",
          color: COLORS.error,
          bg: "#FFE8E8",
        };
      case "duplicate":
        return {
          name: "copy-outline",
          color: COLORS.warning,
          bg: "#FFF5E6",
        };
      default:
        return {
          name: "information-circle",
          color: COLORS.info,
          bg: "#E8F0FE",
        };
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case "success":
        return "Success";
      case "error":
        return "Error";
      case "warning":
        return "Warning";
      case "info":
        return "Information";
      case "clash":
        return "Clash Detected";
      case "duplicate":
        return "Duplicate Assignment";
      default:
        return "Information";
    }
  };

  const iconConfig = getIconConfig();
  const displayTitle = title || getDefaultTitle();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.alertContainer,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          {/* Close (X) Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={20} color={COLORS.textLight} />
          </TouchableOpacity>

          {/* Icon Section */}
          <View
            style={[styles.iconContainer, { backgroundColor: iconConfig.bg }]}
          >
            <View style={styles.iconCircle}>
              <Ionicons
                name={iconConfig.name}
                size={40}
                color={iconConfig.color}
              />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{displayTitle}</Text>

          {/* Message */}
          <Text style={styles.message}>{message}</Text>

          {/* Details Box */}
          {details && (
            <View style={styles.detailsBox}>
              {details.subject && (
                <View style={styles.detailRow}>
                  <Ionicons
                    name="book-outline"
                    size={16}
                    color={COLORS.primary}
                  />
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Subject: </Text>
                    {details.subject}
                  </Text>
                </View>
              )}
              {details.className && (
                <View style={styles.detailRow}>
                  <Ionicons
                    name="school-outline"
                    size={16}
                    color={COLORS.primary}
                  />
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Class: </Text>
                    {details.className}
                  </Text>
                </View>
              )}
              {details.section && (
                <View style={styles.detailRow}>
                  <Ionicons
                    name="layers-outline"
                    size={16}
                    color={COLORS.primary}
                  />
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Section: </Text>
                    {details.section}
                  </Text>
                </View>
              )}
              {details.teacherName && (
                <View style={styles.detailRow}>
                  <Ionicons
                    name="person-outline"
                    size={16}
                    color={COLORS.error}
                  />
                  <Text style={[styles.detailText, styles.errorText]}>
                    <Text style={styles.detailLabel}>
                      Already assigned to:{" "}
                    </Text>
                    {details.teacherName}
                  </Text>
                </View>
              )}
              {details.field && (
                <View style={styles.detailRow}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={16}
                    color={COLORS.error}
                  />
                  <Text style={[styles.detailText, styles.errorText]}>
                    <Text style={styles.detailLabel}>Field: </Text>
                    {details.field}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Confirm Button */}
          <TouchableOpacity
            style={[
              styles.confirmButton,
              { backgroundColor: iconConfig.color },
            ]}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={COLORS.white}
            />
            <Text style={styles.confirmButtonText}>{confirmText}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  alertContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xxl,
    padding: SPACING.xl,
    width: width * 0.85,
    alignItems: "center",
    ...SHADOWS.large,
  },

  // Close Button
  closeButton: {
    position: "absolute",
    top: SPACING.md,
    right: SPACING.md,
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.backgroundGray,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  message: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  detailsBox: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    width: "100%",
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
    gap: SPACING.sm,
  },
  detailText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textPrimary,
    flex: 1,
  },
  detailLabel: {
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  errorText: {
    color: COLORS.error,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    width: "100%",
    gap: SPACING.sm,
    ...SHADOWS.small,
  },
  confirmButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.white,
  },
});

export default AppAlert;
