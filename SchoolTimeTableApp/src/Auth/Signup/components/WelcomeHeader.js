import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../../../Theme/colors";

const WelcomeHeader = ({ title, subtitle }) => {
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>{title}</Text>
      <Text style={styles.welcomeSubtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    marginBottom: SPACING.xxl,
  },
  welcomeTitle: {
    fontSize: TYPOGRAPHY.sizes.xxxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xxs,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeights.normal * 16,
  },
});

export default WelcomeHeader;
