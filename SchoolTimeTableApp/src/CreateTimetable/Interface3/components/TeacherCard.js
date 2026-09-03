import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../../Theme/colors";

const TeacherCard = ({
  teacher,
  isEditing,
  onEdit,
  onRemove,
  onCancelEdit,
}) => {
  if (isEditing) {
    return null;
  }

  // Get initials from teacher name
  const getInitials = (name) => {
    if (!name) return "?";
    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (
      nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <View style={styles.teacherBar}>
      {/* Left: Initials Circle */}
      <View style={styles.initialsCircle}>
        <Text style={styles.initialsText}>{getInitials(teacher.name)}</Text>
      </View>

      {/* Middle: Teacher Name */}
      <View style={styles.teacherInfo}>
        <Text style={styles.teacherName} numberOfLines={1}>
          {teacher.name}
        </Text>
        <Text style={styles.teacherMeta}>
          {teacher.assignments.length} assignment
          {teacher.assignments.length > 1 ? "s" : ""}
        </Text>
      </View>

      {/* Right: Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(teacher)}
          activeOpacity={0.7}
        >
          <Ionicons name="pencil-outline" size={16} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onRemove(teacher.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={16} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  teacherBar: {
    backgroundColor: COLORS.primaryFade, // ✅ Changed from white to primaryFade
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.primaryFade,
    ...SHADOWS.small,
    width: 260,
  },

  // Initials Circle
  initialsCircle: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
    ...SHADOWS.small,
  },
  initialsText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },

  // Teacher Info
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  teacherMeta: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // Action Buttons
  actionButtons: {
    flexDirection: "row",
    gap: SPACING.xs,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primaryFade,
    ...SHADOWS.small,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primaryFade,
    ...SHADOWS.small,
  },
});

export default TeacherCard;
