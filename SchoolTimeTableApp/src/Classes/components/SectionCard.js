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

const SectionCard = ({ section }) => {
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
