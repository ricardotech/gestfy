import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TextInput } from "react-native";

import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { Modalize } from "react-native-modalize";
import { useServices } from "../../../contexts/Services";
import { Task } from "../../../utils/types";
import Loading from "../../Loading";
import Description from "./components/Description";
import DueDate from "./components/DueDate/index";
import AddDueDate from "./components/DueDate/add";
import FinishTask from "./components/FinishTask";
import Header from "./components/Header";
import Priority from "./components/Priority";
import Tasks from "./components/Tasks";

export default function TaskScreen({ route }: any) {
  const id = route.params.id; // Id of task being edited.

  const navigation = useNavigation();
  const { getTask, activeWorkspace } = useServices();

  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState<boolean>(true);

  const [edit, setEdit] = useState<boolean>(false);

  const [dueDate, setDueDate] = useState<any>();

  const [activeTab, setActiveTab] = useState<
    | "AddDueDate"
    | "AddStatus"
    | "AddDescription"
    | "AddTasks"
    | "DueDate"
    | "Status"
    | "Description"
    | "Tasks"
  >();

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

  async function load() {
    const task = await getTask(id);
    setTask(task);
    setLoading(false);

    const dueDateOfActiveTask = task?.dueDate
    setDueDate(dueDateOfActiveTask)
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
        backgroundColor: "#000",
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
            <Header
              edit={edit}
              setEdit={setEdit}
              activeTaskId={id}
              activeTaskDueDate={dueDate}
              navigation={navigation}
            />
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
            {task && <Priority task={task} />}
            <DueDate
              dueDate={dueDate}
              openModal={openModal}
              closeModal={closeModal}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <Description
              openModal={openModal}
              closeModal={closeModal}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <Tasks />
          </View>
          <FinishTask />
        </View>
      </SafeAreaView>
      <Modalize
        ref={modalRef}
        handlePosition="inside"
        adjustToContentHeight
        handleStyle={{
          backgroundColor: "#494949",
        }}
        modalStyle={{
          backgroundColor: "#000",
        }}
        onClose={() => {
          setActiveTab(undefined);
        }}
      >
        {activeTab === "AddDueDate" && (
          <AddDueDate
            closeModal={closeModal}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            dueDate={dueDate}
            setDueDate={setDueDate}
          />
        )}
        {activeTab === "AddDescription" && (
          <View
            style={{
              padding: 20,
            }}
          >
            <Text
              style={{
                color: "#FFF",
              }}
            >
              AddDescription
            </Text>
          </View>
        )}
      </Modalize>
    </View>
  );
}
