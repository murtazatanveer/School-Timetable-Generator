import { useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
} from "react-native";
import { COLORS, SPACING } from "../Theme/colors";
import { useTeacherTimetable } from "./Hooks/useTeacherTimetable";
import { teacherData } from "./utils/teacherTimetableData";
import TimetableHeader from "./components/TimetableHeader";
import TimetableGrid from "./components/TimetableGrid";
import TeacherCard from "../Teachers/components/TeacherCard";

const TeacherTimetableScreen = ({ navigation, route }) => {
  const { days, slots, teacher } = useTeacherTimetable(teacherData);

  // Animation for bottom navigation
  const translateY = new Animated.Value(0);
  const lastOffsetY = useRef(0);
  const isAnimating = useRef(false);

  // Handle scroll to hide/show bottom nav
  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > lastOffsetY.current ? "down" : "up";

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.container}>
        <TimetableHeader navigation={navigation} />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Teacher Card */}
          <TeacherCard teacher={teacherData} />

          {/* Timetable Grid */}
          <TimetableGrid
            days={days}
            slots={slots}
            timetable={teacher.timetable}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  bottomSpacing: {
    height: SPACING.xxl,
  },
});

export default TeacherTimetableScreen;
