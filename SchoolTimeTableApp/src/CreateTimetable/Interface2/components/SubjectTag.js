import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  TYPOGRAPHY,
} from "../../../Theme/colors";

const SubjectTag = ({ subject, onRemove, isRemovable = true }) => {
  return (
    <View style={[styles.tag, styles.tagSubject]}>
      <View style={styles.tagContent}>
        <Ionicons name="book-outline" size={12} color={COLORS.primary} />
        <Text style={styles.tagText}>{subject}</Text>
      </View>
      {isRemovable && onRemove && (
        <TouchableOpacity
          onPress={() => onRemove(subject)}
          style={styles.removeButton}
        >
          <Ionicons
            name="close-circle"
            size={16}
            color={COLORS.textSecondary}
          />
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
    borderWidth: 1,
    borderColor: COLORS.primaryFade,
  },
  tagSubject: {
    backgroundColor: COLORS.primaryFade,
  },
  tagContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tagText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  removeButton: {
    marginLeft: 2,
  },
});

export default SubjectTag;
