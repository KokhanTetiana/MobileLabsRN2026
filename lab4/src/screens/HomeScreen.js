import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, Alert, StyleSheet } from "react-native";
import * as FileSystem from 'expo-file-system/legacy';
import * as fileService from "../services/fileService";
import { formatBytes } from "../utils/formatters";

export default function HomeScreen({ navigation }) {
  const [path, setPath] = useState(FileSystem.documentDirectory);
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    load();
  }, [path]);

 const load = async () => {
  try {
    const data = await fileService.getDirectoryContent(path);
    setItems(data);

    fileService.getStorageStats().then(setStats).catch(() => {});
  } catch (e) {
    console.error(e);
  }
};

  const open = (item) => {
    if (item.isDirectory) {
      setPath(item.uri.endsWith('/') ? item.uri : item.uri + '/');
    } else {
      navigation.navigate("Details", { item, onGoBack: () => load() });
    }
  };

  const back = () => {
    if (path === FileSystem.documentDirectory) return;

    let currentPath = path.endsWith('/') ? path.slice(0, -1) : path;
    const parts = currentPath.split("/");
    
    parts.pop();
    
    const parentPath = parts.join("/") + "/";
    
    if (parentPath.length < FileSystem.documentDirectory.length) {
      setPath(FileSystem.documentDirectory);
    } else {
      setPath(parentPath);
    }
  };

  const handleCreateFile = () => {
    console.log("Натиснуто створення файлу");
    Alert.prompt(
      "Новий файл",
      "Введіть назву (без .txt)",
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Створити",
          onPress: async (name) => {
            if (name) {
              try {
                await fileService.saveFile(path + name + ".txt", "Новий файл");
                load(); 
              } catch (e) {
                Alert.alert("Помилка", "Не вдалося створити файл");
              }
            }
          },
        },
      ],
      "plain-text"
    );
  };

  const handleCreateFolder = () => {
    console.log("Натиснуто створення папки");
    Alert.prompt(
      "Нова папка",
      "Введіть назву",
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Створити",
          onPress: async (name) => {
            if (name) {
              try {
                await fileService.createFolder(path, name);
                load(); 
              } catch (e) {
                Alert.alert("Помилка", "Не вдалося створити папку");
              }
            }
          },
        },
      ],
      "plain-text"
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.pathText}>
        📍 {path && FileSystem.documentDirectory ? String(path).replace(FileSystem.documentDirectory, '/') : '/'}
      </Text>

      <View style={styles.topButtons}>
        <Button title="⬅ Назад" onPress={back} disabled={path === FileSystem.documentDirectory} />
        <Button title="Оновити" onPress={load} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.uri}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => open(item)}>
              <Text style={item.isDirectory ? styles.folderName : styles.fileName}>
                {item.isDirectory ? "📁" : "📄"} {item.name}
              </Text>
            </TouchableOpacity>
            <Button title="❌" color="red" onPress={async () => {
              await fileService.deleteItem(item.uri);
              load();
            }} />
          </View>
        )}
      />

      <View style={styles.footer}>
        <Button title="+ Файл" onPress={handleCreateFile} />
        <Button title="+ Папка" onPress={handleCreateFolder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  statsContainer: { padding: 10, backgroundColor: "#eee", borderRadius: 8, marginBottom: 10 },
  statsText: { fontSize: 13, textAlign: 'center', fontWeight: 'bold' },
  pathText: { fontSize: 12, color: "blue", marginBottom: 10 },
  topButtons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  itemRow: { flexDirection: "row", alignItems: "center", padding: 12, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  folderName: { fontWeight: "bold", color: "#007AFF", fontSize: 16 },
  fileName: { color: "#333", fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15 }
});