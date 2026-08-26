import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const DaySelector = ({ days, selectedDay, onSelectDay }) => {
  return (
    <View style={styles.daySection}>
      <View style={styles.mainCard}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayScrollContent}
        >
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDay === day && styles.dayButtonActive,
              ]}
              onPress={() => onSelectDay(day)}
            >
              <Text
                style={[
                  styles.dayButtonText,
                  selectedDay === day && styles.dayButtonTextActive,
                ]}
              >
                {day}
              </Text>
              {selectedDay === day && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  daySection: {
    marginTop: SPACING.md,
  },
  mainCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.sm,
    paddingVertical: SPACING.xs,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dayScrollContent: {
    paddingVertical: 2,
    gap: SPACING.sm,
  },
  dayButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.backgroundLight,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
    position: "relative",
    minWidth: 70,
    alignItems: "center",
  },
  dayButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    ...SHADOWS.small,
  },
  dayButtonText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
  dayButtonTextActive: {
    color: COLORS.white,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  activeIndicator: {
    position: "absolute",
    bottom: -3,
    width: 5,
    height: 5,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.primary,
  },
});

export default DaySelector;
