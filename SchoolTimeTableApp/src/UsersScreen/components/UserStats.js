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

const UserStats = ({ total, admins, teachers }) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Ionicons name="people-outline" size={20} color={COLORS.primary} />
        <Text style={styles.statNumber}>{total}</Text>
        <Text style={styles.statLabel}>Total Users</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statCard}>
        <Ionicons name="person-outline" size={20} color={COLORS.secondary} />
        <Text style={styles.statNumber}>{admins}</Text>
        <Text style={styles.statLabel}>Admins</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statCard}>
        <Ionicons name="school-outline" size={20} color={COLORS.primaryLight} />
        <Text style={styles.statNumber}>{teachers}</Text>
        <Text style={styles.statLabel}>Teachers</Text>
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
    gap: 4,
  },
  statNumber: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
});

export default UserStats;
