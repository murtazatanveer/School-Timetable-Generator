import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import { formatTime, formatDate, formatDay } from "../utils/helpers";

const HeaderCard = ({ currentTime, currentDayData, timeAnim }) => {
  const getTotalSlots = () => {
    return currentDayData.filter((s) => !s.isBreak).length;
  };

  return (
    <View style={styles.headerCard}>
      <View style={styles.headerTopRow}>
        <View style={styles.headerTimeSection}>
          <Animated.Text
            style={[
              styles.headerTime,
              {
                transform: [
                  {
                    scale: timeAnim
                      ? timeAnim.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [1, 1.02, 1],
                        })
                      : 1,
                  },
                ],
              },
            ]}
          >
            {formatTime(currentTime)}
          </Animated.Text>
        </View>
        <View style={styles.headerRightSection}>
          <Text style={styles.headerDate}>{formatDate(currentTime)}</Text>
          <View style={styles.headerDayBadge}>
            <View style={styles.slotsBadge}>
              <Ionicons
                name="time-outline"
                size={12}
                color={COLORS.textLight}
              />
              <Text style={styles.slotsBadgeText}>{getTotalSlots()} Slots</Text>
            </View>
            <Ionicons
              name="calendar-outline"
              size={14}
              color={COLORS.primary}
            />
            <Text style={styles.headerDay}>{formatDay(currentTime)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    paddingVertical: SPACING.sm,
    marginTop: SPACING.md,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTimeSection: {
    flex: 1,
  },
  headerTime: {
    fontSize: TYPOGRAPHY.sizes.xxxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    letterSpacing: -0.5,
    lineHeight: 38,
  },
  headerRightSection: {
    alignItems: "flex-end",
  },
  headerDate: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 2,
  },
  headerDayBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerDay: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
  slotsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryFade,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    gap: 3,
  },
  slotsBadgeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.primary,
  },
});

export default HeaderCard;
