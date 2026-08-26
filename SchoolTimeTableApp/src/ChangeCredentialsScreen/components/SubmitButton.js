import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const SubmitButton = ({ isLoading, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Ionicons
            name="reload-outline"
            size={20}
            color={COLORS.white}
            style={styles.loadingIcon}
          />
          <Text style={styles.submitButtonText}>Updating...</Text>
        </View>
      ) : (
        <>
          <Ionicons name="save-outline" size={20} color={COLORS.white} />
          <Text style={styles.submitButtonText}>Change Credentials</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    marginTop: SPACING.xl,
    ...SHADOWS.large,
    gap: SPACING.sm,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  loadingIcon: {
    // Animation would be handled here if needed
  },
});

export default SubmitButton;
