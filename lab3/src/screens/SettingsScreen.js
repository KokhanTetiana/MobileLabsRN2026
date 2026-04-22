import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useGame } from "../context/GameContext";

export default function SettingsScreen() {
  const { darkMode, setDarkMode } = useGame();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#111" : "#fff" },
      ]}
    >
      <Text style={{ color: darkMode ? "#fff" : "#000", marginBottom: 10 }}>
        Dark Mode
      </Text>

      <Switch value={darkMode} onValueChange={setDarkMode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});