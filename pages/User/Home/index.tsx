import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modalize } from "react-native-modalize";

import { Projects, Workspace, Add, Widgets, BottomTab } from "./components";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState<"Home" | "Add">("Home");

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
        modalStyle={{
          backgroundColor: "transparent",
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
