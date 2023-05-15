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
import { useAuth } from "../../../../contexts/Auth";
import { useControllers } from "../../../../contexts/WorkspacesContext";

export default function Workspace() {
  const { user, api } = useAuth();
  const { workspaces } = useControllers();

  const [popoverShown, setPopoverShown] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);

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
          title="CV"
          rounded
          textStyle={{
            fontSize: 16,
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
            AgencyPro
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
        popoverStyle={{
          backgroundColor: "#202123",
          width: 300,
          borderRadius: 8,
        }}
        isVisible={popoverShown}
        onRequestClose={() => setPopoverShown(false)}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 18,
            marginTop: 20,
            marginBottom: 10,
            marginHorizontal: 20,
            fontWeight: "bold"
          }}
        >
          Escolher workspace
        </Text>
        {workspaces?.map((workspace, i) => {
          return (
            <TouchableOpacity
              style={{
                padding: 20,
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
                  textStyle={{
                    fontSize: 16,
                  }}
                />
                <Text
                  style={{
                    color: "#FFF",
                    marginLeft: 10,
                  }}
                >
                  {workspace.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </Popover>
    </View>
  );
}
