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
import WorkspaceList from "./WorkspaceList";
import WorkspaceAdd from "./WorkspaceAdd";

export default function Workspace() {
  const { user, api } = useAuth();
  const { workspaces, activeWorkspace, setActiveWorkspace } = useControllers();

  const [popoverShown, setPopoverShown] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [tab, setTab] = useState<"list" | "add">("list");

  return (
    <View
      style={{
        height: 110,
        paddingTop: Platform.OS === "ios" ? 50 : 20,
        paddingHorizontal: 20,
        paddingBottom: 10,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#202123",
        borderBottomWidth: 1,
        borderBottomColor: "#2F2F2F",
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => setPopoverShown(!popoverShown)}
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Avatar
          title={
            activeWorkspace
              ? activeWorkspace.name[0] + activeWorkspace.name[1]
              : ""
          }
          rounded
          style={{
            backgroundColor: "#3E6FBC",
          }}
          textStyle={{
            fontSize: 16,
            color: "#FFF",
          }}
        />

        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 16,
              fontFamily: "Poppins_700Bold",
            }}
          >
            {activeWorkspace?.name}
          </Text>
          <Text
            style={{
              color: "#EEE",
            }}
          >
            {user?.name}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        >
          <Ionicons name="apps-outline" color="#EEE" size={20} />
        </Pressable>
      </View>
      <Popover
        backgroundStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        }}
        popoverStyle={{
          backgroundColor: "#202123",
          width: 300,
          borderRadius: 8,
        }}
        isVisible={popoverShown}
        onRequestClose={() => {
          setPopoverShown(false);
          setTimeout(() => {
            setTab("list");
          }, 400);
        }}
      >
        {tab === "list" && (
          <WorkspaceList
            tab={tab}
            setTab={setTab}
            setPopoverShown={setPopoverShown}
          />
        )}
        {tab === "add" && (
          <WorkspaceAdd
            tab={tab}
            setTab={setTab}
            setPopoverShown={setPopoverShown}
          />
        )}
      </Popover>
    </View>
  );
}
