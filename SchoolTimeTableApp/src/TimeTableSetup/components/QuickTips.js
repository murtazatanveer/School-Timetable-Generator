import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from "../../Theme/colors";
import { quickTips } from "../utils/setupData";

const QuickTips = ({ fadeAnim, slideUpAnim }) => {
  return (
    <Animated.View
      style={[
        styles.tipsSection,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideUpAnim }],
        },
      ]}
    >
      <View style={styles.tipsCard}>
        <View style={styles.tipsHeader}>
          <Ionicons name="bulb-outline" size={20} color={COLORS.primary} />
          <Text style={styles.tipsTitle}>Quick Tips</Text>
        </View>
        {quickTips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <View style={styles.tipDot} />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tipsSection: {
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  tipsCard: {
    backgroundColor: COLORS.primaryFade,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  tipsTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: SPACING.xxs,
  },
  tipDot: {
    width: 5,
    height: 5,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.primary,
    marginTop: 7,
    marginRight: SPACING.sm,
  },
  tipText: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});

export default QuickTips;
