import React from "react";
import { View, Text, Pressable } from "react-native";
import { HorizontalScroll } from "../../../../components/Listing";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-design-system";
import { Image } from "react-native";

export default function Projects() {
  const navigation = useNavigation();

  function Project({
    name = "",
    size = "sm",
    bg = "",
  }: {
    size?: "sm" | "lg";
    bg?: string;
    name?: string;
  }) {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate(
            "Project" as never,
            {
              name,
            } as never
          );
        }}
        style={{
          borderRadius: 10,
          backgroundColor: bg || "#3E6FBC",
          height: size === "sm" ? "50%" : "100%",
          width: size === "sm" ? 300 : 300,
          marginRight: 10,
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 16,
          }}
        >
          {name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            source={{
              uri: "https://avatars.githubusercontent.com/u/1316339?v=4",
            }}
          />
          <Avatar
            style={{
              marginLeft: -10,
              zIndex: 2,
            }}
            source={{
              uri: "https://avatars.githubusercontent.com/u/1316313?v=4",
            }}
          />
          <Avatar
            style={{
              marginLeft: -20,
              zIndex: 3,
            }}
            source={{
              uri: "https://avatars.githubusercontent.com/u/1316329?v=4",
            }}
          />
          <Avatar
            style={{
              marginLeft: -30,
              zIndex: 3,
            }}
            source={{
              uri: "https://avatars.githubusercontent.com/u/1313311?v=4",
            }}
          />
        </View>
      </Pressable>
    );
  }

  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 20,
            fontFamily: "Poppins_400Regular",
          }}
        >
          Projetos recentes
        </Text>
        <Pressable>
          <Text
            style={{
              color: "#3E6FBC",
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Ver todos
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          height: 150,
        }}
      >
        <HorizontalScroll>
          <Project size="lg" bg="#333" name="Aurora do Lago" />
        </HorizontalScroll>
      </View>
    </View>
  );
}
