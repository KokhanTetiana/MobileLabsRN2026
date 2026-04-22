import React from "react";
import { View, Text, SectionList } from "react-native";

const DATA = [
  {
    data: [
      {
        id: "1",
        name: "Кохан Тетяна",
        role: "Студентка",
        group: "ІПЗ-22-3"
      }
    ]
  },
  {
    data: [
      {
        id: "2",
        name: "Email",
        value: "ipz223_kto@student.ztu.edu.ua"
      },
      {
        id: "3",
        name: "Місто",
        value: "Житомир"
      }
    ]
  }
];

export default function ContactsScreen() {
  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item) => item.id}

      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {item.name}
          </Text>

          {item.role && <Text>{item.role}</Text>}
          {item.group && <Text>{item.group}</Text>}
          {item.value && <Text>{item.value}</Text>}
        </View>
      )}

      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: "#ccc" }} />
      )}
    />
  );
}