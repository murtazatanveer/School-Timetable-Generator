import { View, Text, Image, StyleSheet, Platform } from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../../Theme/colors";

const HeaderWithLogo = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/splash-icon.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Make Your Timetable</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === "ios" ? SPACING.xs : SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.lg,
    marginRight: SPACING.sm,
    ...SHADOWS.medium,
  },
  appName: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
});

export default HeaderWithLogo;
