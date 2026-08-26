import { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import TeacherCard from "./TeacherCard";

const { width, height } = Dimensions.get("window");

const BottomSheet = ({ visible, selectedSlot, onClose }) => {
  const bottomSheetAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(bottomSheetAnim, {
        toValue: 80,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(bottomSheetAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!selectedSlot) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.bottomSheetOverlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.bottomSheetContainer,
                {
                  transform: [{ translateY: bottomSheetAnim }],
                },
              ]}
            >
              {/* Handle */}
              <View style={styles.bottomSheetHandle}>
                <View style={styles.bottomSheetHandleBar} />
              </View>

              {/* Header with Close Button */}
              <View style={styles.bottomSheetHeader}>
                <View style={styles.headerLeft}>
                  <View style={styles.headerBadge}>
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={COLORS.white}
                    />
                    <Text style={styles.headerBadgeText}>
                      Slot {selectedSlot.slot}
                    </Text>
                  </View>
                  <Text style={styles.bottomSheetTitle}>
                    {selectedSlot.time} – {selectedSlot.endTime}
                  </Text>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Ionicons
                    name="close"
                    size={24}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              {/* Teacher Cards List */}
              <ScrollView
                style={styles.bottomSheetContent}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.bottomSheetContentContainer}
                nestedScrollEnabled={true}
              >
                {selectedSlot.lectures.map((lecture, index) => (
                  <View key={index} style={styles.bottomSheetCard}>
                    <TeacherCard
                      lecture={lecture}
                      index={index}
                      isBottomSheet={true}
                    />
                  </View>
                ))}
                {/* Extra bottom padding for safe area */}
                <View style={styles.bottomPadding} />
              </ScrollView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomSheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: BORDER_RADIUS.xxl,
    borderTopRightRadius: BORDER_RADIUS.xxl,
    maxHeight: height * 0.88,
    minHeight: height * 0.65,
    ...SHADOWS.large,
  },
  bottomSheetHandle: {
    alignItems: "center",
    paddingVertical: SPACING.md,
  },
  bottomSheetHandleBar: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flex: 1,
    marginRight: SPACING.md,
  },
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.md,
    alignSelf: "flex-start",
    marginBottom: 4,
    gap: 4,
  },
  headerBadgeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  bottomSheetTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },
  bottomSheetContent: {
    flex: 1,
  },
  bottomSheetContentContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  bottomSheetCard: {
    marginBottom: SPACING.sm,
    width: "100%",
  },
  bottomPadding: {
    height: 40,
  },
});

export default BottomSheet;
