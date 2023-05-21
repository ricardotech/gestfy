import React, { useEffect, useState } from "react";

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
import { Workspace, Add, Widgets, BottomTab } from "./components";
import { handleApi, useServices } from "../../../contexts/Services";
import Ellipsis from "./components/Ellipsis";
import Loading from "../../Loading";

export default function HomeScreen() {
  const {
    user,
    api,
    signOut,
    getWorkspaces,
    getActiveWorkspace,
    getTasks,
    tasks,
  } = useServices();

  const [loading, setLoading] = useState<boolean>(true);

  const [refreshing, setRefreshing] = React.useState(false);
  const [popoverShown, setPopoverShown] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState<"Home" | "Add" | "Ellipsis">(
    "Home"
  );

  useEffect(() => {
    getWorkspaces().then((workspaces) => {
      getActiveWorkspace(workspaces).then((activeWorkspace) => {
        getTasks(activeWorkspace._id).then((tasks) => {
          setLoading(false);
        });
      });
    });
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getWorkspaces().then((workspaces) => {
      getActiveWorkspace(workspaces).then((activeWorkspace) => {
        getTasks(activeWorkspace._id).then((tasks) => {
          setLoading(false);
        });
      });
    });
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

  if (loading) return <Loading />;

  return (
    <View
      style={{
        backgroundColor: "#202123",
        height: "100%",
        width: "100%",
      }}
    >
      <Workspace
        openModal={openModal}
        closeModal={closeModal}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
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
          backgroundColor: "#202123",
        }}
        onClose={() => {
          setActiveTab("Home");
        }}
      >
        {activeTab === "Add" && <Add closeModal={closeModal} />}
        {activeTab === "Ellipsis" && <Ellipsis />}
      </Modalize>
    </View>
  );
}
