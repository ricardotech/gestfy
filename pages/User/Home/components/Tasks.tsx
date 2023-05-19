import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { HorizontalScroll } from "../../../../components/Listing";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-design-system";
import { useServices } from "../../../../contexts/Services";
import { Task } from "../../../../utils/types";

import * as Haptics from "expo-haptics";

import { Ionicons } from "@expo/vector-icons";

export default function tasks() {
  const { tasks, activeWorkspace } = useServices();

  const [activeTask, setActiveTask] = useState<Task>();

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
            if (widget.workspaceId === activeWorkspace?._id)
              return (
                <Pressable
                  onLongPress={() => {
                    setActiveTask(widget);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    setTimeout(() => {
                      setActiveTask(undefined);
                    }, 2000);
                  }}
                  key={i}
                  style={{
                    marginTop: 10,
                    height: 150,
                    width: "49%",
                    backgroundColor:
                      activeTask === widget ? "rgba(255, 75, 75, 1)" : "#444",
                    borderRadius: 10,
                    padding: 10,
                    justifyContent: "space-between",
                  }}
                >
                  {activeTask === widget ? (
                    <View
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="trash" color="#FFF" size={30} />
                    </View>
                  ) : (
                    <View>
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
                    </View>
                  )}
                </Pressable>
              );
          })}
      </View>
    </View>
  );
}
