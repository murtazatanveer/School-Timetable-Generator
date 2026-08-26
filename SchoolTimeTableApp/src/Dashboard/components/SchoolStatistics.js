import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const SchoolStatistics = ({ statistics, slideAnim }) => {
  return (
    <Animated.View
      style={[styles.section, { transform: [{ translateY: slideAnim }] }]}
    >
      <Text style={styles.sectionTitle}>School Statistics</Text>
      <View style={styles.statsTable}>
        <View style={styles.statsRow}>
          <View style={styles.statCell}>
            <View style={styles.statIconContainer}>
              <Ionicons name="people-outline" size={22} color={COLORS.white} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statNumber}>{statistics.totalTeachers}</Text>
              <Text style={styles.statLabel}>Teachers</Text>
            </View>
          </View>
          <View style={styles.statCellDivider} />
          <View style={styles.statCell}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: COLORS.primaryLight },
              ]}
            >
              <Ionicons name="school-outline" size={22} color={COLORS.white} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statNumber}>{statistics.totalClasses}</Text>
              <Text style={styles.statLabel}>Classes</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRowDivider} />

        <View style={styles.statsRow}>
          <View style={styles.statCell}>
            <View
              style={[styles.statIconContainer, { backgroundColor: "#A0522D" }]}
            >
              <Ionicons name="layers-outline" size={22} color={COLORS.white} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statNumber}>{statistics.totalSections}</Text>
              <Text style={styles.statLabel}>Sections</Text>
            </View>
          </View>
          <View style={styles.statCellDivider} />
          <View style={styles.statCell}>
            <View
              style={[styles.statIconContainer, { backgroundColor: "#8B0000" }]}
            >
              <Ionicons name="book-outline" size={22} color={COLORS.white} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statNumber}>{statistics.totalSubjects}</Text>
              <Text style={styles.statLabel}>Subjects</Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  statsTable: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    overflow: "hidden",
    ...SHADOWS.small,
  },
  statsRow: {
    flexDirection: "row",
    paddingVertical: SPACING.md,
  },
  statsRowDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  statCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.sm,
  },
  statCellDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  statContent: {
    alignItems: "flex-start",
  },
  statNumber: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
});

export default SchoolStatistics;
