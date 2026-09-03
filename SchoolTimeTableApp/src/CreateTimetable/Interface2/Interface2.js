import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  SHADOWS,
  BORDER_RADIUS,
} from "../../Theme/colors";
import { useClassData } from "./hooks/useClassData";
import ClassForm from "./components/ClassForm";
import ClassCard from "./components/ClassCard";
import AppAlert from "../common/AppAlert";
import AppButton from "../../common/AppButton/AppButton";

const Interface2 = ({ data, onNext, onBack }) => {
  const {
    classes,
    currentClass,
    editingClassId,
    errors,
    isFormValid,
    isProceedDisabled,
    alertConfig,
    hideAlert,
    addClass,
    editClass,
    removeClass,
    cancelEdit,
    addSubject,
    removeSubject,
    addSection,
    removeSection,
    handleInputChange,
    handleNext,
  } = useClassData(data, onNext);

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Compact Header with Icon Badge */}
        <View style={styles.headerSection}>
          <View style={styles.iconBadge}>
            <Ionicons name="school" size={20} color={COLORS.white} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.stepTitle}>Classes Setup</Text>
            <Text style={styles.stepSubtitle}>
              Add classes, subjects, and sections
            </Text>
          </View>
        </View>

        {/* Class Form */}
        <ClassForm
          currentClass={currentClass}
          errors={errors}
          isFormValid={isFormValid}
          onInputChange={handleInputChange}
          onAddSubject={addSubject}
          onRemoveSubject={removeSubject}
          onAddSection={addSection}
          onRemoveSection={removeSection}
          onAddClass={addClass}
          isEditing={!!editingClassId}
          onCancelEdit={cancelEdit}
        />

        {/* Horizontal Scrollable Added Classes */}
        {classes.length > 0 && (
          <View style={styles.classesSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Ionicons
                  name="albums-outline"
                  size={18}
                  color={COLORS.primary}
                />
              </View>
              <View style={styles.sectionHeaderText}>
                <Text style={styles.sectionTitle}>Added Classes</Text>
                <Text style={styles.sectionSubtitle}>
                  {classes.length} class{classes.length > 1 ? "es" : ""}{" "}
                  configured
                </Text>
              </View>
              <View style={styles.sectionCountBadge}>
                <Text style={styles.sectionCountText}>{classes.length}</Text>
              </View>
            </View>

            <View style={styles.horizontalScrollContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContent}
              >
                {classes.map((classItem) => (
                  <View key={classItem.id} style={styles.cardWrapper}>
                    <ClassCard
                      classItem={classItem}
                      isEditing={editingClassId === classItem.id}
                      onEdit={editClass}
                      onRemove={removeClass}
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
            title="Proceed to Teachers"
            icon="arrow-forward-outline"
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

  // Classes Section
  classesSection: {
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
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.medium,
  },
  horizontalScrollContent: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  cardWrapper: {
    width: 220, // ✅ Increased from 200 to 220 for better readability
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

export default Interface2;
