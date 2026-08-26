import { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";

const { width, height } = Dimensions.get("window");

const ThemePopup = ({ visible, selectedTheme, onSelect, onClose }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleThemeSelect = (themeId) => {
    onSelect(themeId);
    // Close popup after selection
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const themeOptions = [
    {
      id: "light",
      title: "Light",
      icon: "sunny-outline",
      description: "Bright and clean interface",
      backgroundColor: "#FFFFFF",
      textColor: "#1A1A1A",
      accentColor: COLORS.primary,
      buttonBg: COLORS.primary,
      buttonText: COLORS.white,
      borderColor: COLORS.primary,
    },
    {
      id: "dark",
      title: "Dark",
      icon: "moon-outline",
      description: "Dark and sleek interface",
      backgroundColor: "#1E2329",
      textColor: "#FFFFFF",
      accentColor: "#F0B90B",
      buttonBg: "#F0B90B",
      buttonText: "#1A1A1A",
      borderColor: "#F0B90B",
    },
  ];

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.popupContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
                },
              ]}
            >
              {/* Popup Header */}
              <View style={styles.popupHeader}>
                <Text style={styles.popupTitle}>Choose Theme</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons
                    name="close"
                    size={24}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.popupDivider} />

              {/* Theme Options */}
              <View style={styles.themeOptionsContainer}>
                {themeOptions.map((theme) => {
                  const isSelected = selectedTheme === theme.id;
                  return (
                    <TouchableOpacity
                      key={theme.id}
                      style={[
                        styles.themeOption,
                        isSelected && styles.themeOptionSelected,
                        {
                          backgroundColor: isSelected
                            ? theme.buttonBg
                            : COLORS.backgroundLight,
                          borderColor: isSelected
                            ? theme.borderColor
                            : "transparent",
                        },
                      ]}
                      onPress={() => handleThemeSelect(theme.id)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.themeOptionContent}>
                        <View
                          style={[
                            styles.themeIconContainer,
                            {
                              backgroundColor: isSelected
                                ? theme.buttonBg + "30"
                                : COLORS.backgroundLight,
                              borderWidth: 1,
                              borderColor: isSelected
                                ? theme.borderColor
                                : COLORS.border,
                            },
                          ]}
                        >
                          <Ionicons
                            name={theme.icon}
                            size={28}
                            color={
                              isSelected ? theme.buttonText : theme.accentColor
                            }
                          />
                        </View>
                        <View style={styles.themeInfo}>
                          <Text
                            style={[
                              styles.themeTitle,
                              {
                                color: isSelected
                                  ? theme.buttonText
                                  : COLORS.textPrimary,
                              },
                            ]}
                          >
                            {theme.title}
                          </Text>
                          <Text
                            style={[
                              styles.themeDescription,
                              {
                                color: isSelected
                                  ? theme.buttonText + "CC"
                                  : COLORS.textSecondary,
                              },
                            ]}
                          >
                            {theme.description}
                          </Text>
                        </View>
                        {isSelected && (
                          <View style={styles.checkmarkContainer}>
                            <Ionicons
                              name="checkmark-circle"
                              size={24}
                              color={theme.buttonText}
                            />
                          </View>
                        )}
                      </View>
                      {isSelected && (
                        <View
                          style={[
                            styles.themeSelectedIndicator,
                            { backgroundColor: theme.borderColor },
                          ]}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.bottomSpacing} />
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    width: width * 0.9,
    maxHeight: height * 0.7,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.large,
    overflow: "hidden",
  },
  popupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  popupTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  closeButton: {
    padding: 4,
  },
  popupDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.lg,
  },
  themeOptionsContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  themeOption: {
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    borderWidth: 2,
    overflow: "hidden",
    position: "relative",
  },
  themeOptionSelected: {
    borderWidth: 2,
  },
  themeOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
  },
  themeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  themeInfo: {
    flex: 1,
  },
  themeTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  themeDescription: {
    fontSize: TYPOGRAPHY.sizes.xs,
    marginTop: 1,
  },
  checkmarkContainer: {
    marginLeft: SPACING.sm,
  },
  themeSelectedIndicator: {
    height: 3,
    width: "100%",
  },
  bottomSpacing: {
    height: SPACING.lg,
  },
});

export default ThemePopup;
