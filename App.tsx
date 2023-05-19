import "react-native-gesture-handler";

import React from "react";

import { View, StatusBar, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { theme, ThemeProvider } from "react-native-design-system";

import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import Routes from "./routes";
import Loading from "./pages/Loading";
import { ServicesProvider } from "./contexts/Services";

export default function Index() {
  LogBox.ignoreAllLogs();

  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  theme.colors.primary = "#FFF";

  return (
    <ThemeProvider theme={theme}>
      <View
        style={{
          backgroundColor: "#202123",
          height: "100%",
          width: "100%",
        }}
      >
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <ServicesProvider>
            <ServicesProvider>
              <Routes />
            </ServicesProvider>
          </ServicesProvider>
        </NavigationContainer>
      </View>
    </ThemeProvider>
  );
}
