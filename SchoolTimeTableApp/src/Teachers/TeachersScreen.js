import { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Animated,
} from "react-native";
import { COLORS, SPACING } from "../Theme/colors";
import { useTeacherSearch } from "./Hooks/useTeacherSearch";
import { teachersData } from "./utils/teachersData";
import TeacherHeader from "./components/TeacherHeader";
import TeacherSearch from "./components/TeacherSearch";
import TeacherCard from "./components/TeacherCard";
import EmptyState from "./components/EmptyState";
import BottomNavigation from "../Navigation/BottomNavigation";
import TeacherSearchPopup from "../TeacherSearchPopup/TeacherSearchPopup";

const TeachersScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const filteredTeachers = useTeacherSearch(teachersData, searchQuery);

  // Animation for bottom navigation
  const translateY = useRef(new Animated.Value(0)).current;
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

  // Calculate class teacher count
  const classTeacherCount = teachersData.filter(
    (teacher) => teacher.isClassTeacher,
  ).length;

  const renderTeacherCard = ({ item }) => <TeacherCard teacher={item} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.container}>
        <TeacherHeader
          teacherCount={teachersData.length}
          classTeacherCount={classTeacherCount}
          onSearchPress={() => setShowSearchPopup(true)}
        />

        <TeacherSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <FlatList
          data={filteredTeachers}
          renderItem={renderTeacherCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<EmptyState searchQuery={searchQuery} />}
        />
      </View>

      {/* Search Popup */}
      <TeacherSearchPopup
        visible={showSearchPopup}
        onClose={() => setShowSearchPopup(false)}
      />

      <BottomNavigation
        navigation={navigation}
        activeScreen="Teachers"
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
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.backgroundGray,
  },
  listContent: {
    paddingBottom: 120,
  },
});

export default TeachersScreen;
