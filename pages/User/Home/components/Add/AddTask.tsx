import React from "react";

import {
  View,
  Text,
  Pressable,
  Platform,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import * as Haptics from "expo-haptics";
import { useServices } from "../../../../../contexts/Services";
import { Avatar } from "react-native-design-system";

export default function AddTask({
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
    "Widget" | "Assignee" | "DueDate"
  >("Widget");

  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [activeProject, setActiveProject] = React.useState<string>("");
  const [activeTask, setActiveTask] = React.useState<string>("");
  const [priority, setPriority] = React.useState<"High" | "Medium" | "Low">();

  function AddWidgetButton() {
    return (
      <Pressable
        onPress={() => {
          addTask({
            name: "",
            description: name,
            workspaceId: String(activeWorkspace?._id),
            priority: priority ? priority : "High",
          });
          closeModal();
        }}
        style={{
          backgroundColor: name.length > 5 ? "#3C7BFA" : "#333",
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
              name.length > 5 && priority
                ? "Poppins_700Bold"
                : "Poppins_400Regular",
          }}
        >
          Adicionar
        </Text>
      </Pressable>
    );
  }

  function Assignee({ name, avatar }: { name: string; avatar: string }) {
    return (
      <Pressable
        style={{
          height: 45,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{
            borderRadius: 4,
          }}
          size="md"
          source={{
            uri: avatar,
          }}
        />
        <Text
          style={{
            marginLeft: 10,
            color: "#FFF",
            fontSize: 16,
          }}
        >
          {name}
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
        backgroundColor: "#191919",
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
              : activeWidgetTab === "Assignee"
              ? setActiveWidgetTab("Widget")
              : setActiveWidgetTab("Widget");
            closeModal();
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
          <TextInput
            placeholder="Nome da tarefa"
            onChangeText={(e) => {
              setName(e);
            }}
            value={name}
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
                setActiveWidgetTab("Assignee");
              }}
              style={{
                justifyContent: "center",
                height: 50,
                width: "49%",
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
                Assinar tarefa
              </Text>
              <MaterialIcons
                name="person"
                color={priority === "High" ? "#CC3F30" : "#AAA"}
                size={20}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setActiveWidgetTab("DueDate");
              }}
              style={{
                justifyContent: "center",
                height: 50,
                width: "49%",
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
                Data de entrega
              </Text>
              <MaterialIcons
                name="calendar-today"
                color={priority === "Medium" ? "#878F54" : "#AAA"}
                size={20}
              />
            </Pressable>
          </View>
        </View>
      )}
      {activeWidgetTab === "Assignee" && (
        <View>
          <ScrollView></ScrollView>
        </View>
      )}
      {activeWidgetTab === "DueDate" && (
        <View>
          <TextInput
            placeholder="Nome da tarefa"
            onChangeText={(e) => {
              setName(e);
            }}
            value={name}
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
                setActiveWidgetTab("Assignee");
              }}
              style={{
                justifyContent: "center",
                height: 50,
                width: "49%",
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
                Assinar tarefa
              </Text>
              <MaterialIcons
                name="person"
                color={priority === "High" ? "#CC3F30" : "#AAA"}
                size={20}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setActiveWidgetTab("DueDate");
              }}
              style={{
                justifyContent: "center",
                height: 50,
                width: "49%",
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
                Data de entrega
              </Text>
              <MaterialIcons
                name="calendar-today"
                color={priority === "Medium" ? "#878F54" : "#AAA"}
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
