import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  SHADOWS,
  BORDER_RADIUS,
} from "../../Theme/colors";
import { useTeacherData } from "./hooks/useTeacherData";
import TeacherForm from "./components/TeacherForm";
import TeacherCard from "./components/TeacherCard";
import AppAlert from "../common/AppAlert";
import AppButton from "../../common/AppButton/AppButton";

const Interface3 = ({ data, onNext, onBack }) => {
  const {
    teachers,
    currentTeacher,
    editingTeacherId,
    errors,
    uniqueSubjects,
    classData,
    availableClasses,
    availableSections,
    isFormValid,
    isProceedDisabled,
    alertConfig,
    hideAlert,
    addTeacher,
    editTeacher,
    removeTeacher,
    cancelEdit,
    addAssignment,
    removeAssignment,
    handleAssignmentChange,
    handleInputChange,
    handleNext,
  } = useTeacherData(data, onNext);

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Compact Header */}
        <View style={styles.headerSection}>
          <View style={styles.iconBadge}>
            <Ionicons name="people" size={20} color={COLORS.white} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.stepTitle}>Teachers Setup</Text>
            <Text style={styles.stepSubtitle}>
              Add teachers and assign subjects
            </Text>
          </View>
        </View>

        {/* Teacher Form */}
        <TeacherForm
          currentTeacher={currentTeacher}
          errors={errors}
          uniqueSubjects={uniqueSubjects}
          classData={classData}
          availableClasses={availableClasses}
          availableSections={availableSections}
          isFormValid={isFormValid}
          onInputChange={handleInputChange}
          onAddAssignment={addAssignment}
          onRemoveAssignment={removeAssignment}
          onAssignmentChange={handleAssignmentChange}
          onAddTeacher={addTeacher}
          isEditing={!!editingTeacherId}
          onCancelEdit={cancelEdit}
        />

        {/* Added Teachers List - Horizontal Scrollable */}
        {teachers.length > 0 && (
          <View style={styles.teachersSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Ionicons
                  name="albums-outline"
                  size={18}
                  color={COLORS.primary}
                />
              </View>
              <View style={styles.sectionHeaderText}>
                <Text style={styles.sectionTitle}>Added Teachers</Text>
                <Text style={styles.sectionSubtitle}>
                  {teachers.length} teacher{teachers.length > 1 ? "s" : ""}{" "}
                  configured
                </Text>
              </View>
              <View style={styles.sectionCountBadge}>
                <Text style={styles.sectionCountText}>{teachers.length}</Text>
              </View>
            </View>

            {/* Horizontal Scroll Container */}
            <View style={styles.horizontalScrollContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContent}
              >
                {teachers.map((teacher) => (
                  <View key={teacher.id} style={styles.teacherCardWrapper}>
                    <TeacherCard
                      teacher={teacher}
                      isEditing={editingTeacherId === teacher.id}
                      onEdit={editTeacher}
                      onRemove={removeTeacher}
                      onCancelEdit={cancelEdit}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <AppButton
            title="Back"
            icon="arrow-back-outline"
            onPress={onBack}
            variant="secondary"
            style={styles.backButton}
            fullWidth={false}
          />
          <AppButton
            title="Generate Timetable"
            icon="rocket-outline"
            onPress={handleNext}
            disabled={isProceedDisabled}
            fullWidth={true}
            style={[
              styles.nextButton,
              isProceedDisabled && styles.nextButtonDisabled,
            ]}
          />
        </View>
      </ScrollView>

      {/* Universal Alert */}
      <AppAlert
        visible={alertConfig.visible}
        onClose={hideAlert}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        details={alertConfig.details}
        confirmText={alertConfig.confirmText}
        onConfirm={alertConfig.onConfirm}
      />
    </>
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

  // Header Section
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

  // Teachers Section
  teachersSection: {
    marginTop: SPACING.lg,
  },
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
    marginTop: 1,
  },
  sectionCountBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.md,
  },
  sectionCountText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.white,
    fontWeight: TYPOGRAPHY.weights.bold,
  },

  // Horizontal Scroll Container
  horizontalScrollContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    ...SHADOWS.small,
  },
  horizontalScrollContent: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
  },
  teacherCardWrapper: {
    width: 280,
  },

  // Navigation Buttons
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.xl,
    gap: SPACING.md,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
});

export default Interface3;
