import React from "react";

import {
  View,
  Text,
  Pressable,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import * as Haptics from "expo-haptics";
import { useControllers } from "../../../../../contexts/WorkspacesContext";
import { useAuth } from "../../../../../contexts/Api";

export default function AddWorkspace({
  activeTab,
  setActiveTab,
  closeModal,
}: {
  activeTab: "Select" | "Widget" | "Projeto" | "Squad" | "Workspace";
  setActiveTab: React.Dispatch<
    React.SetStateAction<
      "Select" | "Widget" | "Projeto" | "Squad" | "Workspace"
    >
  >;
  closeModal: () => void;
}) {
  const { adicionarWorkspace } = useControllers();
  const { api } = useAuth();

  const navigation = useNavigation();

  const [activeWidgetTab, setActiveWidgetTab] =
    React.useState<"Workspace">("Workspace");

  const [name, setName] = React.useState<string>("");
  const [activeProject, setActiveProject] = React.useState<string>("");
  const [activeTask, setActiveTask] = React.useState<string>("");

  function AddWorkspaceButton() {
    return (
      <Pressable
        onPress={() =>
          adicionarWorkspace({
            name,
          })
        }
        style={{
          backgroundColor: name.length >= 5 ? "#3C7BFA" : "#333",
          marginTop: 10,
          height: 50,
          width: "100%",
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#FFF",
            fontFamily:
              name.length >= 5 ? "Poppins_700Bold" : "Poppins_400Regular",
          }}
        >
          Adicionar workspace
        </Text>
      </Pressable>
    );
  }

  return (
    <View
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: "100%",
        backgroundColor: "#202123",
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === "ios" ? 25 : 20,
      }}
    >
      <View
        style={{
          height: 60,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            activeWidgetTab === "Workspace"
              ? setActiveTab("Select")
              : setActiveWidgetTab("Workspace");
          }}
        >
          <Text
            style={{
              color: "#3E6FBC",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
      {activeWidgetTab === "Workspace" && (
        <View style={{}}>
          <Text
            style={{
              color: "#FFF",
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Nome
          </Text>
          <TextInput
            onChangeText={(e) => {
              setName(e);
            }}
            value={name}
            autoComplete="off"
            placeholderTextColor="#AAA"
            placeholder="Nome do workspace"
            style={{
              fontSize: 16,
              marginTop: 10,
              height: 50,
              width: "100%",
              borderRadius: 10,
              backgroundColor: "#333",
              color: "#FFF",
              paddingHorizontal: 10,
            }}
          />
        </View>
      )}
      {activeWidgetTab === "Workspace" && <AddWorkspaceButton />}
    </View>
  );
}
