import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import { subjectColors } from "../utils/mockData";

const TimetableSection = ({ currentPeriod, slideAnim, fadeAnim }) => {
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

  const renderScheduleItem = ({ item }) => {
    return (
      <Animated.View
        style={[
          styles.timetableCard,
          item.isCurrent && styles.timetableCardCurrent,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.timetableTimeSection}>
          <View style={styles.timetableTimeBadge}>
            <Text style={styles.timetablePeriod}>P{item.period}</Text>
          </View>
          <Text style={styles.timetableTime}>{item.time}</Text>
          {item.isCurrent && (
            <View style={styles.liveBadge}>
              <Animated.View
                style={[styles.liveDotPulse, { opacity: blinkAnim }]}
              />
              <Text style={styles.liveBadgeText}>LIVE</Text>
            </View>
          )}
        </View>

        <View style={styles.timetableEntries}>
          {item.entries.map((entry, index) => (
            <View key={index} style={styles.timetableEntry}>
              <View style={styles.timetableEntryLeft}>
                <View
                  style={[
                    styles.subjectColorDot,
                    {
                      backgroundColor:
                        subjectColors[index % subjectColors.length],
                    },
                  ]}
                />
                <View style={styles.timetableEntryContent}>
                  <Text
                    style={[
                      styles.timetableSubject,
                      item.isCurrent && styles.timetableSubjectCurrent,
                    ]}
                  >
                    {entry.subject}
                  </Text>
                  <Text style={styles.timetableTeacher}>{entry.teacher}</Text>
                </View>
              </View>
              <View style={styles.timetableEntryRight}>
                <View style={styles.timetableClassBadge}>
                  <Text style={styles.timetableClassText}>
                    {entry.className}
                  </Text>
                  <Text style={styles.timetableSectionText}>
                    {entry.section}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {item.isCurrent && <View style={styles.currentTimetableBar} />}
      </Animated.View>
    );
  };

  return (
    <Animated.View
      style={[styles.section, { transform: [{ translateY: slideAnim }] }]}
    >
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <Text style={styles.sectionTitle}>Today's Timetable</Text>
          <View style={styles.dayBadge}>
            <Text style={styles.dayBadgeText}>Monday</Text>
          </View>
        </View>
        <View style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
        </View>
      </View>
      {currentPeriod ? (
        <FlatList
          data={[currentPeriod]}
          renderItem={renderScheduleItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons
            name="calendar-outline"
            size={48}
            color={COLORS.textLight}
          />
          <Text style={styles.emptyStateText}>
            No live classes at the moment
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  dayBadge: {
    backgroundColor: COLORS.primaryFade,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    marginLeft: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  dayBadgeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginRight: 2,
  },
  timetableCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: "hidden",
    ...SHADOWS.medium,
  },
  timetableCardCurrent: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryFade,
    ...SHADOWS.large,
  },
  timetableTimeSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  timetableTimeBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    marginRight: SPACING.sm,
  },
  timetablePeriod: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  timetableTime: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.md,
  },
  liveDotPulse: {
    width: 6,
    height: 6,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.white,
    marginRight: 4,
  },
  liveBadgeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  timetableEntries: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  timetableEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.xs,
  },
  timetableEntryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  subjectColorDot: {
    width: 8,
    height: 8,
    borderRadius: BORDER_RADIUS.circle,
    marginRight: SPACING.sm,
  },
  timetableEntryContent: {
    flex: 1,
  },
  timetableSubject: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  timetableSubjectCurrent: {
    color: COLORS.primary,
  },
  timetableTeacher: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  timetableEntryRight: {
    marginLeft: SPACING.sm,
  },
  timetableClassBadge: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    alignItems: "center",
  },
  timetableClassText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
  },
  timetableSectionText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  currentTimetableBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderBottomLeftRadius: BORDER_RADIUS.lg,
  },
  emptyState: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xxl,
    alignItems: "center",
    ...SHADOWS.small,
  },
  emptyStateText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
});

export default TimetableSection;
