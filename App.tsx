import "react-native-gesture-handler";

import React from "react";

import { View, StatusBar } from "react-native";
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
import { WorkspacesProvider } from "./contexts/WorkspacesContext";

export default function Index() {
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
            <WorkspacesProvider>
              <Routes />
            </WorkspacesProvider>
        </NavigationContainer>
      </View>
    </ThemeProvider>
  );
}
