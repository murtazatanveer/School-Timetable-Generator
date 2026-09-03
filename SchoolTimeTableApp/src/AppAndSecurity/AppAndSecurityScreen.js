import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
} from "react-native";
import { COLORS, SPACING } from "../Theme/colors";
import { useAppSecurityScroll } from "./Hooks/useAppSecurityScroll";
import { appInfo, securityInfo } from "./utils/appSecurityData";
import InfoCard from "./components/InfoCard";
import ChangeCredentialsButton from "./components/ChangeCredentialsButton";
import Header from "../common/AppHeader/Header";

const AppAndSecurityScreen = ({ navigation }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const { handleScroll } = useAppSecurityScroll(translateY);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.container}>
        <Header
          navigation={navigation}
          title="App & Security"
          icon="shield-checkmark-outline"
          subtitle="Manage app security settings"
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          {/* App Information Section */}
          <InfoCard
            title="App Information"
            items={[
              {
                icon: "business-outline",
                label: "School Name",
                value: appInfo.schoolName,
              },
              {
                icon: "document-text-outline",
                label: "EMIS Code",
                value: appInfo.emisCode,
              },
            ]}
          />

          {/* Security Section */}
          <InfoCard
            title="Security"
            items={[
              {
                icon: "person-outline",
                label: "User Name",
                value: securityInfo.userName,
              },
            ]}
            actionButton={<ChangeCredentialsButton />}
          />

          <View style={styles.bottomSpacing} />
        </ScrollView>
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
    backgroundColor: COLORS.backgroundGray,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 120,
  },
  bottomSpacing: {
    height: SPACING.xxl,
  },
});

export default AppAndSecurityScreen;
