import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Platform, Text, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-design-system";
import { useServices } from "../../../../../contexts/Services";
import AddMemberToWorkspace from "./AddMemberToWorkspace";

export default function Ellipsis() {
  const { signOut } = useServices();

  const [tab, setTab] = useState<"list" | "addMemberToWorkspace">("list");

  function Item({
    name,
    icon,
    onPress,
  }: {
    name: string;
    icon: React.ReactNode;
    onPress: () => void;
  }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255, 255, 255, 0.05)",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {icon}
        <Text
          style={{
            marginLeft: 12,
            color: "#EEE",
            fontFamily: "Poppins_400Regular",
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: "100%",
        backgroundColor: "#202123",
        paddingVertical: Platform.OS === "ios" ? 30 : 20,
        paddingBottom: tab === "addMemberToWorkspace" ? 0 : "auto",
      }}
    >
      {tab === "list" && (
        <View>
          <Item
            name="Adicionar membro ao workspace"
            onPress={() => setTab("addMemberToWorkspace")}
            icon={
              <MaterialIcons name="person-add-alt-1" color="#EEE" size={20} />
            }
          />
          <Item
            name="Sair da sua conta"
            onPress={signOut}
            icon={<MaterialIcons name="logout" color="#EEE" size={20} />}
          />
        </View>
      )}
      {tab === "addMemberToWorkspace" && (
        <AddMemberToWorkspace setTab={setTab} />
      )}
    </View>
  );
}
