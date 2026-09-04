import { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import { subjectColors } from "../utils/mockData";

const CurrentPeriodPopup = ({ currentPeriod, onClose }) => {
  // Animation for blinking live dot
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Blinking animation for the live dot
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const renderPopupScheduleItem = ({ item }) => {
    return (
      <View style={styles.popupTimetableCard}>
        <View style={styles.popupTimetableTimeSection}>
          <View style={styles.popupTimetableTimeBadge}>
            <Text style={styles.popupTimetablePeriod}>P{item.period}</Text>
          </View>
          <Text style={styles.popupTimetableTime}>{item.time}</Text>
          <View style={styles.popupLiveBadge}>
            <Animated.View
              style={[styles.popupLiveDotPulse, { opacity: blinkAnim }]}
            />
            <Text style={styles.popupLiveBadgeText}>LIVE</Text>
          </View>
        </View>

        <View style={styles.popupTimetableEntries}>
          {item.entries.map((entry, index) => (
            <View key={index} style={styles.popupTimetableEntry}>
              <View style={styles.popupTimetableEntryLeft}>
                <View
                  style={[
                    styles.popupSubjectColorDot,
                    {
                      backgroundColor:
                        subjectColors[index % subjectColors.length],
                    },
                  ]}
                />
                <View style={styles.popupTimetableEntryContent}>
                  <Text style={styles.popupTimetableSubject}>
                    {entry.subject}
                  </Text>
                  <Text style={styles.popupTimetableTeacher}>
                    {entry.teacher}
                  </Text>
                </View>
              </View>
              <View style={styles.popupTimetableEntryRight}>
                <View style={styles.popupTimetableClassBadge}>
                  <Text style={styles.popupTimetableClassText}>
                    {entry.className}
                  </Text>
                  <Text style={styles.popupTimetableSectionText}>
                    {entry.section}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.modalHeader}>
        <View style={styles.modalHeaderLeft}>
          <Text style={styles.modalTitle}>Current Period</Text>
        </View>
        <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
          <Ionicons name="close" size={24} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.modalBody}>
        <FlatList
          data={[currentPeriod]}
          renderItem={renderPopupScheduleItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.modalFooter}>
        <TouchableOpacity style={styles.modalFooterButton} onPress={onClose}>
          <Text style={styles.modalFooterButtonText}>Got it</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  modalCloseButton: {
    padding: SPACING.xxs,
  },
  modalBody: {
    padding: SPACING.lg,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  popupTimetableCard: {
    backgroundColor: COLORS.primaryFade,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primary,
    overflow: "hidden",
  },
  popupTimetableTimeSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  popupTimetableTimeBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    marginRight: SPACING.sm,
  },
  popupTimetablePeriod: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  popupTimetableTime: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  popupLiveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.md,
  },
  popupLiveDotPulse: {
    width: 6,
    height: 6,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.white,
    marginRight: 4,
  },
  popupLiveBadgeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  popupTimetableEntries: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  popupTimetableEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.xs,
  },
  popupTimetableEntryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  popupSubjectColorDot: {
    width: 8,
    height: 8,
    borderRadius: BORDER_RADIUS.circle,
    marginRight: SPACING.sm,
  },
  popupTimetableEntryContent: {
    flex: 1,
  },
  popupTimetableSubject: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  popupTimetableTeacher: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  popupTimetableEntryRight: {
    marginLeft: SPACING.sm,
  },
  popupTimetableClassBadge: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    alignItems: "center",
  },
  popupTimetableClassText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
  },
  popupTimetableSectionText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  modalFooter: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  modalFooterButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: "center",
    ...SHADOWS.medium,
  },
  modalFooterButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.white,
  },
});

export default CurrentPeriodPopup;
