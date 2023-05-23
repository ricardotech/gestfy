import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";

import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useServices } from "../../../../../contexts/Services";
import DropdownAlert from "react-native-dropdownalert";
import { Workspace } from "../../../../../utils/types";

export default function CreateWorkspace({
  workspaces,
  setWorkspaces,
  getWorkspaces,
  getActiveWorkspace,
}: {
  workspaces: any;
  setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>;
  getWorkspaces: () => Promise<Workspace[]>;
  getActiveWorkspace: (workspaces: Workspace[]) => Promise<Workspace>;
}) {
  const { signIn, addWorkspace } = useServices();

  const navigation = useNavigation();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [buttonPressed, setButtonPressed] = useState<boolean>(false);

  let dropDownAlertRef: any = useRef();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#000" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
                      fontSize: 60,
                      fontWeight: "900",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Vamos começar?
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      margin: 10,
                      color: "#FFF",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Insira o nome do seu primeiro workspace
                  </Text>
                  <TextInput
                    placeholderTextColor="#777"
                    placeholder="Meu primeiro workspace"
                    keyboardType="ascii-capable"
                    autoComplete="email"
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
                  onPress={async () => {
                    const res: any = await addWorkspace({
                      name,
                    });
                    if (res._id) {
                      getWorkspaces().then((workspaces) => {
                        setWorkspaces(workspaces);
                        getActiveWorkspace(workspaces).then(
                          (activeWorkspace) => {
                            setWorkspaces([...workspaces, res]);
                          }
                        );
                      });
                    }
                  }}
                  disabled={name.length <= 5}
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    height: 45,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 45,
                    backgroundColor: name.length > 5 ? "#3E6FBC" : "#555",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: name.length > 5 ? "#FFF" : "#999",
                      fontWeight: "bold",
                    }}
                  >
                    Criar workspace
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
