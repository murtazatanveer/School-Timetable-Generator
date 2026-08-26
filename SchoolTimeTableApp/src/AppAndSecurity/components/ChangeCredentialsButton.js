import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from "../../Theme/colors";

const ChangeCredentialsButton = ({ navigation }) => {
  const handleChangeCredentials = () => {
    Alert.alert(
      "Change Credentials",
      "Would you like to update your username or password?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Change Username",
          onPress: () => {
            // Navigate to change username or show alert
            Alert.alert("Change Username", "Navigate to username update");
          },
        },
        {
          text: "Change Password",
          onPress: () => {
            // Navigate to change password or show alert
            navigation?.navigate("ChangeCredentials");
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity
      style={styles.changeCredentialsButton}
      onPress={handleChangeCredentials}
      activeOpacity={0.7}
    >
      <View style={styles.changeCredentialsLeft}>
        <View style={styles.changeCredentialsIcon}>
          <Ionicons name="key-outline" size={20} color={COLORS.white} />
        </View>
        <View style={styles.changeCredentialsContent}>
          <Text style={styles.changeCredentialsTitle}>Change Credentials</Text>
          <Text style={styles.changeCredentialsDescription}>
            Update your username or password
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  changeCredentialsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
  },
  changeCredentialsLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  changeCredentialsIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  changeCredentialsContent: {
    flex: 1,
  },
  changeCredentialsTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
  },
  changeCredentialsDescription: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textLight,
    marginTop: 1,
  },
});

export default ChangeCredentialsButton;
