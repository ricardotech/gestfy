import React, { useState } from "react";

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

export default function Workspace() {
  const [popoverShown, setPopoverShown] = useState(false);

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
            Ricardo Fonseca
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
          height: 200,
          width: 300,
          borderRadius: 8,
        }}
        isVisible={popoverShown}
        onRequestClose={() => setPopoverShown(false)}
      >
        <TouchableOpacity
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFF",
            }}
          >
            My Workspace
          </Text>
        </TouchableOpacity>
      </Popover>
    </View>
  );
}
