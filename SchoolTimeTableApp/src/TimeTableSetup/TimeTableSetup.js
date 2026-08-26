import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
} from "react-native";
import { COLORS, SPACING } from "../Theme/colors";
import { useTimetableSetupAnimations } from "./Hooks/useTimetableSetupAnimations";
import HeroSection from "./components/HeroSection";
import CreateButton from "./components/CreateButton";
import InfoSection from "./components/InfoSection";
import QuickTips from "./components/QuickTips";

const TimetableSetupScreen = ({ navigation }) => {
  const { fadeAnim, slideUpAnim, scaleAnim, spin, bounce, scaleIconAnim } =
    useTimetableSetupAnimations();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }],
            },
          ]}
        >
          <HeroSection
            spin={spin}
            bounce={bounce}
            scaleIconAnim={scaleIconAnim}
          />

          <CreateButton
            navigation={navigation}
            scaleAnim={scaleAnim}
            fadeAnim={fadeAnim}
          />

          <InfoSection fadeAnim={fadeAnim} slideUpAnim={slideUpAnim} />

          <QuickTips fadeAnim={fadeAnim} slideUpAnim={slideUpAnim} />

          <View style={styles.bottomSpacing} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  bottomSpacing: {
    height: SPACING.xl,
  },
});

export default TimetableSetupScreen;
