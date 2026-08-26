import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, BORDER_RADIUS, TYPOGRAPHY } from "../../Theme/colors";

const TimetableCell = ({ data }) => {
  const isBreak = data?.isBreak;
  const isEmpty = !data?.subject && !isBreak;

  if (isBreak) {
    return (
      <View style={styles.breakCell}>
        <Ionicons name="cafe-outline" size={16} color={COLORS.success} />
        <Text style={styles.breakCellText}>Break</Text>
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={styles.emptyCell}>
        <View style={styles.emptyCellContent}>
          <Ionicons name="happy-outline" size={18} color={COLORS.primary} />
          <Text style={styles.emptyCellText}>Free</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.occupiedCell}>
      <Text style={styles.cellSubject}>{data.subject}</Text>
      <Text style={styles.cellClass}>{data.class}</Text>
      <Text style={styles.cellSection}>Sec {data.section}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  occupiedCell: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  cellSubject: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  cellClass: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 1,
    textAlign: "center",
  },
  cellSection: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textLight,
    marginTop: 1,
    textAlign: "center",
  },
  emptyCell: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.primaryFade,
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: COLORS.primary + "30",
    minHeight: 60,
  },
  emptyCellContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  emptyCellText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.primary,
    letterSpacing: 0.3,
  },
  breakCell: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    gap: 2,
  },
  breakCellText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.success,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

export default TimetableCell;
