import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Projects } from "./components";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-design-system";
import Tag from "./components/Tag";
import Progress from "./components/Progress";
import { ProgressBar } from "./components/ProgressBar";

export default function ProjectScreen({
  route = {
    params: {
      name: "",
      id: "",
    },
  },
}: {
  route: {
    params: {
      name: string;
      id: string;
    };
  };
}) {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    console.log("refreshing");
    setRefreshing(false);
  }, []);

  function Members() {
    return (
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
          title="+4"
        />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: "#000",
        height: "100%",
        width: "100%",
      }}
    >
      <Header />
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              marginTop: 20,
              color: "#FFF",
              fontSize: 24,
              fontFamily: "Poppins_700Bold",
            }}
          >
            {route.params.name}
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: "#FFF",
              fontSize: 15,
              fontFamily: "Poppins_400Regular",
            }}
          >
            UM CONDOMÍNIO EXCLUSIVO COM ARQUITETURA COLONIAL ÀS MARGENS DO LAGO
            CORUMBÁ IV.
          </Text>
          <View
            style={{
              paddingVertical: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Members />
            <Tag name="Imobiliario" />
          </View>
          <Progress />
        </View>
      </ScrollView>
    </View>
  );
}
