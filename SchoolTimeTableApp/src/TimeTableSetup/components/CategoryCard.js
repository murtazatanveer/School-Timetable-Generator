import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const { width } = Dimensions.get("window");

const CategoryCard = ({ category }) => {
  return (
    <View style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <View style={styles.categoryIconContainer}>
          <Ionicons name={category.icon} size={22} color={COLORS.primary} />
        </View>
        <Text style={styles.categoryTitle}>{category.title}</Text>
      </View>
      <View style={styles.categoryItems}>
        {category.items.map((item, index) => (
          <View key={index} style={styles.categoryItem}>
            <View style={styles.categoryItemDot} />
            <Text style={styles.categoryItemText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: (width - SPACING.lg * 2 - SPACING.sm) / 2,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  categoryIconContainer: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryFade,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.xs,
  },
  categoryTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  categoryItems: {
    marginTop: SPACING.xxs,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
  },
  categoryItemDot: {
    width: 4,
    height: 4,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.primary,
    marginRight: SPACING.xs,
  },
  categoryItemText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

export default CategoryCard;
