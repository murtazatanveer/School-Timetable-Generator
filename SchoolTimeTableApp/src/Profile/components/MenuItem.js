import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from "../../Theme/colors";

const MenuItem = ({ item, navigation, onPress }) => {
  const isDestructive = item.destructive;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (isDestructive) {
      Alert.alert(item.alertTitle, item.alertMessage, [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive" },
      ]);
    } else if (item.screen && navigation) {
      navigation.navigate(item.screen);
    } else {
      Alert.alert(item.title, `Navigate to ${item.title}`);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.menuItem, isDestructive && styles.menuItemDestructive]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View
          style={[
            styles.menuIconContainer,
            isDestructive && styles.menuIconDestructive,
          ]}
        >
          <Ionicons
            name={item.icon}
            size={20}
            color={isDestructive ? COLORS.error : COLORS.primary}
          />
        </View>
        <View style={styles.menuItemContent}>
          <Text
            style={[
              styles.menuItemTitle,
              isDestructive && styles.menuItemTitleDestructive,
            ]}
          >
            {item.title}
          </Text>
          {item.description && (
            <Text
              style={[
                styles.menuItemDescription,
                isDestructive && styles.menuItemDescriptionDestructive,
              ]}
            >
              {item.description}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.menuItemRight}>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={isDestructive ? COLORS.error : COLORS.textLight}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemDestructive: {
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryFade,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  menuIconDestructive: {
    backgroundColor: COLORS.error + "15",
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
  },
  menuItemTitleDestructive: {
    color: COLORS.error,
  },
  menuItemDescription: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textLight,
    marginTop: 1,
  },
  menuItemDescriptionDestructive: {
    color: COLORS.error + "80",
  },
  menuItemRight: {
    marginLeft: SPACING.sm,
  },
});

export default MenuItem;
