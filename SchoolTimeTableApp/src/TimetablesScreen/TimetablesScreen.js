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
import { useTimetableScroll } from "./hooks/useTimetableScroll";
import { timetables } from "./data/timetablesData";
import TimetableStats from "./components/TimetableStats";
import TimetableCard from "./components/TimetableCard";
import AppButton from "../common/AppButton/AppButton";
import Header from "../common/AppHeader/Header";

const TimetablesScreen = ({ navigation }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const { handleScroll } = useTimetableScroll(translateY);

  const activeCount = timetables.filter((t) => t.isActive).length;
  const archivedCount = timetables.filter((t) => !t.isActive).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.container}>
        <Header
          navigation={navigation}
          title="Timetables"
          icon="calendar-outline"
          subtitle="Manage all your created timetables"
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          <TimetableStats
            total={timetables.length}
            active={activeCount}
            archived={archivedCount}
          />

          <View style={styles.cardsContainer}>
            {timetables.map((item) => (
              <TimetableCard key={item.id} timetable={item} />
            ))}
          </View>
          <AppButton
            title="Create New Timetable"
            icon="add-circle-outline"
            onPress={() => navigation?.navigate("CreateTimetable")}
            style={{ marginTop: SPACING.sm }}
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
  cardsContainer: {
    marginTop: SPACING.md,
  },
  bottomSpacing: {
    height: SPACING.xxl,
  },
});

export default TimetablesScreen;
