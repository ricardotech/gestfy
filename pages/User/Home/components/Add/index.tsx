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
import AddWidget from "./AddWidget";
import AddSquad from "./AddSquad";

export default function Add({ closeModal }: { closeModal: () => void }) {
  const [activeTab, setActiveTab] = React.useState<
    "Select" | "Widget" | "Projeto" | "Squad"
  >("Select");

  return (
    <View>
      {activeTab === "Select" && (
        <View
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            width: "100%",
            backgroundColor: "#202123",
            paddingHorizontal: 20,
            paddingBottom: Platform.OS === "ios" ? 30 : 20,
          }}
        >
          <View
            style={{
              height: 60,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#FFF",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Adicionar
            </Text>
            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}
            >
              <Ionicons name="close-circle" color="#444" size={25} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setTimeout(() => {
                    setActiveTab("Widget");
                  }, 150);
                }}
                style={{
                  height: 50,
                  width: "49%",
                  backgroundColor: "#333",
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 16,
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Projeto
                </Text>
                <Ionicons
                  style={{
                    marginLeft: 10,
                  }}
                  name="file-tray"
                  color="#FFF"
                  size={20}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setTimeout(() => {
                    setActiveTab("Widget");
                  }, 150);
                }}
                style={{
                  height: 50,
                  width: "49%",
                  backgroundColor: "#333",
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 16,
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Tarefa
                </Text>
                <Ionicons
                  style={{
                    marginLeft: 10,
                  }}
                  name="square-outline"
                  color="#FFF"
                  size={20}
                />
              </Pressable>
            </View>
            {/* <Pressable
              style={{
                height: 60,
                width: "49%",
                backgroundColor: "#444",
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 16,
                  fontFamily: "Poppins_700Bold",
                }}
              >
                Projeto
              </Text>
            </Pressable> */}
          </View>
        </View>
      )}
      {activeTab === "Widget" && (
        <AddWidget
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
