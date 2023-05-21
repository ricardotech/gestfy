import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { useServices } from "../../../contexts/Services";
import { Task } from "../../../utils/types";
import Loading from "../../Loading";
import Header from "./components/Header";

export default function TaskScreen({ route }: any) {
  const id = route.params.id;

  const { getTask } = useServices();

  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState<boolean>(true);

  async function load() {
    const task = await getTask(id);
    setTask(task);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#202123",
      }}
    >
      <SafeAreaView>
        <View
          style={{
            padding: 20,
          }}
        >
          <Header />
          <Text
            style={{
              color: "#FFF",
              fontSize: 28,
              fontWeight: "900"
            }}
          >
            {task?.description}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
