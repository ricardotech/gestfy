import { useNavigation } from "@react-navigation/native";
import React from "react";

import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ImageBackground,
} from "react-native";

export default function Auth() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/5496469/pexels-photo-5496469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      }}
      style={{
        flex: 1,
        backgroundColor: "#202123",
        height: "100%",
        width: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          height: "100%",
          width: "100%",
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <SafeAreaView>
          <View
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                padding: 20,
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 55,
                  fontWeight: "900",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Gestfy
              </Text>
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 16,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Gerenciador de tarefas
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignIn" as never);
                }}
                style={{
                  height: 45,
                  width: "48%",
                  backgroundColor: "#FFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 45,
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  Entrar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignUp" as never);
                }}
                style={{
                  height: 45,
                  width: "48%",
                  backgroundColor: "#3E6FBC",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 845,
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontWeight: "bold",
                  }}
                >
                  Criar conta
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
