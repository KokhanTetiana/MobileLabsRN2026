import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { generateNews } from "../data/news";

export default function MainScreen({ navigation }) {
  const [data, setData] = useState(generateNews(10));
  const [refreshing, setRefreshing] = useState(false);

  // 🔄 Pull to refresh
  const onRefresh = () => {
  setRefreshing(true);

  setTimeout(() => {
    setData(generateNews(10)); // нові дані
    setRefreshing(false);
  }, 1500);
};

  // 📥 Infinite scroll
  const [loadingMore, setLoadingMore] = useState(false);

const loadMore = () => {
  if (loadingMore) return;

  setLoadingMore(true);

  setTimeout(() => {
    const newData = generateNews(5, data.length);
    setData(prev => [...prev, ...newData]);
    setLoadingMore(false);
  }, 1000);
};

  // 📌 Item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { item })}
      style={{ padding: 10 }}
    >
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
      <Text style={{ fontSize: 18 }}>{item.title}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  // 📌 Header
  const Header = () => (
    <Text style={{ fontSize: 22, padding: 10 }}>Новини</Text>
  );

  // 📌 Footer
 const Footer = () => (
  <Text style={{ padding: 10, textAlign: "center" }}>
    {loadingMore ? "Завантаження..." : "Немає більше"}
  </Text>
);

  // 📌 Separator
  const Separator = () => (
    <View style={{ height: 1, backgroundColor: "#ccc" }} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      
      // refresh
      refreshing={refreshing}
      onRefresh={onRefresh}

      // infinite scroll
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}

      // UI
      ListHeaderComponent={Header}
      ListFooterComponent={Footer}
      ItemSeparatorComponent={Separator}

      // optimization
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );
}