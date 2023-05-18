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
import { useServices } from "../../contexts/Services";
import DropdownAlert from "react-native-dropdownalert";

export default function SignUp() {
  const { signUp } = useServices();

  const navigation = useNavigation();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
                    Crie sua conta agora
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
                    Nome completo
                  </Text>
                  <TextInput
                    keyboardType="ascii-capable"
                    autoCapitalize="none"
                    autoComplete="name"
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
                  <Text
                    style={{
                      margin: 10,
                      color: "#FFF",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    E-mail
                  </Text>
                  <TextInput
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
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                  />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        margin: 10,
                        color: "#FFF",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Senha
                    </Text>
                  </View>
                  <TextInput
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect={false}
                    secureTextEntry
                    style={{
                      borderRadius: 45,
                      height: 45,
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      paddingHorizontal: 15,
                      color: "#FFF",
                    }}
                    value={password}
                    onChangeText={(e) => setPassword(e)}
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
                    const res: any = await signUp({
                      name,
                      email,
                      password,
                    });
                    if (res === "Usuário criado com sucesso!") {
                      dropDownAlertRef.alertWithType(
                        "success",
                        "Bem-vindo!",
                        "Sua conta foi criada com sucesso."
                      );
                    } else {
                      dropDownAlertRef.alertWithType(
                        "error",
                        "Erro ao criar",
                        String(res)
                      );
                    }
                    setButtonPressed(true);
                    setTimeout(() => {
                      setButtonPressed(false);
                    }, 4000);
                  }}
                  disabled={buttonPressed}
                  style={{
                    marginTop: 20,
                    marginBottom: 10,
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
                    Criar sua conta
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SignIn" as never);
                  }}
                  style={{
                    marginBottom: 10,
                    height: 45,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 45,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#FFF",
                      fontWeight: "bold",
                      textDecorationLine: "underline",
                    }}
                  >
                    Ou clique aqui para entrar na sua conta
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
