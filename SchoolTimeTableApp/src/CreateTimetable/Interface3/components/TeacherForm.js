import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../../Theme/colors";
import AssignmentForm from "./AssignmentForm";
import SubjectCard from "../../../common/SubjectCard";
import AppButton from "../../../common/AppButton/AppButton";

const TeacherForm = ({
  currentTeacher,
  errors,
  uniqueSubjects,
  classData,
  availableClasses,
  availableSections,
  isFormValid,
  onInputChange,
  onAddAssignment,
  onRemoveAssignment,
  onAssignmentChange,
  onAddTeacher,
  isEditing,
  onCancelEdit,
}) => {
  const isTeacherNameFilled = currentTeacher.name.trim().length > 0;
  const isAssignmentSectionDisabled = !isTeacherNameFilled;

  return (
    <View style={[styles.card, isEditing && styles.cardEditing]}>
      {/* ===== CLEAN CARD HEADER ===== */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderContent}>
          <View style={styles.cardHeaderTextContainer}>
            <Text style={styles.cardTitle}>
              {isEditing ? "Edit Teacher" : "Add New Teacher"}
            </Text>
            <Text style={styles.cardSubtitle}>
              {isEditing
                ? "Update teacher information"
                : "Create a new teacher profile"}
            </Text>
          </View>
          {isEditing && (
            <TouchableOpacity
              style={styles.cancelEditButton}
              onPress={onCancelEdit}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={20} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ===== TEACHER NAME SECTION ===== */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconWrapper}>
            <Ionicons name="person-outline" size={18} color={COLORS.white} />
          </View>
          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>Teacher Details</Text>
            <Text style={styles.sectionSubtitle}>
              Enter the teacher's full name
            </Text>
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <View
            style={[
              styles.inputContainer,
              errors.teacherName && styles.inputError,
              isTeacherNameFilled && styles.inputContainerFilled,
            ]}
          >
            <View style={styles.inputIconContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={
                  errors.teacherName
                    ? COLORS.error
                    : isTeacherNameFilled
                      ? COLORS.primary
                      : COLORS.textSecondary
                }
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="e.g., Mr. Ahmed Khan"
              placeholderTextColor={COLORS.textLight}
              value={currentTeacher.name}
              onChangeText={(text) => onInputChange("name", text)}
              autoCapitalize="words"
            />
          </View>
          {errors.teacherName && (
            <View style={styles.errorContainer}>
              <Ionicons
                name="alert-circle-outline"
                size={14}
                color={COLORS.error}
              />
              <Text style={styles.errorText}>{errors.teacherName}</Text>
            </View>
          )}
          {!isTeacherNameFilled && !errors.teacherName && (
            <View style={styles.infoContainer}>
              <Ionicons
                name="information-circle-outline"
                size={14}
                color={COLORS.info}
              />
              <Text style={styles.infoText}>
                Enter teacher name to unlock subject assignments
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* ===== SECTION DIVIDER ===== */}
      <View style={styles.sectionDivider}>
        <View style={styles.dividerLine} />
        <View style={styles.dividerIcon}>
          <Ionicons name="book-outline" size={16} color={COLORS.primary} />
        </View>
        <View style={styles.dividerLine} />
      </View>

      {/* ===== SUBJECT ASSIGNMENTS SECTION ===== */}
      <View
        style={[
          styles.assignmentsSection,
          isAssignmentSectionDisabled && styles.assignmentsSectionDisabled,
        ]}
      >
        <View style={styles.sectionHeader}>
          <View
            style={[styles.sectionIconWrapper, styles.assignmentsIconWrapper]}
          >
            <Ionicons name="library-outline" size={18} color={COLORS.white} />
          </View>
          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>Subject Assignments</Text>
            <Text style={styles.sectionSubtitle}>
              {isAssignmentSectionDisabled
                ? "Locked until teacher name is entered"
                : "Add subjects for this teacher"}
            </Text>
          </View>
          {currentTeacher.assignments.length > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>
                {currentTeacher.assignments.length}
              </Text>
            </View>
          )}
        </View>

        {/* Added Assignments - Horizontal Scroll */}
        {currentTeacher.assignments.length > 0 && (
          <View style={styles.assignmentsListContainer}>
            <View style={styles.assignmentsListHeader}>
              <Text style={styles.assignmentsListLabel}>Added Assignments</Text>
              <Text style={styles.assignmentsListCount}>
                {currentTeacher.assignments.length} total
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {currentTeacher.assignments.map((assignment, index) => (
                <View key={index} style={styles.subjectCardWrapper}>
                  <SubjectCard
                    name={assignment.subject}
                    className={assignment.className}
                    section={assignment.section}
                    isClassTeacher={assignment.isClassTeacher}
                  />
                  {/* Remove Icon - Shifted to Top-Right Corner of Card */}
                  {assignment.isClassTeacher && (
                    <TouchableOpacity
                      style={styles.removeIcon}
                      onPress={() => onRemoveAssignment(index)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name="close"
                        size={12}
                        color={COLORS.textLight}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {errors.assignments && (
          <View style={styles.errorContainer}>
            <Ionicons
              name="alert-circle-outline"
              size={14}
              color={COLORS.error}
            />
            <Text style={styles.errorText}>{errors.assignments}</Text>
          </View>
        )}

        {/* New Assignment Form */}
        <AssignmentForm
          newAssignment={currentTeacher.newAssignment}
          uniqueSubjects={uniqueSubjects}
          classData={classData}
          availableClasses={availableClasses}
          availableSections={availableSections}
          onAssignmentChange={onAssignmentChange}
          onAddAssignment={onAddAssignment}
          disabled={isAssignmentSectionDisabled}
        />
      </View>

      {/* ===== ACTION BUTTONS ===== */}
      <View style={styles.actionButtons}>
        <AppButton
          title={isEditing ? "Update Teacher" : "Add Teacher"}
          icon={isEditing ? "checkmark-circle-outline" : "person-add-outline"}
          onPress={onAddTeacher}
          disabled={!isFormValid}
          fullWidth={true}
          style={[
            styles.addTeacherButton,
            !isFormValid && styles.addTeacherButtonDisabled,
          ]}
        />
        {isEditing && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancelEdit}
            activeOpacity={0.7}
          >
            <Ionicons
              name="close-circle-outline"
              size={18}
              color={COLORS.textSecondary}
            />
            <Text style={styles.cancelButtonText}>Cancel Editing</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ===== MAIN CARD =====
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    ...SHADOWS.medium,
  },
  cardEditing: {
    borderColor: COLORS.primary,
    ...SHADOWS.large,
  },

  // ===== CLEAN CARD HEADER =====
  cardHeader: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
  },
  cardHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHeaderTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  cardSubtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.white,
    opacity: 0.8,
    marginTop: 2,
  },
  cancelEditButton: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.white,
    opacity: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },

  // ===== SECTION CONTAINER =====
  sectionContainer: {
    padding: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  sectionIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
    ...SHADOWS.small,
  },
  assignmentsIconWrapper: {
    backgroundColor: COLORS.primaryDark,
  },
  sectionHeaderText: {
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
    marginTop: 2,
  },

  // ===== INPUT STYLES =====
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SPACING.sm,
  },
  inputContainerFilled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  inputIconContainer: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.backgroundGray,
    justifyContent: "center",
    alignItems: "center",
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
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.xs,
  },
  infoText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginLeft: 4,
    fontStyle: "italic",
  },

  // ===== SECTION DIVIDER =====
  sectionDivider: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    marginVertical: SPACING.xs,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerIcon: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.primaryFade,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SPACING.sm,
  },

  // ===== ASSIGNMENTS SECTION =====
  assignmentsSection: {
    padding: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  assignmentsSectionDisabled: {
    opacity: 0.5,
  },
  countBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.md,
  },
  countBadgeText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.white,
    fontWeight: TYPOGRAPHY.weights.bold,
  },

  // Assignments List
  assignmentsListContainer: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  assignmentsListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  assignmentsListLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  assignmentsListCount: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
  },
  horizontalScrollContent: {
    gap: SPACING.sm,
    paddingRight: SPACING.sm,
  },

  // ===== SUBJECT CARD WRAPPER =====
  subjectCardWrapper: {
    position: "relative",
    marginRight: SPACING.sm,
  },

  // ===== REMOVE ICON (Shifted to top-right corner of card, NOT overlapping badge) =====
  removeIcon: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    backgroundColor: "transparent", // Transparent background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  // ===== ACTION BUTTONS =====
  actionButtons: {
    padding: SPACING.lg,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.backgroundLight,
  },
  addTeacherButton: {
    marginBottom: SPACING.sm,
  },
  addTeacherButtonDisabled: {
    opacity: 0.6,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.sm,
    gap: SPACING.xs,
  },
  cancelButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

export default TeacherForm;
