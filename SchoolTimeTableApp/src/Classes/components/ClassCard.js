import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import SectionCard from "./SectionCard";

const ClassCard = ({ classData, isExpanded, onToggle }) => {
  return (
    <View style={styles.classCard}>
      <TouchableOpacity
        style={styles.classHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={styles.classHeaderLeft}>
          <View style={styles.classIconContainer}>
            <Ionicons name="school-outline" size={22} color={COLORS.white} />
          </View>
          <View style={styles.classInfo}>
            <Text style={styles.className}>{classData.name}</Text>
          </View>
        </View>
        <View style={styles.classHeaderRight}>
          <View style={styles.sectionCountBadge}>
            <Text style={styles.sectionCountText}>
              {classData.sections.length}
            </Text>
          </View>
          <View style={styles.expandButton}>
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color={isExpanded ? COLORS.white : COLORS.primary}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.classContent}>
          {classData.sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  classCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    ...SHADOWS.medium,
    overflow: "hidden",
  },
  classHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
  },
  classHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    flex: 1,
  },
  classIconContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  classHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  sectionCountBadge: {
    backgroundColor: COLORS.primaryFade,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary + "20",
    minWidth: 30,
    alignItems: "center",
  },
  sectionCountText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  expandButton: {
    width: 34,
    height: 34,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryFade,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary + "20",
  },
  classContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    paddingTop: SPACING.xs,
  },
});

export default ClassCard;
