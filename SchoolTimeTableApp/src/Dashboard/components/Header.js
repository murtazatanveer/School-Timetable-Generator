import {
  View,
  Text,
  StyleSheet,
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
import { getInitials } from "../../common/utils/helper";

const Header = ({ teacherName, greeting, slideAnim }) => {
  return (
    <Animated.View
      style={[styles.header, { transform: [{ translateY: slideAnim }] }]}
    >
      <View style={styles.headerLeft}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{getInitials(teacherName)}</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.teacherName}>{teacherName}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.notificationButton}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={COLORS.textPrimary}
        />
        <View style={styles.notificationBadge} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
    ...SHADOWS.medium,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  headerTextContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  teacherName: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginTop: -2,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.error,
  },
});

export default Header;
