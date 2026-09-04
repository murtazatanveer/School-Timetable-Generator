import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

import { getInitials } from "../../common/utils/helper";

const UserCard = ({ user, isPasswordVisible, onTogglePassword, onEdit }) => {
  const isAdmin = user.role === "Admin";

  const handleDelete = () => {
    Alert.alert(
      "Delete User",
      `Are you sure you want to delete ${user.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => console.log("Delete user:", user.name),
        },
      ],
    );
  };

  return (
    <View style={styles.userCard}>
      <View
        style={[
          styles.cardAccent,
          { backgroundColor: isAdmin ? COLORS.primary : COLORS.secondary },
        ]}
      />

      <View style={styles.cardContent}>
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <View
              style={[
                styles.cardAvatar,
                {
                  backgroundColor: isAdmin ? COLORS.primary : COLORS.secondary,
                },
              ]}
            >
              <Text style={styles.cardAvatarText}>
                {getInitials(user.name)}
              </Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>{user.name}</Text>
              <View style={styles.cardRoleContainer}>
                <View
                  style={[
                    styles.cardRoleBadge,
                    {
                      backgroundColor: isAdmin
                        ? COLORS.primaryFade
                        : COLORS.secondaryLight,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.cardRoleText,
                      { color: isAdmin ? COLORS.primary : COLORS.secondary },
                    ]}
                  >
                    {user.role}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Card Body */}
        <View style={styles.cardBody}>
          {/* Password with visibility toggle */}
          <View style={styles.cardInfoRow}>
            <View style={styles.cardInfoItem}>
              <View style={styles.cardInfoIcon}>
                <Ionicons
                  name="lock-closed-outline"
                  size={14}
                  color={COLORS.textLight}
                />
              </View>
              <View style={styles.passwordContainer}>
                <Text style={styles.cardInfoLabel}>Password</Text>
                <View style={styles.passwordRow}>
                  <Text style={styles.cardInfoValue}>
                    {isPasswordVisible ? user.password : "••••••••"}
                  </Text>
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={onTogglePassword}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={
                        isPasswordVisible ? "eye-outline" : "eye-off-outline"
                      }
                      size={18}
                      color={COLORS.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.cardInfoRow}>
            <View style={styles.cardInfoItem}>
              <View style={styles.cardInfoIcon}>
                <Ionicons
                  name="add-circle-outline"
                  size={14}
                  color={COLORS.textLight}
                />
              </View>
              <View>
                <Text style={styles.cardInfoLabel}>Added</Text>
                <Text style={styles.cardInfoValue}>
                  {user.addedDate}, {user.addedTime}
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
                  {user.updatedDate}, {user.updatedTime}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Card Actions */}
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[styles.cardAction, styles.editAction]}
            onPress={onEdit}
            activeOpacity={0.7}
          >
            <Ionicons name="pencil-outline" size={18} color={COLORS.primary} />
            <Text style={styles.editActionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardAction, styles.deleteAction]}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={18} color={COLORS.error} />
            <Text style={styles.deleteActionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userCard: {
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
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    flex: 1,
  },
  cardAvatar: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
  },
  cardAvatarText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  cardRoleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    marginTop: 2,
  },
  cardRoleBadge: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  cardRoleText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  cardBody: {
    gap: 4,
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
  passwordContainer: {
    flex: 1,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeButton: {
    padding: 4,
    marginLeft: SPACING.xs,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: SPACING.xs,
  },
  cardAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  editAction: {
    backgroundColor: COLORS.primaryFade,
  },
  editActionText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  deleteAction: {
    backgroundColor: COLORS.error + "10",
  },
  deleteActionText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.error,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

export default UserCard;
