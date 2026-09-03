import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../../Theme/colors";

const AdminToggle = ({ isAdmin, onToggle }) => {
  return (
    <View style={styles.adminToggleWrapper}>
      <TouchableOpacity
        style={[
          styles.adminToggleButton,
          !isAdmin && styles.adminToggleButtonActive,
        ]}
        onPress={() => onToggle(false)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.adminToggleText,
            !isAdmin && styles.adminToggleTextActive,
          ]}
        >
          User
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.adminToggleButton,
          isAdmin && styles.adminToggleButtonActive,
        ]}
        onPress={() => onToggle(true)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.adminToggleText,
            isAdmin && styles.adminToggleTextActive,
          ]}
        >
          Admin
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  adminToggleWrapper: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: COLORS.backgroundGray,
    borderRadius: BORDER_RADIUS.xl,
    padding: 2,
    marginBottom: SPACING.md,
    width: 180,
  },
  adminToggleButton: {
    flex: 1,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  adminToggleButtonActive: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.small,
  },
  adminToggleText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
  adminToggleTextActive: {
    color: COLORS.textWhite,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
});

export default AdminToggle;
