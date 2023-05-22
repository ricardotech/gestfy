import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TextInput } from "react-native";

import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { useServices } from "../../../contexts/Services";
import { Task } from "../../../utils/types";
import Loading from "../../Loading";
import Header from "./components/Header";

export default function TaskScreen({ route }: any) {
  const id = route.params.id;

  const navigation = useNavigation();
  const { getTask, activeWorkspace } = useServices();

  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState<boolean>(true);

  const [edit, setEdit] = useState<boolean>(false);

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
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 20,
                paddingTop: 10,
                paddingHorizontal: 20,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text
                  style={{
                    color: "#3E6FBC",
                    fontSize: 18,
                  }}
                >
                  Voltar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEdit(!edit)}>
                <Text
                  style={{
                    color: "#3E6FBC",
                    fontSize: 18,
                  }}
                >
                  {edit ? "Confirmar" : "Editar"}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              autoFocus={edit ? true : false}
              editable={edit ? true : false}
              style={{
                color: "#FFF",
                fontSize: 36,
                fontWeight: "900",
                paddingHorizontal: 20,
              }}
              defaultValue={task?.description}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: "rgba(255, 255, 255, 0.05)",
                borderBottomWidth: 1,
                paddingHorizontal: 20,
                paddingBottom: 20,
                paddingVertical: 15,
              }}
            >
              <View>
                <Text
                  style={{
                    color: "#BBB",
                  }}
                >
                  Prioridade
                </Text>
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor:
                      task?.priority === "Low"
                        ? "rgba(55, 55, 55, 0.5)"
                        : task?.priority === "Medium"
                        ? "rgba(255, 155, 55, 0.5)"
                        : "rgba(255, 55, 55, 0.4)",
                    width: "auto",
                    height: "auto",
                    paddingHorizontal: 15,
                    padding: 10,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: task?.priority === "Low" ? "#BBB" : "#FFF",
                    }}
                  >
                    {task?.priority === "Low"
                      ? "Baixa"
                      : task?.priority === "Medium"
                      ? "Média"
                      : "Alta"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: "#BBB",
                  }}
                >
                  Participantes
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    backgroundColor: "rgba(55, 55, 55, 0.5)",
                    width: "auto",
                    height: "auto",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 15,
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#BBB",
                      marginRight: 10,
                    }}
                  >
                    Adicionar participante
                  </Text>
                  <MaterialIcons
                    name="person-add-alt-1"
                    color="#BBB"
                    size={16}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderBottomColor: "rgba(255, 255, 255, 0.05)",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "#BBB",
                }}
              >
                Data de entrega
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: "rgba(55, 55, 55, 0.5)",
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 15,
                  padding: 10,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
              >
                <Ionicons name="time" color="#BBB" size={15} />
                <Text
                  style={{
                    marginLeft: 10,
                    color: "#BBB",
                    marginRight: 10,
                  }}
                >
                  Adicionar data
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderBottomColor: "rgba(255, 255, 255, 0.05)",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "#BBB",
                }}
              >
                Status
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: "rgba(55, 55, 55, 0.5)",
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 15,
                  padding: 10,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
              >
                <MaterialIcons name="check-box" color="#BBB" size={15} />
                <Text
                  style={{
                    marginLeft: 10,
                    color: "#BBB",
                    marginRight: 10,
                  }}
                >
                  Adicionar status
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderBottomColor: "rgba(255, 255, 255, 0.05)",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "#BBB",
                }}
              >
                Descrição
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: "rgba(55, 55, 55, 0.5)",
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 15,
                  padding: 10,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
              >
                <Ionicons name="text" color="#BBB" size={15} />

                <Text
                  style={{
                    marginLeft: 10,
                    color: "#BBB",
                    marginRight: 10,
                  }}
                >
                  Adicionar descrição
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: "#BBB",
                }}
              >
                Tarefas
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: "rgba(55, 55, 55, 0.5)",
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 15,
                  padding: 10,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
              >
                <Ionicons name="square" color="#BBB" size={15} />

                <Text
                  style={{
                    marginLeft: 10,
                    color: "#BBB",
                    marginRight: 10,
                  }}
                >
                  Adicionar tarefa
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 8,
                height: 50,
                width: "100%",
                backgroundColor: "#3E6FBC",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Concluir tarefa
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
