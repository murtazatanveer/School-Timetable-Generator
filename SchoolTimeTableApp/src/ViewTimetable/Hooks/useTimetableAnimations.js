import { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";

export const useTimetableAnimations = (currentTime, setCurrentTime) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const timeAnim = useRef(new Animated.Value(0)).current;
  const liveBlinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();

    // Blinking animation for Live button
    Animated.loop(
      Animated.sequence([
        Animated.timing(liveBlinkAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(liveBlinkAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    const interval = setInterval(() => {
      setCurrentTime(new Date());
      Animated.sequence([
        Animated.timing(timeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(timeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return {
    fadeAnim,
    slideAnim,
    timeAnim,
    liveBlinkAnim,
  };
};
