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
import { useTasks } from "../../../../../contexts/WorkspacesContext";

export default function AddWorkspace({
  activeTab,
  setActiveTab,
  closeModal,
}: {
  activeTab: "Select" | "Widget" | "Projeto" | "Squad" | "Workspace";
  setActiveTab: React.Dispatch<
    React.SetStateAction<"Select" | "Widget" | "Projeto" | "Squad"| "Workspace">
  >;
  closeModal: () => void;
}) {
  const { adicionarTask } = useTasks();

  const navigation = useNavigation();

  const [activeWidgetTab, setActiveWidgetTab] = React.useState<
    "Widget" | "Projetos" | "Tarefas"
  >("Widget");

  const [description, setDescription] = React.useState<string>("");
  const [activeProject, setActiveProject] = React.useState<string>("");
  const [activeTask, setActiveTask] = React.useState<string>("");
  const [priority, setPriority] = React.useState<"High" | "Medium" | "Low">();

  const [color, setColor] = React.useState<
    "#AD87FA" | "#CCFA6E" | "#FA6F55" | "#3C7BFA"
  >("#3C7BFA");
  function Color({
    name,
    hex,
  }: {
    name?: string;
    hex: "#AD87FA" | "#CCFA6E" | "#FA6F55" | "#3C7BFA";
  }) {
    return (
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          setColor(hex);
        }}
        style={{
          marginRight: 15,
          borderWidth: 3,
          borderColor: color === hex ? hex : "#333",
          height: 35,
          width: 35,
          borderRadius: 35,
          backgroundColor: hex,
        }}
      />
    );
  }

  function Project({ name = "" }) {
    return (
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setActiveTask("");
          setActiveProject(name);
          setTimeout(() => {
            setActiveWidgetTab("Widget");
          }, 250);
        }}
        style={{
          borderRadius: 10,
          marginTop: 10,
          height: 50,
          width: "100%",
          backgroundColor: "#333",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: activeProject === name ? "#3E6FBC" : "#AAA",
            fontSize: 16,
          }}
        >
          {name}
        </Text>
        <Ionicons
          name={activeProject === name ? "link" : "albums"}
          color={activeProject === name ? "#3E6FBC" : "#AAA"}
          size={20}
        />
      </Pressable>
    );
  }

  function Task({ name = "" }) {
    return (
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setActiveProject("");
          setActiveTask(name);
          setTimeout(() => {
            setActiveWidgetTab("Widget");
          }, 250);
        }}
        style={{
          borderRadius: 10,
          marginTop: 10,
          height: 50,
          width: "100%",
          backgroundColor: "#333",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: activeTask === name ? "#3E6FBC" : "#AAA",
            fontSize: 16,
          }}
        >
          {name}
        </Text>
        <Ionicons
          name={activeTask === name ? "link" : "time"}
          color={activeTask === name ? "#3E6FBC" : "#AAA"}
          size={20}
        />
      </Pressable>
    );
  }

  // >>> Adiciona a task ou projeto.
  function AddWidgetButton() {
    return (
      <Pressable
        onPress={() => {
          // adicionarTask({
          //   description: description,
          //   id: activeProject ? activeProject : activeTask,
          //   type: activeProject ? "Project" : "Task",
          //   priority: priority ? priority : "Low",
          // });
          closeModal();
        }}
        style={{
          backgroundColor:
            activeProject ||
            (activeTask && description.length > 5 && description.length < 15)
              ? "#3C7BFA"
              : "#333",
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
              activeProject ||
              (activeTask && description.length > 5 && description.length < 15)
                ? "Poppins_700Bold"
                : "Poppins_400Regular",
          }}
        >
          Adicionar Widget
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
              ? setActiveTab("Select")
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
        <View style={{}}>
          {/* <View>
          <Text
            style={{
              color: "#FFF",
              fontSize: 18,
              fontFamily: "Poppins_700Bold",
            }}
          >
            Escolha a cor do widget
          </Text>
          <View
            style={{
              paddingVertical: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Color hex="#3C7BFA" />
            <Color hex="#AD87FA" />
            <Color hex="#CCFA6E" />
            <Color hex="#FA6F55" />
          </View>
          </View> */}
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
              setDescription(e);
            }}
            value={description}
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
          {/* <Text
            style={{
              marginTop: 20,
              fontSize: 16,
              color: "#FFF",
              fontFamily: "Poppins_400Regular",
            }}
          >
            Abrir
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setTimeout(() => {
                  setActiveWidgetTab("Projetos");
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
                  color: activeProject ? "#3E6FBC" : "#AAA",
                  fontSize: 16,
                  marginRight: 10,
                }}
              >
                Projeto
              </Text>
              <Ionicons
                name="albums"
                color={activeProject ? "#3E6FBC" : "#AAA"}
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTimeout(() => {
                  setActiveWidgetTab("Tarefas");
                }, 150);
              }}
              style={{
                marginLeft: "2%",
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
                  color: activeTask ? "#3E6FBC" : "#AAA",
                  fontSize: 16,
                  marginRight: 10,
                }}
              >
                Tarefa
              </Text>
              <Ionicons
                name="time"
                color={activeTask ? "#3E6FBC" : "#AAA"}
                size={25}
              />
            </TouchableOpacity>
          </View> */}

          {/* <Text
            style={{
              fontSize: 16,
              marginTop: 20,
              color: "#FFF",
              fontFamily: "Poppins_400Regular",
            }}
          >
            Prioridade
          </Text> */}
          {/* <View
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
          </View> */}

          {/* <Text
            style={{
              marginTop: 20,
              color: "#FFF",
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Projeto
          </Text>
          <TouchableOpacity
            onPress={() => {
              setActiveWidgetTab("Projects");
            }}
            style={{
              justifyContent: "center",
              marginTop: 7.5,
              height: 50,
              width: "100%",
              borderRadius: 10,
              backgroundColor: "#333",
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: "#AAA",
                fontSize: 16,
              }}
            >
              Selecione um projeto
            </Text>
          </TouchableOpacity> */}
        </View>
      )}
      {activeWidgetTab === "Projetos" && (
        <View>
          <Text
            style={{
              color: "#FFF",
              fontSize: 18,
              fontFamily: "Poppins_700Bold",
              marginBottom: 10,
            }}
          >
            Escolha um projeto
          </Text>
          <Project name="Corza Digital" />
          <Project name="Aurora do lago" />
        </View>
      )}
      {activeWidgetTab === "Tarefas" && (
        <View>
          <Text
            style={{
              color: "#FFF",
              fontSize: 18,
              fontFamily: "Poppins_700Bold",
              marginBottom: 10,
            }}
          >
            Escolha uma tarefa
          </Text>
          <Task name="Definir um nicho" />
          <Task name="Criar um funil" />
          <Task name="Criar uma landing page" />
          <Task name="Criar um instagram" />
          <Task name="Subir serie no YouTube" />
        </View>
      )}
      {activeWidgetTab === "Widget" && <AddWidgetButton />}
    </View>
  );
}
