import { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
} from "react-native";
import { COLORS, SPACING } from "../Theme/colors";
import { useProfileScroll } from "./Hooks/useProfileScroll";
import { menuSections } from "./utils/profileData";
import ProfileHeader from "./components/ProfileHeader";
import MenuSection from "./components/MenuSection";
import LogoutButton from "./components/LogoutButton";
import ThemePopup from "./components/ThemePopup";
import BottomNavigation from "../Navigation/BottomNavigation";

const ProfileScreen = ({ navigation }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const { handleScroll } = useProfileScroll(translateY);
  const [showThemePopup, setShowThemePopup] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("light");

  const handleThemePress = () => {
    setShowThemePopup(true);
  };

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setShowThemePopup(false);
  };

  const closeThemePopup = () => {
    setShowThemePopup(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          <ProfileHeader />

          <View style={styles.menuContainer}>
            {menuSections.map((section) => (
              <MenuSection
                key={section.id}
                section={section}
                navigation={navigation}
                onThemePress={handleThemePress}
              />
            ))}
          </View>

          <LogoutButton />

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>

      {/* Theme Selection Popup */}
      <ThemePopup
        visible={showThemePopup}
        selectedTheme={selectedTheme}
        onSelect={handleThemeSelect}
        onClose={closeThemePopup}
      />

      <BottomNavigation
        navigation={navigation}
        activeScreen="Profile"
        translateY={translateY}
      />
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
    backgroundColor: COLORS.backgroundGray,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  menuContainer: {
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  bottomSpacing: {
    height: SPACING.xxl,
  },
});

export default ProfileScreen;
