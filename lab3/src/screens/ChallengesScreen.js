import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useGame } from "../context/GameContext";

export default function ChallengesScreen() {
  const { challenges, score, darkMode } = useGame();

  const check = (cond) => (cond ? "✅" : "⚪");

  const Card = ({ title, done }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: darkMode ? "#222" : "#fff" },
      ]}
    >
      <Text style={{ color: darkMode ? "#fff" : "#000" }}>
        {check(done)} {title}
      </Text>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#111" : "#f5f5f5" },
      ]}
    >
      <Card title="Tap 10 times" done={challenges.taps >= 10} />
      <Card title="Double tap 5 times" done={challenges.doubleTaps >= 5} />
      <Card title="Triple tap" done={challenges.tripleTap} />
      <Card title="Long press (3 sec)" done={challenges.longPress} />
      <Card title="Drag object" done={challenges.dragged} />
      <Card title="Swipe right" done={challenges.swipeRight} />
      <Card title="Swipe left" done={challenges.swipeLeft} />
      <Card title="Pinch zoom" done={challenges.pinch} />
      <Card title="Reach 100 points (WIN)" done={score >= 100} />
      <Card title="Reach 50 points (bonus)" done={score >= 50} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
});