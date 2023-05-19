import React from "react";
import { View, Text, Pressable } from "react-native";
import { HorizontalScroll } from "../../../../components/Listing";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-design-system";
import { useServices } from "../../../../contexts/Services";
import { Task } from "../../../../utils/types";

import { Ionicons } from "@expo/vector-icons";

export default function tasks() {
  const { tasks } = useServices();

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
                      color:
                        widget.priority === "High"
                          ? "rgba(255, 75, 75, 0.9)"
                          : widget.priority === "Medium"
                          ? "orange"
                          : "#FFF",
                      fontSize: 18,
                      fontFamily: "Poppins_400Regular",
                      marginRight: 10,
                    }}
                  >
                    {widget.priority}
                  </Text>
                  <Ionicons
                    size={20}
                    color={
                      widget.priority === "High"
                        ? "rgba(255, 75, 75, 0.9)"
                        : widget.priority === "Medium"
                        ? "orange"
                        : "#FFF"
                    }
                    name={
                      widget.priority === "High"
                        ? "warning"
                        : widget.priority === "Medium"
                        ? "alert-circle"
                        : "checkbox"
                    }
                  />
                </View>
              </Pressable>
            );
          })}
      </View>
    </View>
  );
}
