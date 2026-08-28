import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../Theme/colors";

import { CLASSES, SECTIONS } from "./constants/teacherData";
import { useModalAnimation } from "./hooks/useModalAnimation";
import { useTeacherSearch } from "./hooks/useTeacherSearch";
import CustomDropdown from "./components/CustomDropdown";
import TeacherResultCard from "./components/TeacherResultCard";

const { width, height } = Dimensions.get("window");

const TeacherSearchPopup = ({ visible, onClose }) => {
  const { fadeAnim, scaleAnim, slideAnim } = useModalAnimation(visible);
  const {
    selectedClass,
    selectedSection,
    searchResult,
    showClassDropdown,
    showSectionDropdown,
    handleSearch,
    handleSelectClass,
    handleSelectSection,
    toggleClassDropdown,
    toggleSectionDropdown,
  } = useTeacherSearch(visible);

  const isButtonDisabled = !selectedClass || !selectedSection;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.popupContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
                },
              ]}
            >
              {/* Header */}
              <View style={styles.popupHeader}>
                <View style={styles.popupHeaderLeft}>
                  <Ionicons
                    name="search-outline"
                    size={22}
                    color={COLORS.primary}
                  />
                  <Text style={styles.popupTitle}>Search for Teacher</Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons
                    name="close"
                    size={22}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.popupDivider} />

              {/* Form Body */}
              <ScrollView
                style={styles.formScrollView}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
              >
                <View style={styles.formContainer}>
                  {/* Class Dropdown */}
                  <CustomDropdown
                    label="Class"
                    iconName="school-outline"
                    placeholder="Select Class"
                    selectedValue={selectedClass}
                    options={CLASSES}
                    isOpen={showClassDropdown}
                    onToggle={toggleClassDropdown}
                    onSelect={handleSelectClass}
                  />

                  {/* Section Dropdown */}
                  <CustomDropdown
                    label="Section"
                    iconName="layers-outline"
                    placeholder="Select Section"
                    selectedValue={selectedSection}
                    options={SECTIONS}
                    isOpen={showSectionDropdown}
                    onToggle={toggleSectionDropdown}
                    onSelect={handleSelectSection}
                    getDisplayLabel={(val) => `Section ${val}`}
                  />

                  {/* Search CTA */}
                  <TouchableOpacity
                    style={[
                      styles.searchButton,
                      isButtonDisabled && styles.searchButtonDisabled,
                    ]}
                    onPress={handleSearch}
                    disabled={isButtonDisabled}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="search-outline"
                      size={18}
                      color={COLORS.white}
                    />
                    <Text style={styles.searchButtonText}>Find Teacher</Text>
                  </TouchableOpacity>

                  {/* Result View */}
                  {searchResult && <TeacherResultCard result={searchResult} />}
                </View>
              </ScrollView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.large,
    overflow: "hidden",
  },
  popupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  popupHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  popupTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  closeButton: {
    padding: 4,
  },
  popupDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.lg,
  },
  formScrollView: {
    flex: 1,
  },
  formContainer: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
    ...SHADOWS.medium,
    marginTop: 4,
  },
  searchButtonDisabled: {
    opacity: 0.6,
  },
  searchButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.white,
  },
});

export default TeacherSearchPopup;
