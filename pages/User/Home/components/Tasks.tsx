import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { HorizontalScroll } from "../../../../components/Listing";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-design-system";
import { useServices } from "../../../../contexts/Services";
import { Task } from "../../../../utils/types";

import * as Haptics from "expo-haptics";

import { Ionicons } from "@expo/vector-icons";
import { actualDate } from "../../../../utils/date";

export default function Tasks({
  tasks,
  taskDisplay,
  setTaskDisplay,
}: {
  tasks: Task[];
  taskDisplay: "one" | "two";
  setTaskDisplay: React.Dispatch<React.SetStateAction<"one" | "two">>;
}) {
  const { activeWorkspace, activeDate } = useServices();

  const [activeTask, setActiveTask] = useState<Task>();

  const navigation = useNavigation();

  return (
    <View style={{ width: "100%", paddingHorizontal: 20 }}>
      <ScrollView
        contentContainerStyle={{
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
                  key={i}
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
                  style={{
                    marginBottom: 10,
                    height: 150,
                    width: taskDisplay === "one" ? "100%" : "49%",
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
      </ScrollView>
    </View>
  );
}
