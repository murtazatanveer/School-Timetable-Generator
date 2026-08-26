import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const TeacherCard = ({ lecture, index, isBottomSheet = false }) => {
  return (
    <View style={[styles.teacherCard, isBottomSheet && styles.teacherCardFull]}>
      <View style={styles.teacherCardHeader}>
        <View style={styles.teacherAvatarContainer}>
          <Text style={styles.teacherAvatarText}>
            {lecture.teacher
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Text>
        </View>
        <View style={styles.teacherInfoContainer}>
          <Text style={styles.teacherName}>{lecture.teacher}</Text>
          <Text style={styles.teacherSubject}>{lecture.subject}</Text>
        </View>
      </View>

      <View style={styles.teacherCardDivider} />

      <View style={styles.teacherCardFooter}>
        <View style={styles.footerItem}>
          <Ionicons
            name="school-outline"
            size={14}
            color={COLORS.textSecondary}
          />
          <Text style={styles.footerItemText}>{lecture.className}</Text>
        </View>
        <View style={styles.footerDivider} />
        <View style={styles.footerItem}>
          <Ionicons
            name="layers-outline"
            size={14}
            color={COLORS.textSecondary}
          />
          <Text style={styles.footerItemText}>Sec {lecture.section}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  teacherCard: {
    width: 210,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary + "30",
    ...SHADOWS.medium,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  teacherCardFull: {
    width: "100%",
    maxWidth: "100%",
  },
  teacherCardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  teacherAvatarContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
    flexShrink: 0,
  },
  teacherAvatarText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  teacherInfoContainer: {
    flex: 1,
    paddingTop: 2,
  },
  teacherName: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  teacherSubject: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    alignSelf: "flex-start",
  },
  teacherCardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xs,
  },
  teacherCardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: SPACING.xs,
    marginTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerItemText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  footerDivider: {
    width: 1,
    height: 14,
    backgroundColor: COLORS.border,
  },
});

export default TeacherCard;
