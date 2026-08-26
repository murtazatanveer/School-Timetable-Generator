import { View, Text, StyleSheet, ScrollView, Animated } from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import TeacherCard from "./TeacherCard";
import BreakSlot from "./BreakSlot";
import ViewAllCard from "./ViewAllCard";

const SlotCard = ({ item, onViewAllPress, liveBlinkAnim }) => {
  const isCurrent = item.isCurrent || false;
  const showViewAll = item.lectures.length > 3;

  if (item.isBreak) {
    return <BreakSlot item={item} />;
  }

  const displayedLectures = showViewAll
    ? item.lectures.slice(0, 3)
    : item.lectures;

  return (
    <View
      style={[styles.slotContainer, isCurrent && styles.currentSlotContainer]}
    >
      {/* Accent Bar */}
      <View style={[styles.accentBar, isCurrent && styles.accentBarCurrent]} />

      <View style={styles.slotHeader}>
        <View style={styles.slotTimeContainer}>
          <View
            style={[
              styles.slotTimeBadge,
              isCurrent && styles.slotTimeBadgeCurrent,
            ]}
          >
            <Text
              style={[styles.slotTime, isCurrent && styles.slotTimeCurrent]}
            >
              {item.time} – {item.endTime}
            </Text>
          </View>
        </View>
        <View style={styles.slotRightContainer}>
          {isCurrent ? (
            <Animated.View
              style={[styles.currentBadge, { opacity: liveBlinkAnim }]}
            >
              <View style={styles.currentDot} />
              <Text style={styles.currentBadgeText}>Live</Text>
            </Animated.View>
          ) : (
            <View style={styles.slotNumberContainer}>
              <Text style={styles.slotNumber}>Slot {item.slot}</Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.lecturesScrollContent}
        style={styles.lecturesScroll}
      >
        {displayedLectures.map((lecture, index) => (
          <View key={index} style={styles.lectureCardWrapper}>
            <TeacherCard lecture={lecture} index={index} />
          </View>
        ))}
        {showViewAll && (
          <ViewAllCard slot={item} onPress={() => onViewAllPress(item)} />
        )}
      </ScrollView>

      {/* Bottom Border Accent */}
      <View
        style={[styles.bottomAccent, isCurrent && styles.bottomAccentCurrent]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slotContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
    borderWidth: 2,
    borderColor: COLORS.border,
    overflow: "hidden",
    position: "relative",
  },
  currentSlotContainer: {
    borderColor: COLORS.primary,
    borderWidth: 2.5,
    ...SHADOWS.large,
  },
  accentBar: {
    height: 4,
    backgroundColor: COLORS.primary,
    width: "100%",
  },
  accentBarCurrent: {
    backgroundColor: COLORS.error,
  },
  slotHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.backgroundLight,
  },
  slotTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  slotTimeBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
  },
  slotTimeBadgeCurrent: {
    backgroundColor: COLORS.error,
  },
  slotTime: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  slotTimeCurrent: {
    color: COLORS.white,
  },
  slotRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  slotNumberContainer: {
    backgroundColor: COLORS.primaryFade,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.md,
  },
  slotNumber: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  currentBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.md,
    gap: 4,
  },
  currentDot: {
    width: 6,
    height: 6,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.white,
  },
  currentBadgeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.white,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  lecturesScroll: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  lecturesScrollContent: {
    gap: SPACING.sm,
    paddingHorizontal: 4,
  },
  lectureCardWrapper: {
    flexDirection: "row",
  },
  bottomAccent: {
    height: 3,
    backgroundColor: COLORS.primary,
    width: "100%",
    opacity: 0.3,
  },
  bottomAccentCurrent: {
    backgroundColor: COLORS.error,
    opacity: 0.5,
  },
});

export default SlotCard;
