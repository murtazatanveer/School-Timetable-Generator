import { useRef } from "react";
import { Animated } from "react-native";

export const useUserScroll = (translateY) => {
  const lastOffsetY = useRef(0);
  const isAnimating = useRef(false);

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

  return { handleScroll };
};
