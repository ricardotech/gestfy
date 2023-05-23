import React from "react";

import {
  View,
  Text,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";

import * as Haptics from "expo-haptics";

import { Ionicons } from "@expo/vector-icons";
import AddTask from "./AddTask";
import AddSquad from "./AddSquad";

export default function Add({ closeModal }: { closeModal: () => void }) {
  const [activeTab, setActiveTab] = React.useState<
    "Widget" | "Projeto" | "Squad" | "Workspace"
  >("Widget");

  return (
    <View>
      {activeTab === "Widget" && (
        <AddTask
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          closeModal={closeModal}
        />
      )}
      {activeTab === "Squad" && (
        <AddSquad
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          closeModal={closeModal}
        />
      )}
    </View>
  );
}
