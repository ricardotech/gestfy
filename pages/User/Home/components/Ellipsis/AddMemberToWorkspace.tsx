import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import validator from "email-validator";
import { useServices } from "../../../../../contexts/Services";

export default function AddMemberToWorkspace({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<"list" | "addMemberToWorkspace">>;
}) {
  const [email, setEmail] = React.useState("");

  const { activeWorkspace } = useServices();

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => setTab("list")}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
            width: 30,
            borderRadius: 8,
            backgroundColor: "#333",
          }}
        >
          <Ionicons name="chevron-back" color="#FFF" size={20} />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: "#FFF",
              fontSize: 14,
              marginHorizontal: 20,
            }}
          >
            Convidar para
          </Text>
          <Text
            style={{
              color: "#FFF",
              fontSize: 18,
              fontWeight: "bold",
              marginHorizontal: 20,
            }}
          >
            {activeWorkspace?.name}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 10,
        }}
      >
        <TextInput
          onChangeText={(e) => {
            setEmail(e);
          }}
          value={email}
          keyboardType="ascii-capable"
          autoCorrect={false}
          placeholderTextColor="#AAA"
          placeholder="Email do convidado"
          style={{
            fontSize: 16,
            height: 50,
            width: "100%",
            borderRadius: 10,
            backgroundColor: "#333",
            color: "#FFF",
            paddingHorizontal: 15,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          paddingBottom: 15,
          marginTop: 10,
          backgroundColor: validator.validate(email) ? "#3E6FBC" : "#333",
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
            Convidar membro
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
            <MaterialIcons name="person-add-alt-1" color="#FFF" size={20} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
