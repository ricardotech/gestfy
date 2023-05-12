import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Task, Workspace } from "../utils/types";
import { useAuth } from "./Api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "./Api";

type WorkspacesContextData = {
  tasks: Task[] | undefined | null;
  adicionarTask: (task: Task) => void;
  removerTask: (taskId: string) => void;

  workspaces: Workspace[] | undefined | null;
  adicionarWorkspace: (workspace: Workspace) => void;
};

type WorkspacesProviderProps = {
  children: ReactNode;
};

export const USER = "@Auth:user";
export const TOKEN = "@Auth:token";

export const WidgetsContext = createContext({} as WorkspacesContextData);

function WorkspacesProvider({ children }: WorkspacesProviderProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const api = axios.create();
  const API_URL = "http://localhost:3000";
  api.defaults.baseURL = API_URL;

  async function handleApi() {
    const storaged_token = await AsyncStorage.getItem(TOKEN);

    api.defaults.headers.common["Authorization"] = `Bearer ${storaged_token}`;
    api.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (
          typeof error.response === "undefined" ||
          [401, 419].includes(error.response.status)
        ) {
          signOut();
        }
        return Promise.reject(error);
      }
    );
  }

  useEffect(() => {
    handleApi();
  }, []);

  const adicionarTask = (widget: Task) => {
    setTasks([...tasks, widget]);
  };

  const adicionarWorkspace = async (workspace: Workspace) => {
    api.post("/workspaces", workspace).then((res) => {
      const workspace: Workspace = res.data;
      setWorkspaces([...workspaces, workspace]);
    });
  };

  const removerTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <WidgetsContext.Provider
      value={{
        tasks,
        workspaces,
        adicionarWorkspace,
        adicionarTask,
        removerTask,
      }}
    >
      {children}
    </WidgetsContext.Provider>
  );
}

function useControllers() {
  const context = useContext(WidgetsContext);

  return context;
}

export { WorkspacesProvider, useControllers };
