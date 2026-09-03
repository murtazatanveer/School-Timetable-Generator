import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SHADOWS, TYPOGRAPHY } from "../../Theme/colors";

const BottomNavigation = ({
  navigation,
  activeScreen = "Profile",
  translateY = new Animated.Value(0),
}) => {
  const navItems = [
    {
      icon: "home",
      label: "Home",
      screen: "Dashboard",
      color: COLORS.primary,
      active: activeScreen === "Dashboard",
    },
    {
      icon: "people-outline",
      label: "Teachers",
      screen: "Teachers",
      color: COLORS.primary,
      active: activeScreen === "Teachers",
    },
    {
      icon: "calendar-outline",
      label: "Timetable",
      screen: "Timetable",
      color: COLORS.primary,
      active: activeScreen === "Timetable",
    },
    {
      icon: "school-outline",
      label: "Classes",
      screen: "Classes",
      color: COLORS.primary,
      active: activeScreen === "Classes",
    },
    {
      icon: "person-outline",
      label: "Profile",
      screen: "Profile",
      color: COLORS.primary,
      active: activeScreen === "Profile",
    },
  ];

  const handleNavigation = (screen) => {
    if (navigation && screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <Animated.View
      style={[
        styles.bottomNav,
        {
          transform: [{ translateY: translateY }],
        },
      ]}
    >
      {navItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.navItem}
          onPress={() => handleNavigation(item.screen)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.iconContainer,
              item.active && { backgroundColor: item.color },
            ]}
          >
            <Ionicons
              name={item.active ? item.icon.replace("-outline", "") : item.icon}
              size={20}
              color={item.active ? COLORS.white : item.color}
            />
          </View>
          <Text
            style={[
              styles.navLabel,
              item.active && styles.navLabelActive,
              { color: item.active ? item.color : COLORS.textSecondary },
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.primaryFade,
    paddingVertical: 10,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.small,
    height: Platform.OS === "ios" ? 90 : 76,
    zIndex: 999,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 4,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  navLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
    letterSpacing: 0.2,
  },
  navLabelActive: {
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
});

export default BottomNavigation;
