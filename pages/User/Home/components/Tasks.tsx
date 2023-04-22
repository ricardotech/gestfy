import React from "react";
import { View, Text, Pressable } from "react-native";
import { HorizontalScroll } from "../../../../components/Listing";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-design-system";
import { useTasks } from "../../../../contexts/WorkspacesContext";
import { Task } from "../../../../utils/types";

import { Ionicons } from "@expo/vector-icons";

export default function tasks() {
  const { tasks } = useTasks();

  const navigation = useNavigation();

  return (
    <View style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 10 }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 0,
          marginTop: 0,
        }}
      >
        {tasks &&
          tasks.map((widget: Task, i: number) => {
            return (
              <Pressable
                key={i}
                style={{
                  marginTop: 10,
                  height: 150,
                  width: "49%",
                  backgroundColor: "#444",
                  borderRadius: 10,
                  padding: 10,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontSize: 20,
                      fontFamily: "Poppins_700Bold",
                      width: "80%",
                    }}
                  >
                    {widget.description}
                  </Text>
                  <Ionicons
                    size={20}
                    color="#FFF"
                    name={
                      widget.priority === "High"
                        ? "warning"
                        : widget.priority === "Medium"
                        ? "alert-circle"
                        : "checkbox"
                    }
                  />
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontSize: 14,
                      fontFamily: "Poppins_400Regular",
                      marginRight: 10,
                    }}
                  >
                    {widget.id}
                  </Text>
                </View>
              </Pressable>
            );
          })}
      </View>
    </View>
  );
}
