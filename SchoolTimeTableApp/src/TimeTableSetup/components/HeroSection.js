import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const HeroSection = ({ spin, bounce, scaleIconAnim }) => {
  return (
    <View style={styles.heroSection}>
      {/* Decorative Circle Background */}
      <Animated.View
        style={[styles.decorativeCircle, { transform: [{ rotate: spin }] }]}
      >
        <View style={styles.decorativeCircleInner} />
      </Animated.View>

      {/* Main Calendar Icon with Animation */}
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [{ scale: scaleIconAnim }, { translateY: bounce }],
          },
        ]}
      >
        <View style={styles.iconWrapper}>
          <View style={styles.calendarIconBackground}>
            <Ionicons name="calendar-outline" size={42} color={COLORS.white} />
          </View>
          <View style={styles.calendarBadge}>
            <Text style={styles.calendarBadgeText}>📅</Text>
          </View>
        </View>
      </Animated.View>

      {/* Badge Section */}
      <View style={styles.badgeContainer}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>Setup Required</Text>
        </View>
      </View>

      <Text style={styles.heroTitle}>Your Timetable Is Waiting</Text>
      <Text style={styles.heroSubtitle}>
        You haven't created a timetable yet. Let's get started by setting up
        your school information.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    alignItems: "center",
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    position: "relative",
  },
  decorativeCircle: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    opacity: 0.3,
    top: 10,
  },
  decorativeCircleInner: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    opacity: 0.2,
    top: 20,
    left: 20,
  },
  iconContainer: {
    marginBottom: SPACING.sm,
    marginTop: SPACING.xs,
  },
  iconWrapper: {
    position: "relative",
  },
  calendarIconBackground: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.xxl,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  calendarBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.circle,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  calendarBadgeText: {
    fontSize: 14,
  },
  badgeContainer: {
    marginBottom: SPACING.xs,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryFade,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xxs,
    borderRadius: BORDER_RADIUS.md,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.primary,
    marginRight: SPACING.xs,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.primary,
  },
  heroTitle: {
    fontSize: TYPOGRAPHY.sizes.xxxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.xs,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: SPACING.md,
  },
});

export default HeroSection;
