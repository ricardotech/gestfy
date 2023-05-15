import React, { useContext } from "react";
import { Dimensions, Platform, View } from "react-native";

import * as Device from "expo-device";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../pages/User/Home";
import { Avatar } from "react-native-design-system";
import ProjectScreen from "../pages/User/Project";
import Onboarding from "../pages/User/Onboarding";

type TabNavigatorParamList = {
  EventListView: { icon: string };
  CreateEvent: { icon: string };
};

type StackNavigatorParamList = {
  Home: {};
  Intro: {};
  Favoritos: {};
  Course: {
    id: string;
  };
  Lesson: {};
  Project: {
    name: string;
    id: string;
  };
  Add: {};
};

const UserStack = createNativeStackNavigator<StackNavigatorParamList>();

function Stack() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "Ricardo",
        }}
      />

      <UserStack.Group
        screenOptions={{
          presentation: "modal",
        }}
      >
        <UserStack.Screen
          name="Project"
          component={ProjectScreen}
          options={{
            headerShown: false,
            title: "Project",
          }}
        />
      </UserStack.Group>
    </UserStack.Navigator>
  );
}

export default Stack;
