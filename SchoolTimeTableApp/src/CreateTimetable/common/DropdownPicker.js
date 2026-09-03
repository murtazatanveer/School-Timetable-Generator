import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const { height, width } = Dimensions.get("window");
const MODAL_HEIGHT = height * 0.78;

const DropdownPicker = ({
  label,
  field,
  options,
  value,
  error,
  onSelect,
  placeholder,
  containerStyle,
  showLabel = true,
  disabled = false,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  // Filter options when search changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchQuery, options]);

  const openDropdown = () => {
    if (!disabled && options && options.length > 0) {
      setShowDropdown(true);
      setSearchQuery("");
      setFilteredOptions(options);
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const selectOption = (selectedValue) => {
    onSelect(field, selectedValue);
    closeDropdown();
  };

  const displayValue = value || placeholder || `Select ${label}`;

  // Get selected option label
  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : displayValue;

  // Check if options have frequency data
  const hasFrequency = options.some((opt) => opt.frequency !== undefined);

  // Extract subject name from label (remove frequency part)
  const getCleanLabel = (label) => {
    if (label.includes("(")) {
      return label.substring(0, label.lastIndexOf("(")).trim();
    }
    return label;
  };

  // Extract frequency from label
  const getFrequencyFromLabel = (label) => {
    const match = label.match(/\((\d+)\)/);
    return match ? parseInt(match[1]) : null;
  };

  // Get frequency from item
  const getFrequency = (item) => {
    return item.frequency || getFrequencyFromLabel(item.label);
  };

  return (
    <View style={[styles.inputWrapper, containerStyle]}>
      {showLabel && <Text style={styles.inputLabel}>{label}</Text>}

      <TouchableOpacity
        style={[
          styles.dropdownButton,
          value && styles.dropdownButtonSelected,
          error && styles.inputError,
          disabled && styles.dropdownDisabled,
        ]}
        onPress={openDropdown}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <View style={styles.dropdownLeftContent}>
          <View
            style={[
              styles.dropdownIconContainer,
              value && styles.dropdownIconContainerSelected,
            ]}
          >
            {value ? (
              <Ionicons name="checkmark" size={10} color={COLORS.white} /> // ✅ Changed from 14 to 10
            ) : (
              <Ionicons name="ellipse" size={6} color={COLORS.textSecondary} />
            )}
          </View>
          <Text
            style={[styles.dropdownText, value && styles.dropdownTextSelected]}
            numberOfLines={1}
          >
            {displayLabel}
          </Text>
        </View>
        <View style={styles.dropdownRightContent}>
          <Ionicons
            name="chevron-down"
            size={18}
            color={value ? COLORS.primary : COLORS.textSecondary}
          />
        </View>
      </TouchableOpacity>

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={14}
            color={COLORS.error}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Modal
        transparent={true}
        visible={showDropdown}
        animationType="slide"
        onRequestClose={closeDropdown}
        statusBarTranslucent
      >
        <View style={styles.modalContainer}>
          {/* Backdrop */}
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={closeDropdown}
          />

          <View style={styles.modalSheet}>
            {/* Compact Header */}
            <View style={styles.modalHeader}>
              <View style={styles.dragHandleContainer}>
                <View style={styles.dragHandle} />
              </View>

              <View style={styles.modalHeaderContent}>
                <View style={styles.modalIconContainer}>
                  <Ionicons
                    name="options-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                </View>
                <View style={styles.modalHeaderTextContainer}>
                  <Text style={styles.modalTitle} numberOfLines={1}>
                    Select {label || "Option"}
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    {options.length} options available
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={closeDropdown}
                  style={styles.modalCloseButton}
                >
                  <Ionicons
                    name="close"
                    size={18}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Ionicons
                  name="search-outline"
                  size={18}
                  color={COLORS.primary}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder={`Search ${label || "options"}...`}
                  placeholderTextColor={COLORS.textLight}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoCorrect={false}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setSearchQuery("")}
                    style={styles.clearSearchButton}
                  >
                    <Ionicons
                      name="close-circle"
                      size={16}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* List */}
            <View style={styles.modalListContainer}>
              <FlatList
                data={filteredOptions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  const isSelected = value === item.value;
                  const cleanLabel = getCleanLabel(item.label);

                  return (
                    <TouchableOpacity
                      style={[
                        styles.modalItem,
                        isSelected && styles.modalItemSelected,
                      ]}
                      onPress={() => selectOption(item.value)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.modalItemContent}>
                        <View style={styles.modalItemLeft}>
                          <View
                            style={[
                              styles.modalItemIndicator,
                              isSelected && styles.modalItemIndicatorSelected,
                            ]}
                          >
                            {isSelected && (
                              <Ionicons
                                name="checkmark"
                                size={10} // ✅ Changed from 12 to 10
                                color={COLORS.white}
                              />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.modalItemText,
                              isSelected && styles.modalItemTextSelected,
                            ]}
                          >
                            {cleanLabel}
                          </Text>
                        </View>

                        {isSelected && (
                          <View style={styles.selectedBadge}>
                            <Ionicons
                              name="checkmark-circle"
                              size={12}
                              color={COLORS.white}
                            />
                            <Text style={styles.selectedBadgeText}>
                              Selected
                            </Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.modalListContent}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconContainer}>
                      <Ionicons
                        name="search-outline"
                        size={32}
                        color={COLORS.primary}
                      />
                    </View>
                    <Text style={styles.emptyText}>No options found</Text>
                    <Text style={styles.emptySubtext}>
                      Try a different search
                    </Text>
                  </View>
                }
              />
            </View>

            {/* Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeDropdown}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="close-outline"
                  size={18}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              {value ? (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => selectOption("")}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="refresh-outline"
                    size={16}
                    color={COLORS.primary}
                  />
                  <Text style={styles.clearButtonText}>Clear</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },

  // Dropdown Button Styles
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.backgroundLight,
  },
  dropdownButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  dropdownDisabled: {
    opacity: 0.5,
  },
  dropdownLeftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dropdownIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.backgroundGray,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  dropdownIconContainerSelected: {
    backgroundColor: COLORS.success,
  },
  dropdownText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textLight,
  },
  dropdownTextSelected: {
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  dropdownRightContent: {
    marginLeft: SPACING.sm,
  },

  // Error Styles
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

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: BORDER_RADIUS.xxl,
    borderTopRightRadius: BORDER_RADIUS.xxl,
    height: MODAL_HEIGHT,
    overflow: "hidden",
    ...SHADOWS.large,
  },

  // Compact Header
  modalHeader: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dragHandleContainer: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
    alignItems: "center",
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
  },
  modalHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalIconContainer: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryFade,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  modalHeaderTextContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  modalSubtitle: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.backgroundGray,
    justifyContent: "center",
    alignItems: "center",
  },

  // Search Bar
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    borderWidth: 1.5,
    borderColor: COLORS.primaryFade,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.backgroundLight,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textPrimary,
  },
  clearSearchButton: {
    padding: 4,
  },

  // List
  modalListContainer: {
    flex: 1,
  },
  modalListContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
  },
  modalItem: {
    marginBottom: SPACING.xs,
  },
  modalItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalItemSelected: {
    backgroundColor: COLORS.primaryFade,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  modalItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  modalItemIndicator: {
    width: 20, // ✅ Changed from 22 to 20
    height: 20, // ✅ Changed from 22 to 20
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  modalItemIndicatorSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  modalItemText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  modalItemTextSelected: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },

  // Selected Badge
  selectedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
    gap: 4,
  },
  selectedBadgeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.white,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },

  // Empty State
  emptyContainer: {
    alignItems: "center",
    paddingVertical: SPACING.xxl,
  },
  emptyIconContainer: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.xxl,
    backgroundColor: COLORS.primaryFade,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginTop: SPACING.md,
  },
  emptySubtext: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },

  // Footer
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.backgroundLight,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 4,
  },
  cancelButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryFade,
    gap: 4,
  },
  clearButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
});

export default DropdownPicker;
