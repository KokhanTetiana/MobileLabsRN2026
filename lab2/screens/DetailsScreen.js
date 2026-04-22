import React from "react";
import { View, Text, Image } from "react-native";

export default function DetailsScreen({ route }) {
  const { item } = route.params;

  return (
    <View style={{ padding: 10 }}>
     <Image
  source={{ uri: item.image }}
  style={{
    width: 600,
    height: 500,
    borderRadius: 10,
    marginBottom: 10
  }}
  resizeMode="cover"
/>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        {item.title}
      </Text>

      <Text style={{ marginTop: 10 }}>
        {item.description}
      </Text>
    </View>
  );
}