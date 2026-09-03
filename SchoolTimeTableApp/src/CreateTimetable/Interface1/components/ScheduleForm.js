import { View, Text, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../../Theme/colors";
import DropdownPicker from "../../common/DropdownPicker";

const ScheduleForm = ({ formData, errors, onInputChange }) => {
  const workingDaysOptions = Array.from({ length: 7 }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1),
  }));

  const slotsOptions = Array.from({ length: 14 }, (_, i) => ({
    label: String(i + 2),
    value: String(i + 2),
  }));

  const durationOptions = [
    10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
    105, 110, 115, 120,
  ].map((num) => ({
    label: String(num),
    value: String(num),
  }));

  const timeOptions = [
    "06:00 AM",
    "06:30 AM",
    "06:45 AM",
    "07:00 AM",
    "07:15 AM",
    "07:30 AM",
    "07:45 AM",
    "08:00 AM",
    "08:15 AM",
    "08:30 AM",
    "08:45 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
  ].map((time) => ({ label: time, value: time }));

  // Section Components
  const Section = ({ icon, title, subtitle }) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionIconContainer}>
        <Ionicons name={icon} size={18} color={COLORS.primary} />
      </View>
      <View style={styles.sectionTextContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.card}>
      {/* Section 1: Basic Information */}
      <Section
        icon="information-circle-outline"
        title="Basic Information"
        subtitle="Name your timetable"
      />

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Timetable Name</Text>
        <View
          style={[
            styles.inputContainer,
            errors.timetableName && styles.inputError,
          ]}
        >
          <Ionicons
            name="create-outline"
            size={18}
            color={errors.timetableName ? COLORS.error : COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="e.g., Spring Semester 2026"
            placeholderTextColor={COLORS.textLight}
            value={formData.timetableName}
            onChangeText={(text) => onInputChange("timetableName", text)}
          />
        </View>
        {errors.timetableName && (
          <View style={styles.errorContainer}>
            <Ionicons
              name="alert-circle-outline"
              size={14}
              color={COLORS.error}
            />
            <Text style={styles.errorText}>{errors.timetableName}</Text>
          </View>
        )}
      </View>

      {/* Section 2: Days & Slots */}
      <View style={styles.sectionDivider} />

      <Section
        icon="grid-outline"
        title="Days & Slots"
        subtitle="Set your weekly structure"
      />

      <DropdownPicker
        label="Working Days per Week"
        field="workingDays"
        options={workingDaysOptions}
        value={formData.workingDays}
        error={errors.workingDays}
        onSelect={onInputChange}
      />

      <DropdownPicker
        label="Slots per Day"
        field="slotsPerDay"
        options={slotsOptions}
        value={formData.slotsPerDay}
        error={errors.slotsPerDay}
        onSelect={onInputChange}
      />

      {/* Section 3: Break Settings */}
      <View style={styles.sectionDivider} />

      <Section
        icon="cafe-outline"
        title="Break Settings"
        subtitle="Configure your breaks"
      />

      <DropdownPicker
        label="Break After Which Slot"
        field="breakAfterSlot"
        options={slotsOptions}
        value={formData.breakAfterSlot}
        error={errors.breakAfterSlot}
        onSelect={onInputChange}
      />

      <DropdownPicker
        label="Break Duration (minutes)"
        field="breakDuration"
        options={durationOptions}
        value={formData.breakDuration}
        error={errors.breakDuration}
        onSelect={onInputChange}
      />

      {/* Section 4: Time Settings */}
      <View style={styles.sectionDivider} />

      <Section
        icon="time-outline"
        title="Time Settings"
        subtitle="Set your first slot and duration"
      />

      <DropdownPicker
        label="First Slot Starting Time"
        field="firstSlotTime"
        options={timeOptions}
        value={formData.firstSlotTime}
        error={errors.firstSlotTime}
        onSelect={onInputChange}
      />

      <DropdownPicker
        label="Slot Duration (minutes)"
        field="slotDuration"
        options={durationOptions}
        value={formData.slotDuration}
        error={errors.slotDuration}
        onSelect={onInputChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.medium,
  },

  // Section Header Styles
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  sectionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryFade,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  sectionTextContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  sectionSubtitle: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.lg,
    opacity: 0.5,
  },

  // Input Styles
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SPACING.sm,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textPrimary,
  },
  inputError: {
    borderColor: COLORS.error,
    backgroundColor: "#FFF5F5",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.xs,
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.error,
    marginLeft: 4,
  },
});

export default ScheduleForm;
