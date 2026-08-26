import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import InfoItem from "./InfoItem";

const InfoCard = ({ title, items, actionButton }) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <View style={styles.sectionDivider} />
      </View>

      <View style={styles.card}>
        {items.map((item, index) => (
          <View key={index}>
            <InfoItem icon={item.icon} label={item.label} value={item.value} />
            {index < items.length - 1 && <View style={styles.infoDivider} />}
          </View>
        ))}
        {actionButton && (
          <>
            <View style={styles.actionDivider} />
            {actionButton}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionDot: {
    width: 4,
    height: 16,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.primary,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: SPACING.sm,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  infoDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  actionDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
});

export default InfoCard;
