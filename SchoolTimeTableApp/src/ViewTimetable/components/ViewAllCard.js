import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const ViewAllCard = ({ slot, onPress }) => {
  return (
    <TouchableOpacity style={styles.viewAllCard} onPress={onPress}>
      <Ionicons name="eye-outline" size={18} color={COLORS.primary} />
      <Text style={styles.viewAllCardText}>View All</Text>
      <Text style={styles.viewAllCardCount}>{slot.lectures.length}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewAllCard: {
    width: 110,
    backgroundColor: COLORS.primaryFade,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.sm,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderStyle: "dashed",
    ...SHADOWS.small,
    minHeight: 80,
  },
  viewAllCardText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.primary,
    marginTop: 2,
  },
  viewAllCardCount: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    marginTop: 1,
  },
});

export default ViewAllCard;
