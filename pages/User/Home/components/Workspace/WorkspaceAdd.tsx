import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Platform,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Avatar } from "react-native-design-system";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { useServices } from "../../../../../contexts/Services";

export default function WorkspaceAdd({
  tab,
  setTab,
  setPopoverShown,
}: {
  tab: "list" | "add";
  setTab: any;
  setPopoverShown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    user,
    api,
    adicionarWorkspace,
    workspaces,
    activeWorkspace,
    setActiveWorkspace,
  } = useServices();

  const [name, setName] = useState<string>("");

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => setTab("list")}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
            width: 30,
            borderRadius: 8,
            backgroundColor: "#333",
          }}
        >
          <Ionicons name="chevron-back" color="#FFF" size={20} />
        </TouchableOpacity>
        <Text
          style={{
            color: "#FFF",
            fontSize: 18,
            marginHorizontal: 20,
            fontWeight: "bold",
          }}
        >
          Adicionar workspace
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 10,
        }}
      >
        <TextInput
          onChangeText={(e) => {
            setName(e);
          }}
          value={name}
          keyboardType="ascii-capable"
          autoCorrect={false}
          placeholderTextColor="#AAA"
          placeholder="Nome do workspace"
          style={{
            fontSize: 16,
            height: 50,
            width: "100%",
            borderRadius: 10,
            backgroundColor: "#333",
            color: "#FFF",
            paddingHorizontal: 15,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          adicionarWorkspace({
            name,
          });
          setPopoverShown(false);
          setTimeout(() => {
            setTab("list");
          }, 400);
        }}
        style={{
          marginTop: 10,
          backgroundColor: name.length >= 5 ? "#3E6FBC" : "#333",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#FFF",
              marginLeft: 10,
              fontWeight: "bold",
            }}
          >
            Adicionar workspace
          </Text>
          <View
            style={{
              width: 30,
              height: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="add" color="#FFF" size={20} />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
