import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Task } from "../../../../../utils/types";

export default function DueDate({
  openModal,
  closeModal,
  activeTab,
  setActiveTab,
  dueDate,
  task,
  fetchTask,
}: {
  openModal: () => void;
  closeModal: () => void;
  activeTab: string | undefined;
  setActiveTab: any;
  dueDate: any;
  task: Task | undefined;
  fetchTask: () => void;
}) {
  const formattedDate = String(task?.dueDate).split("-").reverse().join("-");
  const formattedDueDate = String(dueDate).split("-").reverse().join("-");

  return (
    <View
      style={{
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomColor: "rgba(255, 255, 255, 0.05)",
        borderBottomWidth: 1,
      }}
    >
      <Text
        style={{
          color: "#BBB",
        }}
      >
        Data de entrega
      </Text>
      <TouchableOpacity
        onPress={() => {
          openModal();
          setActiveTab("AddDueDate");
        }}
        style={{
          marginTop: 10,
          backgroundColor: "rgba(55, 55, 55, 0.5)",
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          padding: 10,
          paddingVertical: 10,
          borderRadius: 8,
        }}
      >
        <Ionicons name="time" color="#BBB" size={15} />
        <Text
          style={{
            marginLeft: 10,
            color: "#BBB",
            marginRight: 10,
          }}
        >
          {task?.dueDate
            ? formattedDate
            : dueDate
            ? formattedDueDate
            : "Adicionar data "}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
