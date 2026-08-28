import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import MenuItem from "./MenuItem";

const MenuSection = ({ section, navigation, onThemePress, onAddUserPress }) => {
  const handleItemPress = (item) => {
    if (item.id === "theme" && onThemePress) {
      onThemePress();
    } else if (item.id === "add-user" && onAddUserPress) {
      onAddUserPress();
    } else {
      // Handle other items
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionTitle}>{section.title}</Text>
        </View>
        <View style={styles.sectionDivider} />
      </View>
      <View style={styles.sectionContent}>
        {section.items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            navigation={navigation}
            onPress={() => handleItemPress(item)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionDot: {
    width: 4,
    height: 16,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.primary,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: SPACING.sm,
  },
  sectionContent: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
});

export default MenuSection;
