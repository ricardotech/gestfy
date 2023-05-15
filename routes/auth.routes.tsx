import React, { useContext } from "react";
import { Dimensions, Platform, View } from "react-native";

import * as Device from "expo-device";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../pages/User/Home";
import { Avatar } from "react-native-design-system";
import ProjectScreen from "../pages/User/Project";
import Auth from "../pages/Auth";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";

type StackNavigatorParamList = {
  Auth: {};
  SignIn: {};
  SignUp: {};
};

const AuthStack = createNativeStackNavigator<StackNavigatorParamList>();

function Stack() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Auth"
        component={Auth}
        options={{
          headerShown: false,
          title: "Ricardo",
        }}
      />

      <AuthStack.Group screenOptions={{}}>
        <AuthStack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
            title: "Project",
          }}
        />
        <AuthStack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
            title: "Project",
          }}
        />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
}

export default Stack;
