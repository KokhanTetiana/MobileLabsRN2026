import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Файловий менеджер' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Інфо та Редактор' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}