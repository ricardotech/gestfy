import React, { SetStateAction, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import * as Haptics from "expo-haptics";

export default function BottomTab({
  activeTab,
  setActiveTab,
  openModal,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<"Home" | "Add">>;
  openModal: () => void;
}) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 25,
        width: 150,
        height: 60,
        backgroundColor: "#333",
        borderRadius: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginLeft: Dimensions.get("window").width / 2 - 75,
        marginRight: Dimensions.get("window").width / 2 - 75,
      }}
    >
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setActiveTab("Home");
        }}
      >
        <Ionicons
          name={"albums"}
          size={35}
          color={activeTab === "Home" ? "#3E6FBC" : "gray"}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setActiveTab("Add");
          openModal();
        }}
      >
        <Ionicons
          name={"add"}
          size={35}
          color={activeTab === "Add" ? "#3E6FBC" : "gray"}
        />
      </Pressable>
    </View>
  );
}
