import React from "react";
import { View, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useGame } from "../context/GameContext";

export default function Clicker() {
  const { addScore, setChallenges } = useGame();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const tap = Gesture.Tap().onEnd(() => {
    addScore(1);
    setChallenges((p) => ({ ...p, taps: (p.taps || 0) + 1 }));
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      addScore(2);
      setChallenges((p) => ({
        ...p,
        doubleTaps: (p.doubleTaps || 0) + 1,
      }));
    });

  const tripleTap = Gesture.Tap()
    .numberOfTaps(3)
    .onEnd(() => {
      addScore(10);
      setChallenges((p) => ({ ...p, tripleTap: true }));
    });


  const longPress = Gesture.LongPress()
    .minDuration(3000)
    .onEnd(() => {
      addScore(5);
      setChallenges((p) => ({ ...p, longPress: true }));
    });

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      if (e.translationX > 80) {
        addScore(Math.floor(Math.random() * 10));
        setChallenges((p) => ({ ...p, swipeRight: true }));
      }

      if (e.translationX < -80) {
        addScore(Math.floor(Math.random() * 10));
        setChallenges((p) => ({ ...p, swipeLeft: true }));
      }
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      setChallenges((p) => ({ ...p, dragged: true }));
    });


  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = e.scale;
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      setChallenges((p) => ({ ...p, pinch: true }));
    });

  const gesture = Gesture.Simultaneous(
    pinch,
    pan,
    longPress,
    Gesture.Exclusive(tripleTap, doubleTap, tap)
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            width: 150,
            height: 150,
            backgroundColor: "#2196F3",
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          },
          animatedStyle,
        ]}
      >
        <Text style={{ color: "#fff" }}>TAP ME</Text>
      </Animated.View>
    </GestureDetector>
  );
}