import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

import { Text, View, TouchableOpacity } from "react-native";
import { Task } from "../../../../../utils/types";

export default function Priority({ task }: { task: Task }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "rgba(255, 255, 255, 0.05)",
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingVertical: 15,
      }}
    >
      <View>
        <Text
          style={{
            color: "#BBB",
          }}
        >
          Prioridade
        </Text>
        <View
          style={{
            marginTop: 10,
            backgroundColor:
              task?.priority === "Low"
                ? "rgba(55, 55, 55, 0.5)"
                : task?.priority === "Medium"
                ? "rgba(255, 155, 55, 0.5)"
                : "rgba(255, 55, 55, 0.4)",
            width: "auto",
            height: "auto",
            paddingHorizontal: 15,
            padding: 10,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: task?.priority === "Low" ? "#BBB" : "#FFF",
            }}
          >
            {task?.priority === "Low"
              ? "Baixa"
              : task?.priority === "Medium"
              ? "Média"
              : "Alta"}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            color: "#BBB",
          }}
        >
          Participantes
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 10,
            backgroundColor: "rgba(55, 55, 55, 0.5)",
            width: "auto",
            height: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: "#BBB",
              marginRight: 10,
            }}
          >
            Adicionar participante
          </Text>
          <MaterialIcons name="person-add-alt-1" color="#BBB" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
