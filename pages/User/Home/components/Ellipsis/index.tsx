import React, { useRef, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Platform, Text, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-design-system";
import { handleApi, useServices } from "../../../../../contexts/Services";
import AddMemberToWorkspace from "./AddMemberToWorkspace";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import validator from "email-validator";
import DropdownAlert from "react-native-dropdownalert";
import PendingInvitations from "./PendingInvitations";

export default function Ellipsis({ closeModal }: { closeModal: () => void }) {
  const { activeWorkspace, addMemberToWorkspace, signOut, api } = useServices();

  const [popoverShown, setPopoverShown] = useState(false);
  const [email, setEmail] = useState("");

  const [tab, setTab] = useState<
    "list" | "addMemberToWorkspace" | "pendingInvitations"
  >("list");

  let dropDownAlertRef: any = useRef();

  function Item({
    name,
    icon,
    onPress,
  }: {
    name: string;
    icon: React.ReactNode;
    onPress: () => void;
  }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 20,
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {icon}
        <Text
          style={{
            marginLeft: 12,
            color: "#EEE",
            fontFamily: "Poppins_400Regular",
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: "100%",
        backgroundColor: "#191919",
        paddingVertical: Platform.OS === "ios" ? 30 : 20,
        paddingBottom: tab === "addMemberToWorkspace" ? 0 : "auto",
      }}
    >
      {tab === "list" && (
        <View
          style={{
            paddingTop: 10,
          }}
        >
          {Platform.OS === "android" && (
            <View
              style={{
                paddingHorizontal: 20,
                height: 40,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  closeModal();
                }}
              >
                <Text
                  style={{
                    color: "#3E6FBC",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Voltar
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <Item
            name="Convites pendentes"
            onPress={() => {
              setTab("pendingInvitations");
            }}
            icon={
              <View>
                <MaterialIcons
                  name="mark-email-unread"
                  color="#EEE"
                  size={20}
                />
              </View>
            }
          />
          <Item
            name="Adicionar membro ao workspace"
            onPress={() => {
              setPopoverShown(true);
            }}
            icon={
              <MaterialIcons name="person-add-alt-1" color="#EEE" size={20} />
            }
          />
          <Item
            name="Deletar todos workspaces"
            onPress={async () => {
              handleApi();
              const res = await api.post("/workspaces/all");
            }}
            icon={<Ionicons name="trash" color="#EEE" size={20} />}
          />
          <Item
            name="Sair da sua conta"
            onPress={signOut}
            icon={<MaterialIcons name="logout" color="#EEE" size={20} />}
          />
        </View>
      )}
      {tab === "addMemberToWorkspace" && (
        <AddMemberToWorkspace setTab={setTab} />
      )}
      {tab === "pendingInvitations" && <PendingInvitations />}
      <Popover
        backgroundStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        }}
        popoverStyle={{
          backgroundColor: "#191919",
          width: 300,
          borderRadius: 8,
        }}
        isVisible={popoverShown}
        onRequestClose={() => {
          setPopoverShown(false);
          setTimeout(() => {
            setTab("list");
          }, 400);
        }}
      >
        <View
          style={{
            paddingTop: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <View>
            <Text
              style={{
                color: "#FFF",
                fontSize: 14,
              }}
            >
              Convidar para
            </Text>
            <Text
              style={{
                color: "#FFF",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {activeWorkspace?.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setPopoverShown(false)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 30,
              width: 30,
              borderRadius: 8,
              backgroundColor: "#333",
            }}
          >
            <Ionicons name="close" color="#FFF" size={20} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
        >
          <TextInput
            onChangeText={(e) => {
              setEmail(e);
            }}
            value={email}
            autoCapitalize="none"
            placeholderTextColor="#AAA"
            placeholder="Email do convidado"
            style={{
              fontSize: 16,
              height: 50,
              width: "100%",
              borderRadius: 10,
              backgroundColor: "#333",
              color: "#FFF",
              paddingHorizontal: 15,
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              const res = await addMemberToWorkspace(
                String(activeWorkspace?._id),
                email
              );
              res === "Convite enviado com sucesso."
                ? dropDownAlertRef
                    .alertWithType("success", "", res)
                    .then(() => {
                      setTimeout(() => {
                        setPopoverShown(false);
                      }, 500);
                    })
                : dropDownAlertRef.alertWithType("error", "", res).then(() =>
                    setTimeout(() => {
                      setEmail("");
                    }, 500)
                  );
            }}
            style={{
              borderRadius: 10,
              backgroundColor: validator.validate(email) ? "#3E6FBC" : "#333",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: validator.validate(email) ? "#FFF" : "#777",
                  fontSize: 16,
                }}
              >
                Convidar membro
              </Text>
              <View
                style={{
                  width: 30,
                  height: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="person-add-alt-1"
                  color={validator.validate(email) ? "#FFF" : "#777"}
                  size={20}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <DropdownAlert
          contentContainerStyle={{
            zIndex: 99999999999999,
          }}
          renderImage={() => <View />}
          closeInterval={1000}
          ref={(ref) => {
            if (ref) {
              dropDownAlertRef = ref;
            }
          }}
        />
      </Popover>
    </View>
  );
}
