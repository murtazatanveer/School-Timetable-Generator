import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  TYPOGRAPHY,
} from "../../../Theme/colors";

const SectionTag = ({ section, onRemove, isRemovable = true }) => {
  return (
    <View style={[styles.tag, styles.tagSection]}>
      <View style={styles.tagContent}>
        <Ionicons name="layers-outline" size={12} color={COLORS.white} />
        <Text style={styles.tagText}>Section {section}</Text>
      </View>
      {isRemovable && onRemove && (
        <TouchableOpacity
          onPress={() => onRemove(section)}
          style={styles.removeButton}
        >
          <Ionicons name="close-circle" size={16} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
  },
  tagSection: {
    backgroundColor: COLORS.primary,
  },
  tagContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tagText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.white,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  removeButton: {
    marginLeft: 2,
  },
});

export default SectionTag;
