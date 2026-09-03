import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  SHADOWS,
  BORDER_RADIUS,
} from "../../Theme/colors";
import { useScheduleForm } from "./hooks/useScheduleForm";
import ScheduleForm from "./components/ScheduleForm";
import TimeSlotsPreview from "./components/TimeSlotsPreview";
import AppButton from "../../common/AppButton/AppButton";

const Interface1 = ({ data, onNext }) => {
  const {
    formData,
    errors,
    timeSlots,
    isFormValid,
    handleInputChange,
    handleNext,
  } = useScheduleForm(data, onNext);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Compact Header with Icon Badge */}
      <View style={styles.headerSection}>
        <View style={styles.iconBadge}>
          <Ionicons name="calendar" size={20} color={COLORS.white} />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.stepTitle}>Schedule Setup</Text>
          <Text style={styles.stepSubtitle}>
            Configure your timetable basics
          </Text>
        </View>
      </View>

      {/* Main Form */}
      <ScheduleForm
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
      />

      {/* Time Slots Preview (Only when available) */}
      {timeSlots.length > 0 && <TimeSlotsPreview timeSlots={timeSlots} />}

      {/* Action Button */}
      <AppButton
        title="Continue to Classes"
        icon="arrow-forward-outline"
        onPress={handleNext}
        disabled={!isFormValid}
        fullWidth={true}
        style={[styles.nextButton, !isFormValid && styles.nextButtonDisabled]}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
    ...SHADOWS.small,
  },
  headerTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  stepSubtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  nextButton: {
    marginTop: SPACING.lg,
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
});

export default Interface1;
