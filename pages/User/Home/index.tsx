import React, { useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modalize } from "react-native-modalize";

import Popover, {
  PopoverMode,
  PopoverPlacement,
} from "react-native-popover-view";
import { Projects, Workspace, Add, Widgets, BottomTab } from "./components";
import { handleApi, useAuth } from "../../../contexts/Auth";

export default function HomeScreen() {
  const { user, api, signOut } = useAuth();

  const [refreshing, setRefreshing] = React.useState(false);
  const [popoverShown, setPopoverShown] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState<"Home" | "Add">("Home");

  useEffect(() => {
    handleApi();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    console.log("refreshing");
    setRefreshing(false);
  }, []);

  const modalRef:
    | React.MutableRefObject<null>
    | {
        current: {
          open: () => void;
          close: () => void;
        };
      } = React.useRef(null);

  function openModal() {
    if (modalRef.current) {
      modalRef.current.open();
    }
  }

  function closeModal() {
    if (modalRef.current) {
      modalRef.current.close();
    }
  }

  function renderContent() {
    return (
      <View>
        <Text>Content</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: "#202123",
        height: "100%",
        width: "100%",
      }}
    >
      <Workspace />
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor="#BBB"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Widgets />
        <Projects />
        <TouchableOpacity
          onPress={signOut}
          style={{
            height: 40,
            width: 40,
            backgroundColor: "red",
          }}
        />
      </ScrollView>
      <BottomTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openModal={openModal}
      />
      <Modalize
        ref={modalRef}
        handlePosition="inside"
        adjustToContentHeight
        handleStyle={{
          backgroundColor: "#494949",
        }}
        onClose={() => {
          setActiveTab("Home");
        }}
      >
        <Add closeModal={closeModal} />
      </Modalize>
    </View>
  );
}
