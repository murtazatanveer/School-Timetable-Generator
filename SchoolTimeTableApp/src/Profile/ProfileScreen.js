import { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { COLORS, SPACING } from "../Theme/colors";
import { menuSections } from "./utils/profileData";
import ProfileHeader from "./components/ProfileHeader";
import MenuSection from "./components/MenuSection";
import ThemePopup from "./components/ThemePopup";
import BottomNavigation from "../common/Navigation/BottomNavigation";
import AppButton from "../common/AppButton/AppButton";
import UserPopup from "../UsersScreen/components/UserPopup";
import useBottomNavScroll from "../common/hooks/useBottomNavScroll";

const ProfileScreen = ({ navigation }) => {
  const { translateY, handleScroll } = useBottomNavScroll();

  const [showThemePopup, setShowThemePopup] = useState(false);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
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

  const handleAddUserPress = () => {
    setShowAddUserPopup(true);
  };

  const closeAddUserPopup = () => {
    setShowAddUserPopup(false);
  };

  const handleAddUser = (userData) => {
    // Mock add user functionality
    Alert.alert(
      "Success",
      `User "${userData.userName}" has been added successfully as ${userData.role}!`,
      [{ text: "OK", onPress: closeAddUserPopup }],
    );
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
                onAddUserPress={handleAddUserPress}
              />
            ))}
          </View>

          <AppButton
            title="Logout"
            icon="log-out-outline"
            onPress={() => {
              Alert.alert("Logout", "Are you sure you want to logout?", [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", style: "destructive" },
              ]);
            }}
            variant="destructive"
            style={{ marginHorizontal: SPACING.lg, marginTop: SPACING.md }}
          />

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

      {/* Add User Popup - Using Unified Component */}
      <UserPopup
        visible={showAddUserPopup}
        onClose={closeAddUserPopup}
        onSave={handleAddUser}
        title="Add New User"
        icon="person-add-outline"
        buttonText="Add User"
        editingUser={null}
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
