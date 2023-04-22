import { useNavigation } from "@react-navigation/native";
import React from "react";

import { View, Text, Pressable } from "react-native";
import { Avatar } from "react-native-design-system";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 60,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text
          style={{
            color: "#3E6FBC",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Fechar
        </Text>
      </Pressable>
    </View>
  );
}
