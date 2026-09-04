import { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  StatusBar,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../Theme/colors";

const SplashScreen = ({ navigation }) => {
  // Animation values
  const scaleValue = useRef(new Animated.Value(0.3)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation?.replace("WelcomeScreen");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, scaleValue, opacityValue]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Top-right maroon circle */}
      <View style={styles.topRightCircle} />

      {/* Bottom-left maroon circle */}
      <View style={styles.bottomLeftCircle} />

      {/* Central Logo and Text */}
      <Animated.View
        style={[
          styles.centerContent,
          {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          },
        ]}
      >
        {/* Logo Image */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/splash-icon.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* App Name */}
        <Text style={styles.appName}>Timetable</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>P L A N N E R</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  // Top-right circle
  topRightCircle: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.primary, // Use your maroon color
  },
  // Bottom-left circle
  bottomLeftCircle: {
    position: "absolute",
    bottom: -60,
    left: -60,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.primary, // Use your maroon color
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    paddingHorizontal: SPACING.xl,
  },
  logoContainer: {
    marginBottom: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
  },
  // Your actual logo image
  logoImage: {
    width: 140,
    height: 140,
  },
  appName: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    letterSpacing: -1,
    marginBottom: SPACING.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    letterSpacing: 6,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: "center",
  },
});

export default SplashScreen;
