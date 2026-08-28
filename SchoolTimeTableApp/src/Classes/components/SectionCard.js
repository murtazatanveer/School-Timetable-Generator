import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import SubjectCard from "./SubjectCard";

const SectionCard = ({ section, classTeacher }) => {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionBadge}>
          <Ionicons name="layers-outline" size={14} color={COLORS.white} />
          <Text style={styles.sectionBadgeText}>Section {section.name}</Text>
        </View>
        <View style={styles.subjectCount}>
          <Ionicons
            name="book-outline"
            size={14}
            color={COLORS.textSecondary}
          />
          <Text style={styles.subjectCountText}>
            {section.subjects.length} Subjects
          </Text>
        </View>
      </View>

      {/* Class Teacher Info */}
      {classTeacher && (
        <View style={styles.classTeacherContainer}>
          <View style={styles.classTeacherBadge}>
            <Ionicons name="ribbon-outline" size={14} color={COLORS.primary} />
            <Text style={styles.classTeacherLabel}>Class Teacher</Text>
          </View>
          <Text style={styles.classTeacherName}>{classTeacher}</Text>
        </View>
      )}

      <View style={styles.sectionDivider} />

      <View style={styles.subjectsList}>
        {section.subjects.map((subject, index) => (
          <SubjectCard key={index} subject={subject} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.sm,
    borderWidth: 1.5,
    borderColor: COLORS.primary + "40",
    ...SHADOWS.medium,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  sectionBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
    gap: 4,
  },
  sectionBadgeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  subjectCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  subjectCountText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
  },
  classTeacherContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 4,
    paddingHorizontal: 2,
    backgroundColor: COLORS.primaryFade,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
  },
  classTeacherBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  classTeacherLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.primary,
  },
  classTeacherName: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: COLORS.primary + "20",
    marginVertical: SPACING.xs,
  },
  subjectsList: {
    gap: 6,
  },
});

export default SectionCard;
