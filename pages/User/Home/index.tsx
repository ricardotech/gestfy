import React, { useCallback, useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modalize } from "react-native-modalize";

import navigation, { useFocusEffect } from "@react-navigation/native";

import Popover, {
  PopoverMode,
  PopoverPlacement,
} from "react-native-popover-view";
import { Workspace, Add, Widgets, BottomTab } from "./components";
import { handleApi, useServices } from "../../../contexts/Services";
import Ellipsis from "./components/Ellipsis";
import Loading from "../../Loading";
import moment from "moment";
import "moment/locale/pt-br"; // Importe o locale para português do Brasil
import {
  DateObj,
  Task,
  Workspace as WorkspaceType,
} from "../../../utils/types";
import CreateWorkspace from "./components/CreateWorkspace";
import { actualDate } from "../../../utils/date";

export default function HomeScreen() {
  const {
    user,
    api,
    signOut,
    activeDate,
    setActiveDate,
    getWorkspaces,
    getActiveWorkspace,
    tasks,
    getActiveWorkspaceMembers,
  } = useServices();

  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);
  const [members, setMembers] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [refreshing, setRefreshing] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState<"Home" | "Add" | "Ellipsis">(
    "Home"
  );

  const [taskDisplay, setTaskDisplay] = useState<"one" | "two">("one");

  const obterListaDatas = () => {
    moment.locale("pt-br"); // Defina o idioma para português do Brasil

    const dataAtual = moment().format("YYYY-MM-DD");
    const dataUltimaData = moment().add(2, "weeks").format("YYYY-MM-DD");
    const dataUltimos14Dias = moment(dataUltimaData).subtract(14, "days");
    const dataProximos14Dias = moment(dataUltimaData);

    const listaDatas = [];

    listaDatas.push(actualDate);

    for (let i = 0; i < 14; i++) {
      const data = {
        date: dataUltimos14Dias.add(1, "day").format("YYYY-MM-DD"),
        day: dataUltimos14Dias.format("DD"),
        month: dataUltimos14Dias.format("MM"),
        year: dataUltimos14Dias.format("YYYY"),
        weekDayAbr: dataUltimos14Dias.format("ddd"),
        weekDay: dataUltimos14Dias.format("dddd"),
        calendarFormat: `${dataUltimos14Dias.format(
          "YYYY"
        )}-${dataUltimos14Dias.format("MM")}-${dataUltimos14Dias.format("DD")}`,
      };
      listaDatas.push(data);
    }

    for (let i = 0; i < 14; i++) {
      const data = {
        date: dataProximos14Dias.add(1, "day").format("YYYY-MM-DD"),
        day: dataProximos14Dias.format("DD"),
        month: dataProximos14Dias.format("MM"),
        year: dataProximos14Dias.format("YYYY"),
        weekDayAbr: dataProximos14Dias.format("ddd"),
        weekDay: dataProximos14Dias.format("dddd"),
        calendarFormat: `${dataUltimos14Dias.format(
          "YYYY"
        )}-${dataUltimos14Dias.format("MM")}-${dataUltimos14Dias.format("DD")}`,
      };
      listaDatas.push(data);
    }

    return listaDatas;
  };

  const listaDatas = obterListaDatas();

  const calendarRef = React.useRef<FlatList>(null);

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

  const [activeDateTasks, setActiveDateTasks] = useState<Task[]>([]);

  const getActiveDateTasks = () => {
    const tasksFiltered = tasks.filter((task) => {
      return task.dueDate === activeDate.calendarFormat;
    });
    setActiveDateTasks(tasksFiltered);
    return tasksFiltered;
  };

  function handleData() {
    setRefreshing(true);
    getWorkspaces().then((workspaces) => {
      setWorkspaces(workspaces);
      getActiveWorkspace(workspaces).then((activeWorkspace) => {
        activeWorkspace
          ? getActiveWorkspaceMembers(String(activeWorkspace._id)).then(
              (members) => {
                setMembers(members);
                setLoading(false);
              }
            )
          : getActiveDateTasks() && setLoading(false);
      });
    });
    setRefreshing(false);
  }

  const onRefresh = React.useCallback(async () => {
    handleData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleData();
    }, [])
  );

  if (loading) return <Loading />;

  if (workspaces.length === 0) {
    return (
      <CreateWorkspace
        workspaces={workspaces}
        setWorkspaces={setWorkspaces}
        getActiveWorkspace={getActiveWorkspace}
        getWorkspaces={getWorkspaces}
      />
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
      <Workspace
        openModal={openModal}
        closeModal={closeModal}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <FlatList
        data={listaDatas}
        ref={calendarRef}
        contentContainerStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        style={{
          padding: 20,
          height: Platform.OS === "ios" ? 80 : 110,
        }}
        renderItem={({ item, index }: { item: DateObj; index: number }) => (
          <TouchableOpacity
            onPress={() => {
              getActiveDateTasks();
              setActiveDate(item);
              calendarRef.current?.scrollToIndex({
                index: index,
                animated: true,
              });
            }}
            key={index}
            style={{ width: "auto", marginRight: 30 }}
          >
            <Text
              style={{
                color:
                  actualDate.day === item.day
                    ? "#5E8FEE"
                    : activeDate.day === item.day
                    ? "#FFF"
                    : "#999",
                fontSize: 16,
                fontWeight: activeDate.day === item.day ? "bold" : "normal",
              }}
            >
              {item.day}
            </Text>
            <Text
              style={{
                color:
                  actualDate.day === item.day
                    ? "#5E8FEE"
                    : activeDate.day === item.day
                    ? "#FFF"
                    : "#999",
                fontSize: 16,
                fontWeight: activeDate.day === item.day ? "bold" : "normal",
              }}
            >
              {item.weekDay === "terça-feira"
                ? "Terça"
                : item.weekDay === "quarta-feira"
                ? "Quarta"
                : item.weekDay === "quinta-feira"
                ? "Quinta"
                : item.weekDay === "sexta-feira"
                ? "Sexta"
                : item.weekDay === "sábado"
                ? "Sábado"
                : item.weekDay === "domingo"
                ? "Domingo"
                : item.weekDay === "segunda-feira"
                ? "Segunda"
                : item.weekDayAbr}
            </Text>
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <ScrollView
        style={{
          height: "100%",
        }}
        refreshControl={
          <RefreshControl
            tintColor="#BBB"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {tasks && (
          <Widgets
            tasks={tasks}
            taskDisplay={taskDisplay}
            setTaskDisplay={setTaskDisplay}
          />
        )}
      </ScrollView>
      <BottomTab
        taskDisplay={taskDisplay}
        setTaskDisplay={setTaskDisplay}
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
          backgroundColor: "#191919",
        }}
        onClose={() => {
          setActiveTab("Home");
        }}
      >
        {activeTab === "Add" && <Add closeModal={closeModal} />}
        {activeTab === "Ellipsis" && <Ellipsis closeModal={closeModal} />}
      </Modalize>
    </View>
  );
}
