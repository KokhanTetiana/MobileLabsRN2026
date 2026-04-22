import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import MainScreen from "../screens/MainScreen";
import DetailsScreen from "../screens/DetailsScreen";
import ContactsScreen from "../screens/ContactsScreen";

import { View, Text, Image } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          title: "Новини",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={24} style={{ marginLeft: 15 }} />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params?.item?.title || "Деталі",
        })}
      />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      
      <View style={{ padding: 20, alignItems: "center" }}>
        <Image
          source={{ uri: "https://res.cloudinary.com/dhpkwvwwl/image/upload/v1775675221/photo_2026-04-08_22-06-45_qfukxn.jpg" }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <Text style={{ marginTop: 10, fontWeight: "bold" }}>
          Кохан Тетяна
        </Text>
        <Text>Група: ІПЗ-22-3</Text>
      </View>

      <DrawerItemList {...props} />

    </DrawerContentScrollView>
  );
}

export default function AppNavigator() {
  return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen 
        name="Новини" 
        component={StackNavigator}
        options={{ headerShown: false }} 
      />
      <Drawer.Screen 
  name="Контакти" 
  component={ContactsScreen}
/>
    </Drawer.Navigator>
  );
}