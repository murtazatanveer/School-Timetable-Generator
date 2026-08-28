import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const CustomDropdown = ({
  label,
  iconName,
  placeholder,
  selectedValue,
  options,
  isOpen,
  onToggle,
  onSelect,
  getDisplayLabel,
}) => {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>
        <Ionicons name={iconName} size={16} color={COLORS.primary} /> {label}
      </Text>

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.dropdownButtonText,
            selectedValue && styles.dropdownButtonTextSelected,
          ]}
        >
          {selectedValue
            ? getDisplayLabel
              ? getDisplayLabel(selectedValue)
              : selectedValue
            : placeholder}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color={COLORS.textSecondary}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownContainer}>
          <ScrollView style={styles.dropdownScroll} nestedScrollEnabled={true}>
            {options.map((item) => {
              const isSelected = selectedValue === item;
              const itemLabel = getDisplayLabel ? getDisplayLabel(item) : item;

              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.dropdownItem,
                    isSelected && styles.dropdownItemSelected,
                  ]}
                  onPress={() => onSelect(item)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      isSelected && styles.dropdownItemTextSelected,
                    ]}
                  >
                    {itemLabel}
                  </Text>
                  {isSelected && (
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color={COLORS.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 46,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.backgroundLight,
  },
  dropdownButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textLight,
  },
  dropdownButtonTextSelected: {
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  dropdownContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 4,
    maxHeight: 120,
    ...SHADOWS.small,
    zIndex: 10,
  },
  dropdownScroll: {
    maxHeight: 120,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownItemSelected: {
    backgroundColor: COLORS.primaryFade,
  },
  dropdownItemText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textPrimary,
  },
  dropdownItemTextSelected: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
});

export default CustomDropdown;
