import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const BreakSlot = ({ item }) => {
  return (
    <View style={styles.breakSlot}>
      {/* Top Accent Bar */}
      <View style={styles.accentBar} />

      <View style={styles.breakSlotHeader}>
        <View style={styles.slotTimeContainer}>
          <View style={styles.breakTimeBadge}>
            <Text style={styles.breakTimeText}>
              {item.time} – {item.endTime}
            </Text>
          </View>
        </View>
        <View style={styles.breakSlotNumber}>
          <Ionicons name="cafe" size={16} color={COLORS.success} />
          <Text style={styles.breakSlotNumberText}>Break</Text>
        </View>
      </View>

      <View style={styles.breakContent}>
        <View style={styles.breakIconContainer}>
          <Ionicons name="cafe" size={40} color={COLORS.white} />
        </View>
        <View style={styles.breakTextContainer}>
          <Text style={styles.breakText}>Break Time</Text>
          <Text style={styles.breakSubText}>Take a refreshment break</Text>
        </View>
      </View>

      {/* Bottom Accent Bar */}
      <View style={styles.bottomAccent} />
    </View>
  );
};

const styles = StyleSheet.create({
  breakSlot: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.success + "50",
    overflow: "hidden",
    ...SHADOWS.medium,
    position: "relative",
  },
  accentBar: {
    height: 4,
    backgroundColor: COLORS.success,
    width: "100%",
  },
  breakSlotHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.success + "15",
    backgroundColor: COLORS.success + "06",
  },
  slotTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  breakTimeBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
  },
  breakTimeText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  breakSlotNumber: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.success + "15",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
    gap: 4,
  },
  breakSlotNumberText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.success,
  },
  breakContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.lg,
    gap: SPACING.md,
    backgroundColor: COLORS.white,
  },
  breakIconContainer: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.success,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },
  breakTextContainer: {
    flex: 1,
  },
  breakText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  breakSubText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  bottomAccent: {
    height: 3,
    backgroundColor: COLORS.success,
    width: "100%",
    opacity: 0.3,
  },
});

export default BreakSlot;
