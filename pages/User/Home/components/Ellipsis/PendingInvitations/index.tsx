import React, { useEffect, useRef } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { useServices } from "../../../../../../contexts/Services";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Avatar } from "react-native-design-system";
import DropdownAlert from "react-native-dropdownalert";
import Popover from "react-native-popover-view/dist/Popover";

export default function PendingInvitations() {
  const {
    getPendingInvitationsWorkspace,
    acceptInvitationWorkspace,
    declineInvitationWorkspace,
  } = useServices();

  const [loading, setLoading] = React.useState(true);

  const [invitations, setInvitations] = React.useState<any[]>([]);

  let dropDownAlertRef: any = useRef();

  const [popoverShown, setPopoverShown] = React.useState(false);

  const [activeInvitation, setActiveInvitation] = React.useState<{
    _id: string;
    workspaceId: string;
    workspaceName: string;
  }>();

  useEffect(() => {
    getPendingInvitationsWorkspace().then((invitations) => {
      setInvitations(invitations);
      setLoading(false);
    });
  }, []);

  function Assignee({
    invitation,
    name,
    title,
  }: {
    invitation: any;
    name: string;
    title: string;
  }) {
    return (
      <Pressable
        onPress={() => {
          setActiveInvitation(invitation);
          setPopoverShown(true);
        }}
        style={{
          marginBottom: 10,
          height: 45,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{
            borderRadius: 4,
            backgroundColor: "#3E6FCB",
          }}
          textStyle={{
            fontSize: 12,
            color: "#FFF",
          }}
          size="lg"
          title={title}
        />
        <Text
          style={{
            marginLeft: 10,
            color: "#FFF",
            fontSize: 20,
          }}
        >
          {name}
        </Text>
      </Pressable>
    );
  }

  if (loading) {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          height: 95,
        }}
      >
        <ActivityIndicator color="#3E6FCB" size="large" />
      </View>
    );
  }

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      {invitations.length > 0 ? (
        invitations.map((invitation, i) => (
          <Assignee
            key={i}
            invitation={invitation}
            title={invitation.workspaceName[0] + invitation.workspaceName[1]}
            name={invitation.workspaceName}
          />
        ))
      ) : (
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFF" }}>No pending invitations</Text>
        </View>
      )}
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
        }}
      >
        <View
          style={{
            paddingTop: 20,
            paddingHorizontal: 20,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                color: "#FFF",
                fontSize: 14,
              }}
            >
              Convite para participar de
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: "#FFF",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {activeInvitation?.workspaceName}
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
            padding: 20,
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              const res = await acceptInvitationWorkspace(
                String(activeInvitation?._id)
              );
              console.log(res);
            }}
            style={{
              borderRadius: 10,
              backgroundColor: "#3E6FBC",
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
                  color: "#FFF",
                  fontSize: 16,
                }}
              >
                Aceitar convite
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
                <MaterialIcons name="check" color="#FFF" size={20} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              const res = await declineInvitationWorkspace(
                String(activeInvitation?._id)
              );
              console.log(res);
            }}
            style={{
              marginTop: 10,
              borderRadius: 10,
              backgroundColor: "#BB5A5F",
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
                  color: "#FFF",
                  fontSize: 16,
                }}
              >
                Recusar convite
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
                <MaterialIcons name="close" color="#FFF" size={20} />
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
