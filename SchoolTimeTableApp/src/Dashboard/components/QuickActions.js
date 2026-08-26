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

const QuickActions = ({ navigation, slideAnim }) => {
  return (
    <Animated.View
      style={[styles.section, { transform: [{ translateY: slideAnim }] }]}
    >
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionCardFull}
          onPress={() => navigation?.navigate("Timetable")}
        >
          <View style={styles.actionIconContainerFull}>
            <Ionicons name="calendar-outline" size={28} color={COLORS.white} />
          </View>
          <Text style={styles.actionCardFullText}>View Timetable</Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color={COLORS.white}
            style={styles.actionArrow}
          />
        </TouchableOpacity>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionCardHalf}
            onPress={() => navigation?.navigate("DataEntry")}
          >
            <View style={styles.actionIconContainerHalf}>
              <Ionicons
                name="create-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.actionCardHalfText}>Create New</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCardHalf}
            onPress={() => navigation?.navigate("DataEntry")}
          >
            <View style={styles.actionIconContainerHalf}>
              <Ionicons
                name="pencil-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.actionCardHalfText}>Edit Data</Text>
          </TouchableOpacity>
        </View>
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
  actionsContainer: {
    flexDirection: "column",
  },
  actionCardFull: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.medium,
  },
  actionIconContainerFull: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  actionCardFullText: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.white,
  },
  actionArrow: {
    marginLeft: SPACING.xs,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionCardHalf: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    alignItems: "center",
    marginHorizontal: SPACING.xxs,
    ...SHADOWS.small,
  },
  actionIconContainerHalf: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryFade,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  actionCardHalfText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
  },
});

export default QuickActions;
