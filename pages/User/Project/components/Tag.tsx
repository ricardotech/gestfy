import React from "react";

import { View, Text } from "react-native";

export default function Tag({ name = "", bg = "", color = "" }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bg || "#3E6FBC",
        paddingHorizontal: 15,
        paddingVertical: 7.5,
        borderRadius: 50,
      }}
    >
      <Text
        style={{
          color: color || "#FFF",
        }}
      >
        {name}
      </Text>
    </View>
  );
}
