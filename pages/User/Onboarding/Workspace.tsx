import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";

import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useServices } from "../../../contexts/Services";
import DropdownAlert from "react-native-dropdownalert";

export default function OnboardingWorkspace() {
  const navigation = useNavigation();

  const [name, setName] = useState<string>("");

  const [buttonPressed, setButtonPressed] = useState<boolean>(false);

  let dropDownAlertRef: any = useRef();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
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
              <View>
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
                    Workspace
                  </Text>
                  <Text
                    style={{
                      color: "#FFF",
                      fontSize: 16,
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Escolha como vai chamar seu workspace
                  </Text>
                </View>
                <View>
                  <TextInput
                    placeholderTextColor="#777"
                    placeholder="Meu primeiro workspace"
                    keyboardType="ascii-capable"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect={false}
                    style={{
                      borderRadius: 45,
                      height: 45,
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      paddingHorizontal: 15,
                      color: "#FFF",
                    }}
                    value={name}
                    onChangeText={(e) => setName(e)}
                  />
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    alert(name);
                  }}
                  disabled={buttonPressed}
                  style={{
                    marginTop: 20,
                    height: 45,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 45,
                    backgroundColor: "#FFF",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    Criar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </View>
      <DropdownAlert
        closeInterval={4000}
        ref={(ref) => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
    </KeyboardAvoidingView>
  );
}
