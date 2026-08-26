import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, TYPOGRAPHY } from "../../Theme/colors";

const EmptyState = ({ searchQuery }) => {
  return (
    <View style={styles.emptyState}>
      <Ionicons name="people-outline" size={64} color={COLORS.textLight} />
      <Text style={styles.emptyStateTitle}>No Teachers Found</Text>
      <Text style={styles.emptyStateSubtitle}>
        {searchQuery.length > 0
          ? `No teachers match "${searchQuery}"`
          : "No teachers available"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xxl,
  },
  emptyStateTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
  },
  emptyStateSubtitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: "center",
  },
});

export default EmptyState;
