import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  FlatList,
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
import moment from "moment";
import "moment/locale/pt-br"; // Importe o locale para português do Brasil

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

  const [activeTab, setActiveTab] = React.useState<"Home" | "Add" | "Ellipsis">(
    "Home"
  );

  const [taskDisplay, setTaskDisplay] = useState<"one" | "two">("one");

  const dataAtualObj = {
    day: moment().format("DD"),
    month: moment().format("MM"),
    year: moment().format("YYYY"),
    weekDayAbr: moment().format("ddd"),
    weekDay: moment().format("dddd"),
  };

  const [dataAtual, setDataAtual] = useState(dataAtualObj);

  const obterListaDatas = () => {
    moment.locale("pt-br"); // Defina o idioma para português do Brasil

    const dataAtual = moment().format("YYYY-MM-DD");
    const dataUltimaData = moment().add(2, "weeks").format("YYYY-MM-DD");
    const dataUltimos14Dias = moment(dataUltimaData).subtract(14, "days");
    const dataProximos14Dias = moment(dataUltimaData);

    const listaDatas = [];

    listaDatas.push(dataAtualObj);

    for (let i = 0; i < 14; i++) {
      const data = {
        date: dataUltimos14Dias.add(1, "day").format("YYYY-MM-DD"),
        day: dataUltimos14Dias.format("DD"),
        month: dataUltimos14Dias.format("MM"),
        year: dataUltimos14Dias.format("YYYY"),
        weekDayAbr: dataUltimos14Dias.format("ddd"),
        weekDay: dataUltimos14Dias.format("dddd"),
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
      };
      listaDatas.push(data);
    }

    return listaDatas;
  };

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

  useEffect(() => {
    getWorkspaces().then((workspaces) => {
      getActiveWorkspace(workspaces).then((activeWorkspace) => {
        getTasks(activeWorkspace._id).then((tasks) => {
          setLoading(false);
        });
      });
    });
  }, []);

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
        <FlatList
          data={listaDatas}
          ref={calendarRef}
          style={{
            height: 60,
            paddingTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setDataAtual(item);
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
                  color: dataAtual.day === item.day ? "#FFF" : "#999",
                  fontSize: 16,
                }}
              >
                {item.day}
              </Text>
              <Text
                style={{
                  color: dataAtual.day === item.day ? "#FFF" : "#999",
                  fontSize: 16,
                  fontWeight: "bold",
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

        <Widgets taskDisplay={taskDisplay} setTaskDisplay={setTaskDisplay} />
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
          backgroundColor: "#202123",
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
