import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const ClassTeacherBadge = ({ className, section, subject }) => {
  return (
    <View style={styles.classTeacherContainer}>
      <View style={styles.classTeacherCard}>
        <View style={styles.classTeacherHeader}>
          <View style={styles.classTeacherIconContainer}>
            <Ionicons name="school-outline" size={16} color={COLORS.white} />
          </View>
          <Text style={styles.classTeacherLabel}>Class Teacher</Text>
        </View>
        <View style={styles.classTeacherDivider} />
        <View style={styles.classTeacherDetails}>
          <View style={styles.classTeacherInfo}>
            <Text style={styles.classTeacherClass}>{className}</Text>
            <Text style={styles.classTeacherSection}>Section {section}</Text>
          </View>
          {subject && (
            <View style={styles.classTeacherSubjectContainer}>
              <Ionicons
                name="book-outline"
                size={12}
                color={COLORS.textLight}
              />
              <Text style={styles.classTeacherSubject}>{subject}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  classTeacherContainer: {
    marginBottom: SPACING.xs,
  },
  classTeacherCard: {
    backgroundColor: COLORS.primaryFade,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.primary + "30",
    ...SHADOWS.small,
  },
  classTeacherHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  classTeacherIconContainer: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  classTeacherLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  classTeacherDivider: {
    height: 1,
    backgroundColor: COLORS.primary + "20",
    marginVertical: 4,
  },
  classTeacherDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  classTeacherInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  classTeacherClass: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  classTeacherSection: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
  },
  classTeacherSubjectContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  classTeacherSubject: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

export default ClassTeacherBadge;
