import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from "react-native";
import * as fileService from "../services/fileService";
import { formatBytes, formatDate } from "../utils/formatters";

export default function DetailsScreen({ route }) {
  const { item, onGoBack } = route.params;
  const [content, setContent] = useState("");
  const isTxt = item.name.toLowerCase().endsWith(".txt");

  useEffect(() => {
    if (!item.isDirectory && isTxt) {
      fileService.readFile(item.uri).then(setContent).catch(() => {});
    }
  }, []);

  const handleSave = async () => {
    await fileService.saveFile(item.uri, content);
    Alert.alert("Збережено", "Файл успішно оновлено");
    if (onGoBack) onGoBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.title}>Деталі об'єкта</Text>
        <Text>Назва: {item.name}</Text>
        <Text>Розмір: {formatBytes(item.size)}</Text>
        <Text>Змінено: {formatDate(item.modificationTime)}</Text>
      </View>

      {isTxt && (
        <View style={styles.editorBox}>
          <Text style={styles.label}>Вміст файлу:</Text>
          <TextInput
            style={styles.input}
            multiline
            value={content}
            onChangeText={setContent}
          />
          <Button title="Зберегти зміни" onPress={handleSave} color="green" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  infoBox: { padding: 15, backgroundColor: "#f0f0f0", borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  label: { fontWeight: "bold", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, height: 150, textAlignVertical: "top", marginBottom: 10 },
  editorBox: { marginTop: 10 }
});