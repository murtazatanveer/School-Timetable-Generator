import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const ClassTeacherCard = ({ className, section, subject }) => {
  return (
    <View style={styles.classTeacherCard}>
      <View style={styles.classTeacherHeader}>
        <View style={styles.classTeacherIconContainer}>
          <Ionicons name="ribbon-outline" size={16} color={COLORS.white} />
        </View>
        <Text style={styles.classTeacherLabel}>Class Teacher</Text>
      </View>

      <View style={styles.classTeacherDivider} />

      <View style={styles.classTeacherContent}>
        {/* Subject Name - Primary */}
        {subject && (
          <View style={styles.classTeacherSubjectContainer}>
            <View style={styles.classTeacherSubjectDot} />
            <Text style={styles.classTeacherSubject}>{subject}</Text>
          </View>
        )}

        {/* Class and Section */}
        <View style={styles.classTeacherInfo}>
          <View style={styles.classTeacherDetail}>
            <Ionicons
              name="school-outline"
              size={12}
              color="rgba(255,255,255,0.7)"
            />
            <Text style={styles.classTeacherText}>{className}</Text>
          </View>
          <View style={styles.classTeacherDetail}>
            <Ionicons
              name="layers-outline"
              size={12}
              color="rgba(255,255,255,0.7)"
            />
            <Text style={styles.classTeacherText}>Section {section}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  classTeacherCard: {
    width: 140,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.primary,
    ...SHADOWS.small,
  },
  classTeacherHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  classTeacherIconContainer: {
    width: 20,
    height: 20,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  classTeacherLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  classTeacherDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: 4,
  },
  classTeacherContent: {
    marginTop: 2,
  },
  classTeacherSubjectContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  classTeacherSubjectDot: {
    width: 6,
    height: 6,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginRight: 6,
  },
  classTeacherSubject: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.white,
  },
  classTeacherInfo: {
    gap: 3,
  },
  classTeacherDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  classTeacherText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: "rgba(255,255,255,0.85)",
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

export default ClassTeacherCard;
