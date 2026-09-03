import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../../Theme/colors";
import DropdownPicker from "../../common/DropdownPicker";
import AppButton from "../../../common/AppButton/AppButton";

const AssignmentForm = ({
  newAssignment,
  uniqueSubjects,
  classData,
  availableClasses,
  availableSections,
  onAssignmentChange,
  onAddAssignment,
  disabled = false,
}) => {
  // State for dynamic options
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);

  // Update subject options (NO frequency in label)
  useEffect(() => {
    const options = uniqueSubjects.map((item) => ({
      label: item.subject, // ✅ Removed frequency from label
      value: item.subject,
    }));
    setSubjectOptions(options);
  }, [uniqueSubjects]);

  // Update class options
  useEffect(() => {
    if (newAssignment.subject) {
      const options = availableClasses.map((cls) => ({
        label: cls.name,
        value: cls.name,
      }));
      setClassOptions(options);
    } else {
      setClassOptions([]);
    }
  }, [newAssignment.subject, availableClasses]);

  // Update section options
  useEffect(() => {
    if (newAssignment.subject && newAssignment.className) {
      const options = availableSections.map((section) => ({
        label: `Section ${section}`,
        value: section,
      }));
      setSectionOptions(options);
    } else {
      setSectionOptions([]);
    }
  }, [newAssignment.subject, newAssignment.className, availableSections]);

  // Handle subject selection
  const handleSubjectSelect = (field, value) => {
    onAssignmentChange(field, value);
  };

  // Handle class selection
  const handleClassSelect = (field, value) => {
    onAssignmentChange(field, value);
  };

  // Handle section selection
  const handleSectionSelect = (field, value) => {
    onAssignmentChange(field, value);
  };

  return (
    <View
      style={[styles.assignmentForm, disabled && styles.assignmentFormDisabled]}
    >
      {/* ===== HEADER ===== */}
      <View style={styles.formHeader}>
        <View style={styles.formHeaderIcon}>
          <Ionicons name="book-outline" size={20} color={COLORS.white} />
        </View>
        <View style={styles.formHeaderText}>
          <Text style={styles.formHeaderTitle}>Add New Assignment</Text>
          <Text style={styles.formHeaderSubtitle}>
            Configure subject, class, and section
          </Text>
        </View>
      </View>

      {/* ===== BODY ===== */}
      <View style={styles.formBody}>
        {/* Subject Dropdown */}
        <View style={styles.fieldGroup}>
          <View style={styles.fieldLabelRow}>
            <View style={styles.fieldLabelIcon}>
              <Ionicons name="book-outline" size={14} color={COLORS.primary} />
            </View>
            <Text style={styles.fieldLabel}>Subject</Text>
          </View>
          <DropdownPicker
            field="subject"
            options={subjectOptions}
            value={newAssignment.subject}
            onSelect={handleSubjectSelect}
            placeholder="Select Subject"
            disabled={disabled || subjectOptions.length === 0}
            containerStyle={styles.dropdownContainer}
            showLabel={false}
          />
        </View>

        {/* Class Dropdown */}
        <View style={styles.fieldGroup}>
          <View style={styles.fieldLabelRow}>
            <View style={styles.fieldLabelIcon}>
              <Ionicons
                name="school-outline"
                size={14}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.fieldLabel}>Class</Text>
          </View>
          <DropdownPicker
            field="className"
            options={classOptions}
            value={newAssignment.className}
            onSelect={handleClassSelect}
            placeholder="Select Class"
            disabled={
              disabled || !newAssignment.subject || classOptions.length === 0
            }
            containerStyle={styles.dropdownContainer}
            showLabel={false}
          />
        </View>

        {/* Section Dropdown */}
        <View style={styles.fieldGroup}>
          <View style={styles.fieldLabelRow}>
            <View style={styles.fieldLabelIcon}>
              <Ionicons
                name="layers-outline"
                size={14}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.fieldLabel}>Section</Text>
          </View>
          <DropdownPicker
            field="section"
            options={sectionOptions}
            value={newAssignment.section}
            onSelect={handleSectionSelect}
            placeholder="Select Section"
            disabled={
              disabled ||
              !newAssignment.className ||
              sectionOptions.length === 0
            }
            containerStyle={styles.dropdownContainer}
            showLabel={false}
          />
        </View>

        {/* ===== CLASS TEACHER SWITCH ===== */}
        <View style={styles.switchContainer}>
          <View style={styles.switchLeft}>
            <View
              style={[
                styles.switchIconContainer,
                newAssignment.isClassTeacher &&
                  styles.switchIconContainerActive,
              ]}
            >
              <Ionicons
                name={
                  newAssignment.isClassTeacher ? "ribbon" : "ribbon-outline"
                }
                size={18}
                color={
                  newAssignment.isClassTeacher
                    ? COLORS.white
                    : COLORS.textSecondary
                }
              />
            </View>
            <View style={styles.switchTextContainer}>
              <Text style={styles.switchLabel}>Class Teacher</Text>
              <Text style={styles.switchSubtext}>
                {newAssignment.isClassTeacher
                  ? "This teacher is assigned as class teacher"
                  : "Mark this teacher as class teacher"}
              </Text>
            </View>
          </View>
          <Switch
            value={newAssignment.isClassTeacher}
            onValueChange={(value) =>
              onAssignmentChange("isClassTeacher", value)
            }
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
            thumbColor={COLORS.white}
            disabled={disabled}
            style={styles.switch}
          />
        </View>
      </View>

      {/* ===== FOOTER ===== */}
      <View style={styles.formFooter}>
        <AppButton
          title="Add Assignment"
          icon="add-circle-outline"
          onPress={onAddAssignment}
          variant="primary"
          size="medium"
          fullWidth={true}
          style={styles.addAssignmentButton}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  assignmentForm: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    ...SHADOWS.small,
  },
  assignmentFormDisabled: {
    opacity: 0.6,
    backgroundColor: COLORS.backgroundGray,
  },

  // ===== HEADER =====
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryFade,
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary + "20",
  },
  formHeaderIcon: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
    ...SHADOWS.small,
  },
  formHeaderText: {
    flex: 1,
  },
  formHeaderTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.primaryDark,
  },
  formHeaderSubtitle: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // ===== BODY =====
  formBody: {
    padding: SPACING.md,
  },

  // Field Groups
  fieldGroup: {
    marginBottom: SPACING.md,
  },
  fieldLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  fieldLabelIcon: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.primaryFade,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.xs,
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
    flex: 1,
  },

  // ✅ REMOVED fieldSelectedBadge and fieldSelectedText styles

  dropdownContainer: {
    marginBottom: 0,
  },

  // ===== SWITCH =====
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  switchLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  switchIconContainer: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryFade,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  switchIconContainerActive: {
    backgroundColor: COLORS.primary,
  },
  switchTextContainer: {
    flex: 1,
  },
  switchLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  switchSubtext: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },

  // ===== FOOTER =====
  formFooter: {
    padding: SPACING.md,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.backgroundLight,
  },
  addAssignmentButton: {
    marginTop: SPACING.sm,
  },
});

export default AssignmentForm;
