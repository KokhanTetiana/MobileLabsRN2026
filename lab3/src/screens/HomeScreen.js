import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Clicker from "../components/Clicker";
import { useGame } from "../context/GameContext";

export default function HomeScreen() {
  const { score, darkMode } = useGame();

  const Reward = ({ label, value }) => (
    <View style={styles.rewardRow}>
      <Text style={[styles.rewardText, { color: darkMode ? "#fff" : "#000" }]}>
        {label}
      </Text>
      <Text style={styles.rewardValue}>+{value}</Text>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#111" : "#fff" },
      ]}
    >
      {/* SCORE */}
      <Text style={{ fontSize: 20, color: darkMode ? "#fff" : "#000" }}>
        SCORE
      </Text>

      <Text style={styles.score}>{score}</Text>
      <Clicker />
     <View
  style={[
    styles.rewardsBox,
    { backgroundColor: darkMode ? "#222" : "#f5f5f5" },
  ]}
>
  <Text
    style={{
      fontSize: 18,
      marginBottom: 10,
      color: darkMode ? "#fff" : "#000",
    }}
  >
  </Text>

  <Reward label="Tap" value={1} />
  <Reward label="Double Tap" value={2} />
  <Reward label="Triple Tap" value={10} />
  <Reward label="Long Press (3s)" value={5} />
  <Reward label="Swipe Left / Right" value="0-9" />
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  score: {
    fontSize: 40,
    color: "#2196F3",
    marginBottom: 10,
  },
  rewardsBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    width: "100%",
  },
  rewardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  rewardText: {
    fontSize: 14,
  },
  rewardValue: {
    fontSize: 14,
    color: "#2196F3",
    fontWeight: "600",
  },
});