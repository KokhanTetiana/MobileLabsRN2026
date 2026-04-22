import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { generateNews } from "../data/news";

export default function MainScreen({ navigation }) {
  const [data, setData] = useState(generateNews(10));
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
  setRefreshing(true);

  setTimeout(() => {
    setData(generateNews(10));
    setRefreshing(false);
  }, 1500);
};
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

  const Header = () => (
    <Text style={{ fontSize: 22, padding: 10 }}>Новини</Text>
  );

 const Footer = () => (
  <Text style={{ padding: 10, textAlign: "center" }}>
    {loadingMore ? "Завантаження..." : "Немає більше"}
  </Text>
);

  const Separator = () => (
    <View style={{ height: 1, backgroundColor: "#ccc" }} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={Header}
      ListFooterComponent={Footer}
      ItemSeparatorComponent={Separator}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );
}