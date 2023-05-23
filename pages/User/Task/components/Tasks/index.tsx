import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Tasks() {
  return (
    <View
      style={{
        paddingVertical: 15,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          color: "#BBB",
        }}
      >
        Tarefas
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: "rgba(55, 55, 55, 0.5)",
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          padding: 10,
          paddingVertical: 10,
          borderRadius: 8,
        }}
      >
        <Ionicons name="square" color="#BBB" size={15} />

        <Text
          style={{
            marginLeft: 10,
            color: "#BBB",
            marginRight: 10,
          }}
        >
          Adicionar tarefa
        </Text>
      </TouchableOpacity>
    </View>
  );
}
