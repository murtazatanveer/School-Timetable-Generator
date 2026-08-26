import { TouchableOpacity, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const CreateButton = ({ navigation, scaleAnim, fadeAnim }) => {
  return (
    <Animated.View
      style={[
        styles.buttonContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation?.navigate("DataEntry")}
        activeOpacity={0.8}
      >
        <Ionicons name="add-circle-outline" size={24} color={COLORS.white} />
        <Text style={styles.createButtonText}>Create Timetable</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: SPACING.md,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    ...SHADOWS.large,
  },
  createButtonText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.white,
    marginLeft: SPACING.sm,
    letterSpacing: 0.3,
  },
});

export default CreateButton;
