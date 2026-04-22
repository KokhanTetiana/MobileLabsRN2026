import "react-native-gesture-handler";

import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { GameProvider, useGame } from "./src/context/GameContext";

import HomeScreen from "./src/screens/HomeScreen";
import ChallengesScreen from "./src/screens/ChallengesScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Tab = createBottomTabNavigator();

function AppTabs() {
  const { darkMode } = useGame();

  return (
    <NavigationContainer
      theme={{
        dark: darkMode,
        colors: {
          background: darkMode ? "#111" : "#fff",
          card: darkMode ? "#222" : "#fff",
          text: darkMode ? "#fff" : "#000",
          primary: "#2196F3",
        },
      }}
    >
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: darkMode ? "#111" : "#fff",
          },
          headerTintColor: darkMode ? "#fff" : "#000",
          tabBarStyle: {
            backgroundColor: darkMode ? "#111" : "#fff",
          },
          tabBarActiveTintColor: "#2196F3",
        }}
      >
        <Tab.Screen name="Game" component={HomeScreen} />
        <Tab.Screen name="Challenges" component={ChallengesScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <AppTabs />
      </GameProvider>
    </GestureHandlerRootView>
  );
}