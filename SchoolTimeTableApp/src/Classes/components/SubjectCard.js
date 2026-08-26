import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const SubjectCard = ({ subject }) => {
  return (
    <View style={styles.subjectCard}>
      <View style={styles.subjectCardContent}>
        <View style={styles.subjectCardLeft}>
          <Text style={styles.subjectName}>{subject.name}</Text>
        </View>
        <View style={styles.subjectCardRight}>
          <View style={styles.teacherChip}>
            <Ionicons name="person-outline" size={12} color={COLORS.primary} />
            <Text style={styles.teacherName}>{subject.teacher}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subjectCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    marginVertical: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
    overflow: "hidden",
  },
  subjectCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  subjectCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  subjectName: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
  },
  subjectCardRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  teacherChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryFade,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
    gap: 4,
  },
  teacherName: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

export default SubjectCard;
