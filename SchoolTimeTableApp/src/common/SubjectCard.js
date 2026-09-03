import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../Theme/colors";

const SubjectCard = ({ name, className, section, isClassTeacher }) => {
  return (
    <View
      style={[
        styles.subjectCard,
        isClassTeacher && styles.subjectCardClassTeacher,
      ]}
    >
      {/* Header with Subject Name and Class Teacher Badge */}
      <View style={styles.subjectCardHeader}>
        <Text style={styles.subjectCardName} numberOfLines={1}>
          {name}
        </Text>
        {isClassTeacher && (
          <View style={styles.classTeacherBadge}>
            <Ionicons name="ribbon-outline" size={10} color={COLORS.white} />
            <Text style={styles.classTeacherBadgeText}>CT</Text>
          </View>
        )}
      </View>

      {/* Divider */}
      <View style={styles.subjectCardDivider} />

      {/* Footer with Class and Section */}
      <View style={styles.subjectCardFooter}>
        <View style={styles.subjectCardMeta}>
          <Ionicons
            name="school-outline"
            size={12}
            color={COLORS.textSecondary}
          />
          <Text style={styles.subjectCardMetaText} numberOfLines={1}>
            {className}
          </Text>
        </View>
        <View style={styles.subjectCardMeta}>
          <Ionicons
            name="layers-outline"
            size={12}
            color={COLORS.textSecondary}
          />
          <Text style={styles.subjectCardMetaText}>Sec {section}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subjectCard: {
    width: 140,
    backgroundColor: COLORS.primaryFade,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    ...SHADOWS.small,
  },
  subjectCardClassTeacher: {
    backgroundColor: COLORS.primaryFade,
    ...SHADOWS.medium,
  },

  // Header
  subjectCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  subjectCardName: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 4,
  },

  // Class Teacher Badge
  classTeacherBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    gap: 2,
  },
  classTeacherBadgeText: {
    fontSize: 9,
    color: COLORS.white,
    fontWeight: TYPOGRAPHY.weights.bold,
  },

  // Divider
  subjectCardDivider: {
    height: 1,
    backgroundColor: COLORS.primary + "20",
    marginVertical: 4,
  },

  // Footer
  subjectCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subjectCardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    flex: 1,
  },
  subjectCardMetaText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    flex: 1,
  },
});

export default SubjectCard;
