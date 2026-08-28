import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const TeacherHeader = ({ teacherCount, classTeacherCount, onSearchPress }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="people" size={28} color={COLORS.white} />
            </View>
            <View>
              <Text style={styles.headerTitle}>Teachers</Text>
              <View style={styles.headerStats}>
                <Text style={styles.headerStatsText}>
                  {classTeacherCount} Class Teachers
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.headerRight}>
            {/* Search Button */}
            <TouchableOpacity
              style={styles.searchButton}
              onPress={onSearchPress}
              activeOpacity={0.7}
            >
              <Ionicons name="search-outline" size={22} color={COLORS.white} />
            </TouchableOpacity>

            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>{teacherCount}</Text>
            </View>
          </View>
        </View>

        <View style={styles.headerBottom}>
          <Text style={styles.headerSubtitle}>
            View all teachers and their subject assignments
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: -SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.small,
    overflow: "hidden",
  },
  headerContent: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  headerStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  headerStatsText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  statsDot: {
    width: 3,
    height: 3,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.textLight,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },
  headerBadge: {
    backgroundColor: COLORS.primaryFade,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.lg,
    minWidth: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary + "20",
  },
  headerBadgeText: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  headerBottom: {
    marginTop: SPACING.sm,
    paddingTop: SPACING.xs,
    borderTopWidth: 0,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

export default TeacherHeader;
