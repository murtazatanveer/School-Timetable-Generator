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

const TeacherResultCard = ({ result }) => {
  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  return (
    <View style={styles.resultWrapper}>
      <View style={styles.resultCard}>
        <View style={styles.resultAccent} />

        <View style={styles.resultContent}>
          {/* Live Badge */}
          <View style={styles.resultBadge}>
            <View style={styles.resultBadgeDot} />
            <Text style={styles.resultBadgeText}>Currently Teaching</Text>
          </View>

          {/* Teacher Info */}
          <View style={styles.resultTeacherSection}>
            <View style={styles.resultAvatar}>
              <Text style={styles.resultAvatarText}>
                {getInitials(result.teacher)}
              </Text>
            </View>
            <View style={styles.resultTeacherInfo}>
              <Text style={styles.resultTeacherName}>{result.teacher}</Text>
              <View style={styles.resultSubjectRow}>
                <View style={styles.resultSubjectDot} />
                <Text style={styles.resultSubjectText}>{result.subject}</Text>
              </View>
            </View>
          </View>

          {/* Time Details */}
          <View style={styles.resultTimeRow}>
            <View style={styles.resultTimeIcon}>
              <Ionicons name="time-outline" size={14} color={COLORS.white} />
            </View>
            <Text style={styles.resultTimeText}>
              {result.startTime} - {result.endTime}
            </Text>
          </View>

          {/* Metadata */}
          <View style={styles.resultMetaRow}>
            <View style={styles.resultMetaItem}>
              <Ionicons
                name="school-outline"
                size={12}
                color={COLORS.textLight}
              />
              <Text style={styles.resultMetaText}>{result.className}</Text>
            </View>
            <View style={styles.resultMetaDivider} />
            <View style={styles.resultMetaItem}>
              <Ionicons
                name="layers-outline"
                size={12}
                color={COLORS.textLight}
              />
              <Text style={styles.resultMetaText}>
                Section {result.section}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultWrapper: {
    marginTop: SPACING.md,
  },
  resultCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primary + "30",
    ...SHADOWS.medium,
    overflow: "hidden",
  },
  resultAccent: {
    height: 3,
    backgroundColor: COLORS.primary,
    width: "100%",
  },
  resultContent: {
    padding: SPACING.md,
  },
  resultBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.md,
    alignSelf: "flex-start",
    gap: 4,
    marginBottom: SPACING.xs,
  },
  resultBadgeDot: {
    width: 5,
    height: 5,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.white,
  },
  resultBadgeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  resultTeacherSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  resultAvatar: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  resultAvatarText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  resultTeacherInfo: {
    flex: 1,
  },
  resultTeacherName: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  resultSubjectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 1,
  },
  resultSubjectDot: {
    width: 5,
    height: 5,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.primary,
  },
  resultSubjectText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
  },
  resultTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  resultTimeIcon: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  resultTimeText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
    flex: 1,
  },
  resultMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  resultMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  resultMetaDivider: {
    width: 1,
    height: 12,
    backgroundColor: COLORS.border,
  },
  resultMetaText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
  },
});

export default TeacherResultCard;
