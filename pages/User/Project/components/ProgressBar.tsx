import React from "react";

import { View, Text } from "react-native";

export const ProgressBar = ({ progress = 0, color = "3E6FBC", ...rest }) => {
  const progressBarWidth = `${progress}%`;
  return (
    <View
      style={{
        ...rest,
        height: 10,
        backgroundColor: "#333",
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          height: "100%",
          backgroundColor: color,
          width: progressBarWidth,
        }}
      />
    </View>
  );
};
