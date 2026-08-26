import { View, Text, StyleSheet, Animated } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../../Theme/colors";
import { setupCategories } from "../utils/setupData";
import CategoryCard from "./CategoryCard";

const InfoSection = ({ fadeAnim, slideUpAnim }) => {
  return (
    <Animated.View
      style={[
        styles.infoSection,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideUpAnim }],
        },
      ]}
    >
      <View style={styles.infoHeader}>
        <Text style={styles.infoTitle}>What You'll Need</Text>
        <Text style={styles.infoSubtitle}>
          Prepare the following information to create your timetable
        </Text>
      </View>

      <View style={styles.categoriesGrid}>
        {setupCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    marginTop: SPACING.md,
  },
  infoHeader: {
    marginBottom: SPACING.md,
  },
  infoTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  infoSubtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default InfoSection;
