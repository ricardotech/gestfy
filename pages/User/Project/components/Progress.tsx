import React from "react";

import { View, Text } from "react-native";
import { ProgressBar } from "./ProgressBar";
import { Ionicons } from "@expo/vector-icons";

export default function Progress({ name = "", bg = "", color = "" }) {
  return (
    <View
      style={{
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: "#333",
        width: "100%",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "#FFF",
        }}
      >
        Desempenho
      </Text>
      <ProgressBar marginTop={10} progress={1} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            marginTop: 20,
          }}
        >
         <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "#FFF",
              }}
            >
              CPC
            </Text>
            <Ionicons
              name="help-circle"
              style={{
                marginLeft: 5,
              }}
              size={16}
              color="#AAA"
            />
          </View>
          <Text
            style={{
              marginTop: 5,
              fontSize: 30,
              color: "#FFF",
            }}
          >
            0
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "#FFF",
              }}
            >
              CPM
            </Text>
            <Ionicons
              name="help-circle"
              style={{
                marginLeft: 5,
              }}
              size={16}
              color="#AAA"
            />
          </View>
          <Text
            style={{
              marginTop: 5,
              fontSize: 30,
              color: "#FFF",
            }}
          >
            0
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
         <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "#FFF",
              }}
            >
              CPI
            </Text>
            <Ionicons
              name="help-circle"
              style={{
                marginLeft: 5,
              }}
              size={16}
              color="#AAA"
            />
          </View>
          <Text
            style={{
              marginTop: 5,
              fontSize: 30,
              color: "#FFF",
            }}
          >
            0
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            marginTop: 20,
          }}
        >
         <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "#FFF",
              }}
            >
              CPC
            </Text>
            <Ionicons
              name="help-circle"
              style={{
                marginLeft: 5,
              }}
              size={16}
              color="#AAA"
            />
          </View>
          <Text
            style={{
              marginTop: 5,
              fontSize: 30,
              color: "#FFF",
            }}
          >
            0
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "#FFF",
              }}
            >
              CPM
            </Text>
            <Ionicons
              name="help-circle"
              style={{
                marginLeft: 5,
              }}
              size={16}
              color="#AAA"
            />
          </View>
          <Text
            style={{
              marginTop: 5,
              fontSize: 30,
              color: "#FFF",
            }}
          >
            0
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
         <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "#FFF",
              }}
            >
              CPI
            </Text>
            <Ionicons
              name="help-circle"
              style={{
                marginLeft: 5,
              }}
              size={16}
              color="#AAA"
            />
          </View>
          <Text
            style={{
              marginTop: 5,
              fontSize: 30,
              color: "#FFF",
            }}
          >
            0
          </Text>
        </View>
      </View>
    </View>
  );
}
