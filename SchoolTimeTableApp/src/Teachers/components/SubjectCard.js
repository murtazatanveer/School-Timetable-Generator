import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const SubjectCard = ({ subject, index }) => {
  return (
    <View style={styles.subjectCard}>
      <View style={styles.subjectCardHeader}>
        <View style={styles.subjectCardDot} />
        <Text style={styles.subjectCardName}>{subject.name}</Text>
      </View>
      <View style={styles.subjectCardDivider} />
      <View style={styles.subjectCardFooter}>
        <View style={styles.subjectCardMeta}>
          <Ionicons
            name="school-outline"
            size={12}
            color={COLORS.textSecondary}
          />
          <Text style={styles.subjectCardMetaText}>{subject.className}</Text>
        </View>
        <View style={styles.subjectCardMeta}>
          <Ionicons
            name="layers-outline"
            size={12}
            color={COLORS.textSecondary}
          />
          <Text style={styles.subjectCardMetaText}>Sec {subject.section}</Text>
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
    borderWidth: 1,
    borderColor: COLORS.primary + "30",
    ...SHADOWS.small,
  },
  subjectCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  subjectCardDot: {
    width: 6,
    height: 6,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.primary,
    marginRight: 6,
  },
  subjectCardName: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  subjectCardDivider: {
    height: 1,
    backgroundColor: COLORS.primary + "20",
    marginVertical: 4,
  },
  subjectCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subjectCardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  subjectCardMetaText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
  },
});

export default SubjectCard;
