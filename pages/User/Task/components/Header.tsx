import { useNavigation } from "@react-navigation/native";
import React from "react";

import { View, Text, TouchableOpacity } from "react-native";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 20,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text
          style={{
            color: "#3E6FBC",
            fontSize: 18,
          }}
        >
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
