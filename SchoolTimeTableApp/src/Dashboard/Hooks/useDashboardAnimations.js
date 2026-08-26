import { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";

export const useDashboardAnimations = (currentPeriod, setShowPopup) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const modalFadeAnim = useRef(new Animated.Value(0)).current;
  const modalScaleAnim = useRef(new Animated.Value(0.8)).current;
  const modalSlideAnim = useRef(new Animated.Value(50)).current;
  const blurAnim = useRef(new Animated.Value(0)).current;

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
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();

    if (currentPeriod) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        Animated.parallel([
          Animated.timing(modalFadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }),
          Animated.timing(modalScaleAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }),
          Animated.timing(modalSlideAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }),
          Animated.timing(blurAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
            easing: Easing.out(Easing.cubic),
          }),
        ]).start();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = (setShowPopup) => {
    Animated.parallel([
      Animated.timing(modalFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }),
      Animated.timing(modalScaleAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }),
      Animated.timing(modalSlideAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }),
      Animated.timing(blurAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.in(Easing.cubic),
      }),
    ]).start(() => {
      setShowPopup(false);
    });
  };

  const blurStyle = {
    opacity: blurAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.4],
    }),
    transform: [
      {
        scale: blurAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.95],
        }),
      },
    ],
  };

  return {
    fadeAnim,
    slideAnim,
    scaleAnim,
    modalFadeAnim,
    modalScaleAnim,
    modalSlideAnim,
    blurAnim,
    blurStyle,
    closePopup,
  };
};
