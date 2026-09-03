import {
  View,
  Text,
  StyleSheet,
  TextInput,
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
import SubjectTag from "./SubjectTag";
import SectionTag from "./SectionTag";
import AppButton from "../../../common/AppButton/AppButton";

const ClassForm = ({
  currentClass,
  errors,
  isFormValid,
  onInputChange,
  onAddSubject,
  onRemoveSubject,
  onAddSection,
  onRemoveSection,
  onAddClass,
  isEditing,
  onCancelEdit,
}) => {
  const sectionOptions = ["A", "B", "C", "D", "E", "F", "G"].map((section) => ({
    label: `Section ${section}`,
    value: section,
  }));

  const handleAddSection = () => {
    onAddSection(currentClass.newSection);
  };

  // ✅ FIXED: Define FormSection OUTSIDE the component or use useCallback
  const renderFormSection = (icon, title, subtitle, children) => (
    <View style={styles.formSection}>
      <View style={styles.formSectionHeader}>
        <View style={styles.formSectionIcon}>
          <Ionicons name={icon} size={16} color={COLORS.primary} />
        </View>
        <View style={styles.formSectionTextContainer}>
          <Text style={styles.formSectionTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.formSectionSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {children}
    </View>
  );

  return (
    <View style={[styles.card, isEditing && styles.cardEditing]}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <View style={[styles.cardIcon, isEditing && styles.cardIconEditing]}>
            <Ionicons
              name={isEditing ? "pencil" : "add"}
              size={20}
              color={COLORS.white}
            />
          </View>
          <View style={styles.cardHeaderTextContainer}>
            <Text style={styles.cardTitle}>
              {isEditing ? "Edit Class" : "Add New Class"}
            </Text>
            <Text style={styles.cardSubtitle}>
              {isEditing
                ? "Update class details"
                : "Fill in the information below"}
            </Text>
          </View>
        </View>
        {isEditing && (
          <TouchableOpacity
            style={styles.cancelEditButton}
            onPress={onCancelEdit}
          >
            <Ionicons name="close" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.cardDivider} />

      {/* Class Name Section */}
      {renderFormSection(
        "school-outline",
        "Class Details",
        "Enter the class name",
        <View style={styles.inputWrapper}>
          <View
            style={[
              styles.inputContainer,
              errors.className && styles.inputError,
            ]}
          >
            <Ionicons
              name="create-outline"
              size={18}
              color={errors.className ? COLORS.error : COLORS.textLight}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="e.g., Class 6, Class 7"
              placeholderTextColor={COLORS.textLight}
              value={currentClass.name}
              onChangeText={(text) => onInputChange("name", text)}
            />
          </View>
          {errors.className && (
            <View style={styles.errorContainer}>
              <Ionicons
                name="alert-circle-outline"
                size={14}
                color={COLORS.error}
              />
              <Text style={styles.errorText}>{errors.className}</Text>
            </View>
          )}
        </View>,
      )}

      <View style={styles.sectionDivider} />

      {/* Subjects Section */}
      {renderFormSection(
        "book-outline",
        "Subjects",
        "Add subjects for this class",
        <View style={styles.inputWrapper}>
          <View style={styles.addRow}>
            <View style={[styles.inputContainer, styles.inputContainerSmall]}>
              <Ionicons
                name="book-outline"
                size={18}
                color={COLORS.textLight}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="e.g., Mathematics"
                placeholderTextColor={COLORS.textLight}
                value={currentClass.newSubject}
                onChangeText={(text) => onInputChange("newSubject", text)}
                returnKeyType="done"
                onSubmitEditing={onAddSubject}
              />
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={onAddSubject}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {currentClass.subjects.length > 0 && (
            <View style={styles.tagContainer}>
              {currentClass.subjects.map((subject) => (
                <SubjectTag
                  key={subject}
                  subject={subject}
                  onRemove={onRemoveSubject}
                />
              ))}
            </View>
          )}

          {errors.subjects && (
            <View style={styles.errorContainer}>
              <Ionicons
                name="alert-circle-outline"
                size={14}
                color={COLORS.error}
              />
              <Text style={styles.errorText}>{errors.subjects}</Text>
            </View>
          )}
        </View>,
      )}

      <View style={styles.sectionDivider} />

      {/* Sections Section */}
      {renderFormSection(
        "layers-outline",
        "Sections",
        "Add sections for this class",
        <View style={styles.inputWrapper}>
          <View style={styles.addRow}>
            <View style={styles.inputContainerSmall}>
              <DropdownPicker
                field="newSection"
                options={sectionOptions}
                value={currentClass.newSection}
                placeholder="Select Section"
                onSelect={(field, value) => onInputChange(field, value)}
                containerStyle={styles.dropdownContainer}
                showLabel={false}
              />
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddSection}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {currentClass.sections.length > 0 && (
            <View style={styles.tagContainer}>
              {currentClass.sections.map((section) => (
                <SectionTag
                  key={section}
                  section={section}
                  onRemove={onRemoveSection}
                />
              ))}
            </View>
          )}

          {errors.sections && (
            <View style={styles.errorContainer}>
              <Ionicons
                name="alert-circle-outline"
                size={14}
                color={COLORS.error}
              />
              <Text style={styles.errorText}>{errors.sections}</Text>
            </View>
          )}
        </View>,
      )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <AppButton
          title={isEditing ? "Update Class" : "Add Class"}
          icon={isEditing ? "checkmark-circle-outline" : "add-circle-outline"}
          onPress={onAddClass}
          disabled={!isFormValid}
          fullWidth={true}
          style={[
            styles.addClassButton,
            !isFormValid && styles.addClassButtonDisabled,
          ]}
        />
        {isEditing && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancelEdit}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
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
  cardEditing: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    ...SHADOWS.large,
  },

  // Card Header
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
    ...SHADOWS.small,
  },
  cardIconEditing: {
    backgroundColor: COLORS.primaryDark,
  },
  cardHeaderTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  cardSubtitle: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  cancelEditButton: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.backgroundGray,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SPACING.sm,
  },
  cardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.lg,
  },

  // Form Sections
  formSection: {
    marginBottom: SPACING.md,
  },
  formSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  formSectionIcon: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryFade,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  formSectionTextContainer: {
    flex: 1,
  },
  formSectionTitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  formSectionSubtitle: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
    opacity: 0.5,
  },

  // Input Styles
  inputWrapper: {
    marginBottom: SPACING.sm,
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
  inputContainerSmall: {
    flex: 1,
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

  // Add Row
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },
  dropdownContainer: {
    flex: 1,
    marginBottom: 0,
  },

  // Tag Container
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.xs,
    marginTop: SPACING.sm,
  },

  // Action Buttons
  actionButtons: {
    marginTop: SPACING.lg,
  },
  addClassButton: {
    marginBottom: SPACING.sm,
  },
  addClassButtonDisabled: {
    opacity: 0.6,
  },
  cancelButton: {
    paddingVertical: SPACING.sm,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

export default ClassForm;
