import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const ClassOverview = ({ classStructure, slideAnim }) => {
  const renderClassItem = ({ item }) => (
    <View style={styles.classItem}>
      <Text style={styles.className}>{item.name}</Text>
      <View style={styles.classSections}>
        <Ionicons name="layers-outline" size={16} color={COLORS.primary} />
        <Text style={styles.classSectionsText}>{item.sections} Sections</Text>
      </View>
    </View>
  );

  return (
    <Animated.View
      style={[styles.section, { transform: [{ translateY: slideAnim }] }]}
    >
      <Text style={styles.sectionTitle}>Class & Section Overview</Text>
      <View style={styles.classCard}>
        <FlatList
          data={classStructure}
          renderItem={renderClassItem}
          keyExtractor={(item) => item.name}
          scrollEnabled={false}
        />
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
  classCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.sm,
    ...SHADOWS.small,
  },
  classItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  className: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
  },
  classSections: {
    flexDirection: "row",
    alignItems: "center",
  },
  classSectionsText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xxs,
  },
});

export default ClassOverview;
