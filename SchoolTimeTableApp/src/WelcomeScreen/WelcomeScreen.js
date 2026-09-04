// screens/WelcomeScreen.js
import { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../Theme/colors";

const WelcomeScreen = ({ navigation }) => {
  const bottomBarSlide = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Slide up animation for bottom bar (slower speed)
    Animated.timing(bottomBarSlide, {
      toValue: 1,
      duration: 1200, // Slower animation
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic), // Smooth ease-out effect
    }).start();

    // Fade in content after bar slides up (slower delay)
    Animated.timing(contentFade, {
      toValue: 1,
      duration: 600,
      delay: 700,
      useNativeDriver: true,
    }).start();
  }, [bottomBarSlide, contentFade]);

  // Placeholder for your splash icon
  const splashIcon = require("../../assets/splash-icon.png");

  const handleSignUp = () => {
    navigation?.navigate("SignupScreen");
  };

  const handleLogin = () => {
    navigation?.navigate("LoginScreen");
  };

  // Interpolate bottom bar slide animation
  const translateY = bottomBarSlide.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0], // Starts 500px below, slides to 0
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.container}>
        {/* Top Section - White with Logo */}
        <View style={styles.topSection}>
          {/* Just the icon, no circle around it */}
          <Image
            source={splashIcon}
            style={styles.logoImage}
            resizeMode="contain"
          />

          {/* "Timetable Planner" text below the icon */}
          <Text style={styles.logoTitle}>Timetable</Text>
          <Text style={styles.logoSubtitle}>P L A N N E R</Text>
        </View>

        {/* Bottom Section - Maroon Card with Slide-Up Animation */}
        <Animated.View
          style={[
            styles.bottomSection,
            {
              transform: [{ translateY: translateY }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.welcomeCard,
              {
                opacity: contentFade,
              },
            ]}
          >
            <Text style={styles.welcomeTitle}>Welcome</Text>

            <Text style={styles.welcomeDescription}>
              Plan smarter. Organize better. Teach with ease. Create seamless
              timetables and keep your school day perfectly organized.
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.signUpButton]}
                onPress={handleSignUp}
                activeOpacity={0.8}
              >
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.loginButton]}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    overflow: "hidden", // Ensures animated content doesn't overflow
  },
  // Top Section - White with Logo and Text
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  // Just the icon, no circle
  logoImage: {
    width: 180,
    height: 180,
  },
  // "Timetable" main title
  logoTitle: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    letterSpacing: -1,
    marginTop: SPACING.md,
    textAlign: "center",
  },
  // "PLANNER" subtitle
  logoSubtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    letterSpacing: 6,
    marginTop: SPACING.xs,
    textAlign: "center",
  },
  // Bottom Section - Maroon Card with Animation
  bottomSection: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xxl,
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  welcomeCard: {
    flex: 1,
    justifyContent: "center",
  },
  welcomeTitle: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textWhite,
    marginBottom: SPACING.md,
  },
  welcomeDescription: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.white,
    opacity: 0.9,
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  buttonRow: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  button: {
    flex: 1,
    height: 56,
    borderRadius: 999, // Fully rounded pill shape
    justifyContent: "center",
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
  },
  signUpButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  loginButton: {
    backgroundColor: COLORS.primaryDark,
    borderWidth: 1.5,
    borderColor: COLORS.white,
    ...SHADOWS.medium,
  },
  loginButtonText: {
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
});

export default WelcomeScreen;
