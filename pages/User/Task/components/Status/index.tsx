import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Status() {
  return (
    <View
      style={{
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomColor: "rgba(255, 255, 255, 0.05)",
        borderBottomWidth: 1,
      }}
    >
      <Text
        style={{
          color: "#BBB",
        }}
      >
        Status
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
        <MaterialIcons name="check-box" color="#BBB" size={15} />
        <Text
          style={{
            marginLeft: 10,
            color: "#BBB",
            marginRight: 10,
          }}
        >
          Adicionar status
        </Text>
      </TouchableOpacity>
    </View>
  );
}
