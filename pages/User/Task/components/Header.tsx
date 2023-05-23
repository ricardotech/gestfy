import { Text, TouchableOpacity, View } from "react-native";

export default function Header({
  navigation,
  edit,
  setEdit,
}: {
  navigation: any;
  edit: boolean;
  setEdit: any;
}) {
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
  );
}
