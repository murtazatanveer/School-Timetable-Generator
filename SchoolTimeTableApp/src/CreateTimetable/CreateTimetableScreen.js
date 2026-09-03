import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from "../Theme/colors";
import Header from "../common/AppHeader/Header";
import Interface1 from "./Interface1/Interface1";
import Interface2 from "./Interface2/Interface2";
import Interface3 from "./Interface3/Interface3";

const CreateTimetable = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [timetableData, setTimetableData] = useState({
    timetableName: "",
    workingDays: "",
    slotsPerDay: "",
    breakAfterSlot: "",
    breakDuration: "",
    firstSlotTime: "08:00 AM",
    slotDuration: "",
    classes: [],
    teachers: [],
  });

  const handleNext = (data) => {
    setTimetableData({ ...timetableData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleGenerate = (data) => {
    setTimetableData({ ...timetableData, ...data });
    Alert.alert("Success!", "Timetable generated successfully!", [
      {
        text: "View Timetable",
        onPress: () => navigation?.navigate("Timetable"),
      },
      { text: "OK", style: "cancel" },
    ]);
  };

  // COMPACT STEP INDICATOR
  const renderStepIndicator = () => {
    const steps = [
      { label: "Schedule", icon: "calendar-outline" },
      { label: "Classes", icon: "school-outline" },
      { label: "Teachers", icon: "people-outline" },
    ];

    return (
      <View style={styles.stepsRow}>
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isInactive = stepNumber > currentStep;

          return (
            <View key={index} style={styles.stepColumn}>
              <View style={styles.circleContainer}>
                {/* Smaller Circle */}
                <View
                  style={[
                    styles.circle,
                    isActive && styles.circleActive,
                    isCompleted && styles.circleCompleted,
                    isInactive && styles.circleInactive,
                  ]}
                >
                  {isCompleted ? (
                    <Ionicons name="checkmark" size={16} color={COLORS.white} />
                  ) : (
                    <Ionicons
                      name={step.icon}
                      size={16}
                      color={isActive ? COLORS.white : COLORS.textSecondary}
                    />
                  )}
                </View>
              </View>

              {/* Smaller Label */}
              <Text
                style={[
                  styles.label,
                  isActive && styles.labelActive,
                  isCompleted && styles.labelCompleted,
                ]}
              >
                {step.label}
              </Text>

              {/* Thinner Connector Line */}
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.connectorLine,
                    isCompleted && styles.connectorLineCompleted,
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const getStepTitle = () => {
    const stepTitles = {
      1: "Schedule Information",
      2: "Classes Data",
      3: "Teachers Data",
    };
    return stepTitles[currentStep] || "";
  };

  const getStepIcon = () => {
    const stepIcons = {
      1: "calendar-outline",
      2: "school-outline",
      3: "people-outline",
    };
    return stepIcons[currentStep] || "create-outline";
  };

  const getStepSubtitle = () => {
    const stepSubtitles = {
      1: "Enter timetable and school schedule",
      2: "Add classes, subjects, and sections",
      3: "Add teachers and subject assignments",
    };
    return stepSubtitles[currentStep] || "";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.container}>
        <Header
          navigation={navigation}
          title="Create Timetable"
          icon={getStepIcon()}
          subtitle={`Step ${currentStep} of 3: ${getStepTitle()}`}
        />

        {/* THINNER STEP BAR */}
        <View style={styles.stepCard}>{renderStepIndicator()}</View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {currentStep === 1 && (
            <Interface1 data={timetableData} onNext={handleNext} />
          )}
          {currentStep === 2 && (
            <Interface2
              data={timetableData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <Interface3
              data={timetableData}
              onNext={handleGenerate}
              onBack={handleBack}
            />
          )}
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

  // THINNER STEP CARD
  stepCard: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.xs, // Reduced from lg to xs
    paddingHorizontal: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.small,
  },

  // MAIN ROW
  stepsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.xs,
  },

  // EACH STEP COLUMN
  stepColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  // CIRCLE CONTAINER
  circleContainer: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xxs,
  },

  // SMALLER CIRCLE
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },

  circleActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    ...SHADOWS.small,
  },

  circleCompleted: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  circleInactive: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
  },

  // SMALLER LABEL
  label: {
    fontSize: TYPOGRAPHY.sizes.xs, // Reduced from sm to xs
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: "center",
  },

  labelActive: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.bold,
  },

  labelCompleted: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },

  // THINNER CONNECTOR LINE
  connectorLine: {
    position: "absolute",
    top: 16, // Aligns with center of smaller circle (32/2 = 16)
    left: "50%",
    width: "100%",
    height: 2, // Thinner line
    backgroundColor: COLORS.border,
    zIndex: -1,
  },

  connectorLineCompleted: {
    backgroundColor: COLORS.primary,
  },

  // CONTENT
  content: {
    flex: 1,
  },

  contentContainer: {
    paddingBottom: SPACING.xxl,
  },
});

export default CreateTimetable;
