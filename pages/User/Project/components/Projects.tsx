import React from "react";
import { View, Text, Pressable } from "react-native";
import { HorizontalScroll } from "../../../../components/Listing";

export default function Projects() {
  function Project({ name = "", size = "sm", bg = "" }: { size?: "sm" | "lg"; bg?: string; name?: string }) {
    return (
      <Pressable
        style={{
          borderRadius: 10,
          backgroundColor: bg || "#3E6FBC",
          height: size === "sm" ? "50%" : "100%",
          width: size === "sm" ? 300 : 300,
          marginRight: 10,
          padding: 20,
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
        <Project size="lg" bg="#000" name="Aurora do Lago" />
        <Project size="lg" bg="#000" name="Aurora do Lago" />
        </HorizontalScroll>
      </View>
    </View>
  );
}
