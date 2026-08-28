import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const TimetableCard = ({ timetable }) => {
  const {
    id,
    name,
    createdDate,
    createdTime,
    updatedDate,
    updatedTime,
    isActive,
    color,
  } = timetable;

  return (
    <TouchableOpacity
      style={styles.timetableCard}
      activeOpacity={0.7}
      onPress={() => {
        console.log("View timetable:", name);
      }}
    >
      <View style={[styles.cardAccent, { backgroundColor: color }]} />

      <View style={styles.cardContent}>
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <View
              style={[
                styles.cardIconContainer,
                { backgroundColor: color + "20" },
              ]}
            >
              <Ionicons name="calendar-outline" size={20} color={color} />
            </View>
            <Text style={styles.cardTitle}>{name}</Text>
          </View>
          {isActive && (
            <View style={styles.activeBadge}>
              <View style={styles.activeDot} />
              <Text style={styles.activeBadgeText}>Active</Text>
            </View>
          )}
        </View>

        {/* Card Body */}
        <View style={styles.cardBody}>
          <View style={styles.cardInfoRow}>
            <View style={styles.cardInfoItem}>
              <View style={styles.cardInfoIcon}>
                <Ionicons
                  name="create-outline"
                  size={14}
                  color={COLORS.textLight}
                />
              </View>
              <View>
                <Text style={styles.cardInfoLabel}>Created</Text>
                <Text style={styles.cardInfoValue}>
                  {createdDate}, {createdTime}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.cardInfoRow}>
            <View style={styles.cardInfoItem}>
              <View style={styles.cardInfoIcon}>
                <Ionicons
                  name="refresh-outline"
                  size={14}
                  color={COLORS.textLight}
                />
              </View>
              <View>
                <Text style={styles.cardInfoLabel}>Last Updated</Text>
                <Text style={styles.cardInfoValue}>
                  {updatedDate}, {updatedTime}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Card Footer */}
        <View style={styles.cardFooter}>
          <TouchableOpacity style={styles.cardAction}>
            <Ionicons name="eye-outline" size={18} color={COLORS.primary} />
            <Text style={styles.cardActionText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardAction}>
            <Ionicons
              name="pencil-outline"
              size={18}
              color={COLORS.textSecondary}
            />
            <Text
              style={[styles.cardActionText, { color: COLORS.textSecondary }]}
            >
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardAction}>
            <Ionicons name="trash-outline" size={18} color={COLORS.error} />
            <Text style={[styles.cardActionText, { color: COLORS.error }]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  timetableCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  cardAccent: {
    height: 4,
    width: "100%",
  },
  cardContent: {
    padding: SPACING.md,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    flex: 1,
  },
  cardIconContainer: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  activeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.success + "15",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.md,
    gap: 4,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.success,
  },
  activeBadgeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.success,
  },
  cardBody: {
    gap: 6,
    paddingVertical: SPACING.xs,
  },
  cardInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardInfoIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.xs,
  },
  cardInfoLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textLight,
  },
  cardInfoValue: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: SPACING.lg,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: SPACING.xs,
  },
  cardAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardActionText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

export default TimetableCard;
