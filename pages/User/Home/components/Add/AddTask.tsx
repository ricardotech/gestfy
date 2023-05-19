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
import { useServices } from "../../../../../contexts/Services";

export default function AddWidget({
  activeTab,
  setActiveTab,
  closeModal,
}: {
  activeTab: "Widget" | "Projeto" | "Squad" | "Workspace";
  setActiveTab: React.Dispatch<
    React.SetStateAction<"Widget" | "Projeto" | "Squad" | "Workspace">
  >;
  closeModal: () => void;
}) {
  const { addTask, activeWorkspace } = useServices();

  const navigation = useNavigation();

  const [activeWidgetTab, setActiveWidgetTab] = React.useState<
    "Widget" | "Projetos" | "Tarefas" | "Workspaces"
  >("Widget");

  const [description, setDescription] = React.useState<string>("");
  const [activeProject, setActiveProject] = React.useState<string>("");
  const [activeTask, setActiveTask] = React.useState<string>("");
  const [priority, setPriority] = React.useState<"High" | "Medium" | "Low">();

  function AddWidgetButton() {
    return (
      <Pressable
        onPress={() => {
          addTask({
            description: description,
            workspaceId: String(activeWorkspace?._id),
            priority: priority ? priority : "Low",
          });
          closeModal();
        }}
        style={{
          backgroundColor:
            description.length > 5 && priority ? "#3C7BFA" : "#333",
          marginTop: 20,
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
              description.length > 5 && priority
                ? "Poppins_700Bold"
                : "Poppins_400Regular",
          }}
        >
          Adicionar
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
            activeWidgetTab === "Widget"
              ? setActiveTab("Widget")
              : setActiveWidgetTab("Widget");
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
      {activeWidgetTab === "Widget" && (
        <View>
          <Text
            style={{
              color: "#FFF",
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Descrição
          </Text>
          <TextInput
            onChangeText={(e) => {
              setDescription(e);
            }}
            value={description}
            autoComplete="off"
            placeholderTextColor="#AAA"
            style={{
              fontSize: 16,
              marginTop: 10,
              height: 50,
              width: "100%",
              borderRadius: 10,
              backgroundColor: "#333",
              color: "#FFF",
              paddingHorizontal: 15,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              marginTop: 20,
              color: "#FFF",
              fontFamily: "Poppins_400Regular",
            }}
          >
            Prioridade
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setTimeout(() => {
                  setPriority("High");
                }, 150);
              }}
              style={{
                justifyContent: "center",
                height: 50,
                width: "32%",
                borderRadius: 10,
                backgroundColor: "#333",
                paddingHorizontal: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: priority === "High" ? "#CC3F30" : "#AAA",
                  fontSize: 16,
                  marginRight: 10,
                }}
              >
                Alta
              </Text>
              <Ionicons
                name="warning"
                color={priority === "High" ? "#CC3F30" : "#AAA"}
                size={20}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setTimeout(() => {
                  setPriority("Medium");
                }, 150);
              }}
              style={{
                justifyContent: "center",
                height: 50,
                width: "32%",
                borderRadius: 10,
                backgroundColor: "#333",
                paddingHorizontal: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: priority === "Medium" ? "#878F54" : "#AAA",
                  fontSize: 16,
                  marginRight: 10,
                }}
              >
                Média
              </Text>
              <Ionicons
                name="alert-circle"
                color={priority === "Medium" ? "#878F54" : "#AAA"}
                size={20}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setTimeout(() => {
                  setPriority("Low");
                }, 150);
              }}
              style={{
                justifyContent: "center",
                height: 50,
                width: "32%",
                borderRadius: 10,
                backgroundColor: "#333",
                paddingHorizontal: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: priority === "Low" ? "#42c952" : "#AAA",
                  fontSize: 16,
                  marginRight: 10,
                }}
              >
                Baixa
              </Text>
              <Ionicons
                name="checkbox"
                color={priority === "Low" ? "#42c952" : "#AAA"}
                size={20}
              />
            </Pressable>
          </View>
        </View>
      )}
      {activeWidgetTab === "Widget" && <AddWidgetButton />}
    </View>
  );
}
