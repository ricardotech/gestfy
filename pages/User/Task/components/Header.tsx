import { Text, TouchableOpacity, View } from "react-native";

import { useServices } from "../../../../contexts/Services";

export default function Header({
  navigation,
  edit,
  setEdit,
  activeTaskId,
  activeTaskDueDate
}: {
  navigation: any;
  edit: boolean;
  setEdit: any;
  activeTaskId: string;
  activeTaskDueDate: any;
}) {

  const { updateTask } = useServices();
  return (
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
      <TouchableOpacity
        onPress={() => {
            // Se edição for confirmada:
            if (edit == true) {
              updateTask(activeTaskId, {dueDate: activeTaskDueDate})
              // alert("Task edited")
            }
            setEdit(!edit);
          }}>
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
  );
}
