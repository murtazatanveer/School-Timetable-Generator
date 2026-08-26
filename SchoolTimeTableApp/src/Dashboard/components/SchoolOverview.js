import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import { getOrdinalSuffix } from "../utils/helpers";

const SchoolOverview = ({ schoolConfig, slideAnim }) => {
  return (
    <Animated.View
      style={[styles.section, { transform: [{ translateY: slideAnim }] }]}
    >
      <Text style={styles.sectionTitle}>School Overview</Text>
      <View style={styles.overviewCard}>
        <View style={styles.overviewRow}>
          <View style={styles.overviewItem}>
            <Ionicons
              name="business-outline"
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.overviewLabel}>School</Text>
            <Text style={[styles.overviewValue, styles.centeredText]}>
              {schoolConfig.name}
            </Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewItem}>
            <Ionicons
              name="document-text-outline"
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.overviewLabel}>EMIS Code</Text>
            <Text style={[styles.overviewValue, styles.centeredText]}>
              {schoolConfig.emisCode}
            </Text>
          </View>
        </View>
        <View style={styles.overviewRow}>
          <View style={styles.overviewItem}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.overviewLabel}>Working Days</Text>
            <Text style={[styles.overviewValue, styles.centeredText]}>
              {schoolConfig.workingDays}
            </Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewItem}>
            <Ionicons name="time-outline" size={20} color={COLORS.primary} />
            <Text style={styles.overviewLabel}>Daily Slots</Text>
            <Text style={[styles.overviewValue, styles.centeredText]}>
              {schoolConfig.dailySlots}
            </Text>
          </View>
        </View>
        <View style={styles.overviewBreak}>
          <Ionicons name="cafe-outline" size={20} color={COLORS.primary} />
          <Text style={styles.overviewBreakText}>
            Break after {schoolConfig.breakAfterSlot}
            {getOrdinalSuffix(schoolConfig.breakAfterSlot)} slot
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  overviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  overviewRow: {
    flexDirection: "row",
    paddingVertical: SPACING.xs,
  },
  overviewItem: {
    flex: 1,
    alignItems: "center",
  },
  overviewLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textLight,
    marginTop: 2,
  },
  overviewValue: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    marginTop: 1,
  },
  centeredText: {
    textAlign: "center",
  },
  overviewDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  overviewBreak: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.xs,
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  overviewBreakText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xxs,
  },
});

export default SchoolOverview;
