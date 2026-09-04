import { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const TimetableStatus = ({ timetableStatus, schoolConfig, scaleAnim }) => {
  // Animation for blinking live dot
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Blinking animation for the live dot
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[styles.statusCard, { transform: [{ scale: scaleAnim }] }]}
    >
      {/* Accent Bar */}
      <View style={styles.accentBar} />

      {/* Header Section with Status */}
      <View style={styles.headerSection}>
        <View style={styles.statusBadge}>
          <View style={styles.statusTextWrapper}>
            <Text style={styles.statusTitle}>
              {timetableStatus.isGenerated ? "Timetable Ready" : "No Timetable"}
            </Text>
            <Text style={styles.statusSubtitle}>
              {timetableStatus.isGenerated
                ? `Updated ${timetableStatus.lastUpdated}`
                : "Set up your school data"}
            </Text>
          </View>
        </View>
        {timetableStatus.isGenerated && (
          <View style={styles.liveIndicator}>
            <Animated.View style={[styles.livePulse, { opacity: blinkAnim }]} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        )}
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {/* Stat 1 - Working Days */}
        <View style={styles.statItemWrapper}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>{schoolConfig.workingDays}</Text>
              <Text style={styles.statLabel}>Working Days</Text>
            </View>
          </View>
        </View>

        {/* Stat 2 - Weekly Slots */}
        <View style={styles.statItemWrapper}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons name="time-outline" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>
                {timetableStatus.weeklySlots}
              </Text>
              <Text style={styles.statLabel}>Weekly Slots</Text>
            </View>
          </View>
        </View>

        {/* Stat 3 - Daily Slots */}
        <View style={styles.statItemWrapper}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons
                name="school-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>{schoolConfig.dailySlots}</Text>
              <Text style={styles.statLabel}>Daily Slots</Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  statusCard: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.large,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  accentBar: {
    height: 4,
    backgroundColor: COLORS.primary,
    width: "100%",
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusTextWrapper: {
    flex: 1,
  },
  statusTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  statusSubtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.success + "15",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
  },
  livePulse: {
    width: 8,
    height: 8,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.success,
    marginRight: 4,
  },
  liveText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.success,
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.backgroundLight,
    marginHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
    justifyContent: "space-between",
  },
  statItemWrapper: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 2,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
    ...SHADOWS.small,
    flexShrink: 0,
  },
  statContent: {
    alignItems: "flex-start",
    flexShrink: 1,
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textLight,
    marginTop: -1,
    lineHeight: 14,
  },
});

export default TimetableStatus;
