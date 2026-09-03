import { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS } from "../Theme/colors";

// Components
import TimetableStatus from "./components/TimetableStatus";
import SchoolOverview from "./components/SchoolOverview";
import TimetableSection from "./components/TimetableSection";
import SchoolStatistics from "./components/SchoolStatistics";
import ClassOverview from "./components/ClassOverview";
import TeacherOverview from "./components/TeacherOverview";
import QuickActions from "./components/QuickActions";
import BottomNavigation from "../common/Navigation/BottomNavigation";
import CurrentPeriodPopup from "./components/CurrentPeriodPopup";

// Hooks
import { useDashboardAnimations } from "./Hooks/useDashboardAnimations";

// Utils
import {
  schoolConfig,
  statistics,
  classStructure,
  todaySchedule,
  allTeachers,
  timetableStatus,
} from "./utils/mockData";

const DashboardScreen = ({ navigation }) => {
  const [showTeachers, setShowTeachers] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Animation for bottom navigation
  const translateY = useRef(new Animated.Value(0)).current;
  const lastOffsetY = useRef(0);
  const isAnimating = useRef(false);

  // Handle scroll to hide/show bottom nav
  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > lastOffsetY.current ? "down" : "up";

    // Only animate if not already animating and direction changed
    if (!isAnimating.current) {
      isAnimating.current = true;

      Animated.timing(translateY, {
        toValue: direction === "down" ? 120 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        isAnimating.current = false;
      });
    }

    lastOffsetY.current = currentOffset;
  };

  // Get current period
  const currentPeriod = todaySchedule.find((item) => item.isCurrent);

  // Animations
  const {
    fadeAnim,
    slideAnim,
    scaleAnim,
    modalFadeAnim,
    modalScaleAnim,
    modalSlideAnim,
    blurAnim,
    blurStyle,
    closePopup,
  } = useDashboardAnimations(currentPeriod, setShowPopup);

  // Get teachers to display
  const displayedTeachers = showTeachers ? allTeachers.slice(0, 5) : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <Animated.View style={[styles.mainContent, showPopup && blurStyle]}>
        <Animated.ScrollView
          style={[styles.container, { opacity: fadeAnim }]}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          <TimetableStatus
            timetableStatus={timetableStatus}
            schoolConfig={schoolConfig}
            scaleAnim={scaleAnim}
          />

          <SchoolOverview schoolConfig={schoolConfig} slideAnim={slideAnim} />

          <TimetableSection
            currentPeriod={currentPeriod}
            slideAnim={slideAnim}
            fadeAnim={fadeAnim}
          />

          <SchoolStatistics statistics={statistics} slideAnim={slideAnim} />

          <ClassOverview
            classStructure={classStructure}
            slideAnim={slideAnim}
          />

          <TeacherOverview
            statistics={statistics}
            showTeachers={showTeachers}
            setShowTeachers={setShowTeachers}
            displayedTeachers={displayedTeachers}
            slideAnim={slideAnim}
          />

          <QuickActions navigation={navigation} slideAnim={slideAnim} />

          <View style={styles.bottomSpacing} />
        </Animated.ScrollView>
      </Animated.View>

      {currentPeriod && (
        <Modal
          transparent={true}
          visible={showPopup}
          animationType="none"
          onRequestClose={() => closePopup(setShowPopup)}
        >
          <TouchableWithoutFeedback onPress={() => closePopup(setShowPopup)}>
            <Animated.View
              style={[styles.modalOverlay, { opacity: modalFadeAnim }]}
            >
              <TouchableWithoutFeedback>
                <Animated.View
                  style={[
                    styles.modalContent,
                    {
                      opacity: modalFadeAnim,
                      transform: [
                        { scale: modalScaleAnim },
                        { translateY: modalSlideAnim },
                      ],
                    },
                  ]}
                >
                  <CurrentPeriodPopup
                    currentPeriod={currentPeriod}
                    onClose={() => closePopup(setShowPopup)}
                  />
                </Animated.View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      <BottomNavigation
        navigation={navigation}
        activeScreen="Dashboard"
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
  mainContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
  scrollContent: {
    paddingBottom: 120, // Increased to accommodate bottom nav
  },
  bottomSpacing: {
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "75%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default DashboardScreen;
