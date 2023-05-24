import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import validator from "email-validator";
import { useServices } from "../../../../../contexts/Services";

export default function AddMemberToWorkspace({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<"list" | "addMemberToWorkspace" | "pendingInvitations">>;
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
          <Ionicons name="close" color="#FFF" size={20} />
        </TouchableOpacity>
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
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {}}
          style={{
            borderRadius: 10,
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
                color: "#999",
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
              <MaterialIcons name="person-add-alt-1" color="#999" size={20} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
