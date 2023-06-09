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
import { useServices } from "../../contexts/Services";
import DropdownAlert from "react-native-dropdownalert";

export default function SignIn() {
  const { signIn } = useServices();

  const navigation = useNavigation();

  const [email, setEmail] = useState<string>("");
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
                    Entrar na sua conta
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
                    E-mail
                  </Text>
                  <TextInput
                    keyboardType="email-address"
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
                      marginTop: 10,
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
                    <Text
                      style={{
                        margin: 10,
                        color: "#FFF",
                        fontSize: 14,
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                      }}
                    >
                      Esqueceu sua senha?
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
                    const res: any = await signIn({
                      email,
                      password,
                    });
                    if (res === "Usuário autenticado com sucesso!") {
                      dropDownAlertRef.alertWithType(
                        "success",
                        "Bem-vindo de volta!",
                        "Sua autenticação foi realizada com sucesso."
                      );
                    } else {
                      dropDownAlertRef.alertWithType(
                        "error",
                        "Erro ao entrar",
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
                    Entrar agora
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SignUp" as never);
                  }}
                  style={{
                    marginBottom: Platform.OS === "android" ? 56 : 10,
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
                    Ou clique aqui para criar sua conta
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
