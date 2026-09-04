import { useRef } from "react";
import { Animated } from "react-native";

const useBottomNavScroll = () => {
  // Animation value for bottom navigation
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

  return {
    translateY,
    handleScroll,
  };
};

export default useBottomNavScroll;
