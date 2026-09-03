import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../../Theme/colors";

const ClassCard = ({ classItem, isEditing, onEdit, onRemove }) => {
  if (isEditing) {
    return null;
  }

  return (
    <View style={styles.classCard}>
      {/* Left Section: Icon + Name */}
      <View style={styles.leftSection}>
        <View style={styles.iconCircle}>
          <Ionicons name="school" size={18} color={COLORS.white} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.className} numberOfLines={1}>
            {classItem.name}
          </Text>
        </View>
      </View>

      {/* Right Section: Actions */}
      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(classItem)}
          activeOpacity={0.8}
        >
          <Ionicons name="pencil" size={14} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onRemove(classItem.id)}
          activeOpacity={0.8}
        >
          <Ionicons name="trash" size={14} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  classCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primaryFade,
    borderRadius: BORDER_RADIUS.xl,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primaryFade,
    ...SHADOWS.medium,
  },

  // Left Section: Icon + Name
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: SPACING.sm,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },
  nameContainer: {
    flex: 1,
  },
  className: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },

  // Right Section: Actions
  rightSection: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  editButton: {
    width: 34,
    height: 34,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    ...SHADOWS.small,
  },
  deleteButton: {
    width: 34,
    height: 34,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.error,
    ...SHADOWS.small,
  },
});

export default ClassCard;
