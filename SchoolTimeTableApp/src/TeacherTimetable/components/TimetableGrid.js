import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import TimetableCell from "./TimetableCell";

const TimetableGrid = ({ days, slots, timetable }) => {
  return (
    <View style={styles.timetableContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={styles.gridContainer}>
          {/* Header Row */}
          <View style={styles.gridRow}>
            <View style={[styles.gridHeaderCell, styles.dayHeaderCell]}>
              <Text style={styles.dayHeaderText}>Days</Text>
            </View>
            {slots.map((_, index) => (
              <View key={index} style={styles.gridHeaderCell}>
                <Text style={styles.slotNumberText}>Slot {index + 1}</Text>
                <Text style={styles.slotTimeText}>
                  {timetable.Monday[index]?.time || ""}
                </Text>
              </View>
            ))}
          </View>

          {/* Data Rows */}
          {days.map((day, dayIndex) => (
            <View key={dayIndex} style={styles.gridRow}>
              <View style={[styles.gridDayCell, styles.dayCell]}>
                <Text style={styles.dayNameText}>{day}</Text>
              </View>
              {slots.map((_, slotIndex) => (
                <View key={slotIndex} style={styles.gridCell}>
                  <TimetableCell data={timetable[day][slotIndex]} />
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  timetableContainer: {
    marginTop: SPACING.md,
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  gridContainer: {
    padding: SPACING.xs,
  },
  gridRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  gridHeaderCell: {
    width: 90,
    paddingVertical: SPACING.sm,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    backgroundColor: COLORS.primaryFade,
  },
  dayHeaderCell: {
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 4,
  },
  dayHeaderText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  slotNumberText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  slotTimeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  gridDayCell: {
    width: 90,
    paddingVertical: SPACING.sm,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  dayCell: {
    backgroundColor: COLORS.backgroundLight,
  },
  dayNameText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
  gridCell: {
    width: 90,
    minHeight: 70,
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TimetableGrid;
