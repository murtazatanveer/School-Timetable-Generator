import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Animated,
} from "react-native";
import { COLORS, SPACING } from "../Theme/colors";
import { useTimetableAnimations } from "./Hooks/useTimetableAnimations";
import { timetableData, days } from "./utils/timetableData";
import HeaderCard from "./components/HeaderCard";
import DaySelector from "./components/DaySelector";
import SlotCard from "./components/SlotCard";
import BottomSheet from "./components/BottomSheet";
import BottomNavigation from "../Navigation/BottomNavigation";

const TimetableScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  // Animation for bottom navigation
  const translateY = useRef(new Animated.Value(0)).current;
  const lastOffsetY = useRef(0);
  const isAnimating = useRef(false);

  // Handle scroll to hide/show bottom nav
  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > lastOffsetY.current ? "down" : "up";

    // Only animate if not already animating
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

  const { fadeAnim, slideAnim, timeAnim, liveBlinkAnim } =
    useTimetableAnimations(currentTime, setCurrentTime);

  const currentDayData = timetableData[selectedDay] || [];

  const openBottomSheet = (slot) => {
    setSelectedSlot(slot);
    setShowBottomSheet(true);
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false);
    setSelectedSlot(null);
  };

  const renderSlot = ({ item }) => (
    <SlotCard
      item={item}
      onViewAllPress={openBottomSheet}
      liveBlinkAnim={liveBlinkAnim}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <HeaderCard
          currentTime={currentTime}
          currentDayData={currentDayData}
          timeAnim={timeAnim}
        />

        <DaySelector
          days={days}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />

        <View style={styles.timetableSection}>
          <FlatList
            data={currentDayData}
            renderItem={renderSlot}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.timetableList}
          />
        </View>

        {selectedSlot && (
          <BottomSheet
            visible={showBottomSheet}
            selectedSlot={selectedSlot}
            onClose={closeBottomSheet}
          />
        )}
      </Animated.View>

      <BottomNavigation
        navigation={navigation}
        activeScreen="Timetable"
        translateY={translateY}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.backgroundLight,
  },
  timetableSection: {
    flex: 1,
    marginTop: SPACING.md,
  },
  timetableList: {
    paddingBottom: 120, // Increased to accommodate bottom nav
  },
});

export default TimetableScreen;
