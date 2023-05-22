import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function FinishTask() {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity
        style={{
          borderRadius: 8,
          height: 50,
          width: "100%",
          backgroundColor: "#3E6FBC",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Concluir tarefa
        </Text>
      </TouchableOpacity>
    </View>
  );
}
