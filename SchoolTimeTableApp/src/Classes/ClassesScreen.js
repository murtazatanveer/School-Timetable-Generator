import { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { COLORS, SPACING } from "../Theme/colors";
import { useClassData } from "./Hooks/useClassData";
import useBottomNavScroll from "../common/hooks/useBottomNavScroll";
import { classesData } from "./utils/classesData";
import ClassesHeader from "./components/ClassesHeader";
import ClassCard from "./components/ClassCard";
import BottomNavigation from "../common/Navigation/BottomNavigation";

const ClassesScreen = ({ navigation }) => {
  const [expandedClass, setExpandedClass] = useState(null);
  const { totalClasses, totalSections, totalSubjects } =
    useClassData(classesData);

  const { translateY, handleScroll } = useBottomNavScroll();

  const toggleClass = (classId) => {
    if (expandedClass === classId) {
      setExpandedClass(null);
    } else {
      setExpandedClass(classId);
    }
  };

  const renderClassItem = ({ item }) => (
    <ClassCard
      classData={item}
      isExpanded={expandedClass === item.id}
      onToggle={() => toggleClass(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.container}>
        <ClassesHeader
          totalClasses={totalClasses}
          totalSections={totalSections}
          totalSubjects={totalSubjects}
        />

        <FlatList
          data={classesData}
          renderItem={renderClassItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.listContent}
        />
      </View>

      <BottomNavigation
        navigation={navigation}
        activeScreen="Classes"
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
    backgroundColor: COLORS.backgroundGray,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 120,
    paddingTop: SPACING.md,
  },
});

export default ClassesScreen;
