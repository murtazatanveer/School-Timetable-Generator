import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import { getInitials } from "../utils/helpers";

// Extended mock data for testing - 15 teachers
const mockTeachers = [
  "Mr. Ahmed Khan",
  "Ms. Sara Ali",
  "Mr. Muhammad Usman",
  "Ms. Fatima Noor",
  "Dr. Usman Malik",
  "Mr. Khalid Mahmood",
  "Ms. Ayesha Tariq",
  "Mr. Hassan Raza",
  "Dr. Nadeem Shah",
  "Ms. Zara Ahmed",
  "Mr. Imran Qureshi",
  "Ms. Hira Khan",
  "Mr. Farhan Ali",
  "Ms. Kiran Shah",
  "Dr. Shahid Hussain",
];

const TeacherOverview = ({
  statistics,
  showTeachers,
  setShowTeachers,
  displayedTeachers,
  slideAnim,
}) => {
  const renderTeacherItem = ({ item }) => (
    <View style={styles.teacherItem}>
      <View style={styles.teacherAvatar}>
        <Text style={styles.teacherAvatarText}>{getInitials(item)}</Text>
      </View>
      <Text style={styles.teacherName}>{item}</Text>
    </View>
  );

  return (
    <Animated.View
      style={[styles.section, { transform: [{ translateY: slideAnim }] }]}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Teacher Overview</Text>
        {!showTeachers && (
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => setShowTeachers(true)}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>

      {!showTeachers ? (
        <View style={styles.teacherSummary}>
          <View style={styles.teacherSummaryItem}>
            <Text style={styles.teacherSummaryNumber}>
              {statistics.totalTeachers}
            </Text>
            <Text style={styles.teacherSummaryLabel}>Total Teachers</Text>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.teacherListWrapper}>
            <View style={styles.teacherListHeader}>
              <Ionicons
                name="people-outline"
                size={16}
                color={COLORS.primary}
              />
              <Text style={styles.teacherListHeaderText}>
                {mockTeachers.length} Teachers
              </Text>
              <View style={styles.scrollIndicator}>
                <Ionicons
                  name="swap-vertical-outline"
                  size={14}
                  color={COLORS.textLight}
                />
                <Text style={styles.scrollIndicatorText}>Scroll</Text>
              </View>
            </View>
            <View style={styles.teacherListContainer}>
              <FlatList
                data={mockTeachers}
                renderItem={renderTeacherItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={true}
                persistentScrollbar={true}
                contentContainerStyle={styles.teacherListContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </View>

          {/* Collapse/Rollback Button */}
          <TouchableOpacity
            style={styles.collapseButton}
            onPress={() => setShowTeachers(false)}
          >
            <Ionicons name="chevron-up" size={20} color={COLORS.primary} />
            <Text style={styles.collapseButtonText}>Show Less</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.viewAllTeachersButton}>
            <Text style={styles.viewAllTeachersText}>View All Teachers</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginRight: 2,
  },
  teacherSummary: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
    justifyContent: "center",
  },
  teacherSummaryItem: {
    alignItems: "center",
  },
  teacherSummaryNumber: {
    fontSize: TYPOGRAPHY.sizes.xxxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  teacherSummaryLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  teacherListWrapper: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    ...SHADOWS.small,
  },
  teacherListHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  teacherListHeaderText: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
  },
  scrollIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryFade,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  scrollIndicatorText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textLight,
    marginLeft: 2,
  },
  teacherListContainer: {
    maxHeight: 280,
    backgroundColor: COLORS.white,
  },
  teacherListContent: {
    paddingVertical: SPACING.xs,
  },
  teacherItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  teacherAvatar: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryFade,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  teacherAvatarText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  teacherName: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
  },
  collapseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  collapseButtonText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.primary,
    marginLeft: SPACING.xxs,
  },
  viewAllTeachersButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.sm,
    ...SHADOWS.small,
  },
  viewAllTeachersText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.primary,
    marginRight: SPACING.xxs,
  },
});

export default TeacherOverview;
