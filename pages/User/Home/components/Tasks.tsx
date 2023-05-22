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
                  onPress={() => {
                    navigation.navigate(
                      "Task" as never,
                      {
                        id: widget._id,
                      } as never
                    );
                  }}
                  onLongPress={() => {
                    setActiveTask(widget);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    setTimeout(() => {
                      setActiveTask(undefined);
                    }, 2500);
                  }}
                  key={i}
                  style={{
                    marginTop: 10,
                    height: 150,
                    width: "49%",
                    backgroundColor:
                      activeTask === widget
                        ? "#3E6FBC"
                        : widget.priority === "High"
                        ? "rgba(255, 55, 55, 0.4)"
                        : widget.priority === "Medium"
                        ? "rgba(255, 155, 55, 0.5)"
                        : "#333",
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
                      <Ionicons name="checkbox" color="#FFF" size={40} />
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
                    </View>
                  )}
                </Pressable>
              );
          })}
      </View>
    </View>
  );
}
