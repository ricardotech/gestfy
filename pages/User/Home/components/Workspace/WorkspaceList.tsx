import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Platform,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-design-system";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { useAuth } from "../../../../../contexts/Auth";
import { useControllers } from "../../../../../contexts/Controllers";

export default function WorkspaceList({
  tab,
  setTab,
  setPopoverShown,
}: {
  tab: "list" | "add";
  setTab: any;
  setPopoverShown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user, api } = useAuth();
  const { workspaces, activeWorkspace, setActiveWorkspace } = useControllers();

  return (
    <>
      <Text
        style={{
          color: "#FFF",
          fontSize: 18,
          marginTop: 20,
          marginBottom: 10,
          marginHorizontal: 20,
          fontWeight: "bold",
        }}
      >
        Escolher workspace
      </Text>
      {workspaces?.map((workspace, i) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setActiveWorkspace(workspace);
              setPopoverShown(false);
            }}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                title={workspace.name[0] + workspace.name[1]}
                rounded
                style={{
                  backgroundColor:
                    activeWorkspace === workspace ? "#3E6FBC" : "#EEE",
                }}
                textStyle={{
                  fontSize: 16,
                  color: activeWorkspace === workspace ? "#FFF" : "#333",
                }}
              />
              <Text
                style={{
                  color: activeWorkspace === workspace ? "#3E6FBC" : "#FFF",
                  fontWeight: activeWorkspace === workspace ? "bold" : "normal",
                  marginLeft: 10,
                }}
              >
                {workspace.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        onPress={() => {
          setTab("add");
        }}
        style={{
          marginTop: 10,
          backgroundColor: "#333",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#FFF",
              marginLeft: 10,
              fontWeight: "bold",
            }}
          >
            Adicionar workspace
          </Text>
          <View
            style={{
              width: 30,
              height: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="add" color="#FFF" size={20} />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
