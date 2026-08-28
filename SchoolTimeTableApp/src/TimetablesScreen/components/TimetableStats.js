import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const TimetableStats = ({ total, active, archived }) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>{total}</Text>
        <Text style={styles.statLabel}>Total Timetables</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>{active}</Text>
        <Text style={styles.statLabel}>Active</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>{archived}</Text>
        <Text style={styles.statLabel}>Archived</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.border,
  },
});

export default TimetableStats;
