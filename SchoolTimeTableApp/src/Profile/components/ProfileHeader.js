import { View, Text, StyleSheet } from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import { userData } from "../utils/profileData";
import { getInitials } from "../utils/helpers";

const ProfileHeader = () => {
  return (
    <View style={styles.profileHeader}>
      <View style={styles.profileHeaderAccent} />
      <View style={styles.profileContent}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{getInitials(userData.name)}</Text>
        </View>
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userSchool}>{userData.school}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  profileHeaderAccent: {
    height: 6,
    backgroundColor: COLORS.primary,
    width: "100%",
  },
  profileContent: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
  },
  avatarContainer: {
    width: 88,
    height: 88,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
    marginBottom: SPACING.md,
    borderWidth: 3,
    borderColor: COLORS.primaryFade,
  },
  avatarText: {
    fontSize: TYPOGRAPHY.sizes.xxxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    textAlign: "center",
    letterSpacing: -0.2,
  },
  userSchool: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
});

export default ProfileHeader;
