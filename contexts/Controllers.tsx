import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Task, Workspace } from "../utils/types";
import { useAuth } from "./Auth";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "./Auth";

type WorkspacesContextData = {
  tasks: Task[] | undefined | null;
  adicionarTask: (task: Task) => void;
  removerTask: (taskId: string) => void;

  workspaces: Workspace[] | undefined | null;
  activeWorkspace: Workspace | undefined | null;
  setActiveWorkspace: (workspace: Workspace) => void;
  adicionarWorkspace: (workspace: Workspace) => void;
};

type WorkspacesProviderProps = {
  children: ReactNode;
};

export const USER = "@Auth:user";
export const TOKEN = "@Auth:token";
export const ACTIVEWORKSPACE = "@Controller:activeworkspace";

export const WidgetsContext = createContext({} as WorkspacesContextData);

function WorkspacesProvider({ children }: WorkspacesProviderProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspaceState] = useState<Workspace>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const api = axios.create();
  const API_URL = "http://localhost:3000";
  api.defaults.baseURL = API_URL;

  useEffect(() => {
    getWorkspaces().then((workspaces) => {
      getActiveWorkspace(workspaces);
    });
  }, []);

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

  const adicionarTask = (widget: Task) => {
    setTasks([...tasks, widget]);
  };

  const setActiveWorkspace = async (workspace: Workspace) => {
    await AsyncStorage.setItem(ACTIVEWORKSPACE, workspace.name);
    setActiveWorkspaceState(workspace);
  };

  const adicionarWorkspace = async (workspace: Workspace) => {
    await handleApi();
    api.post("/workspaces", workspace).then((res) => {
      getWorkspaces();
    });
  };

  const getWorkspaces = async () => {
    await handleApi();
    const res = await api.get("/workspaces");
    setWorkspaces(res.data);

    return res.data;
  };

  const getActiveWorkspace = async (workspaces: Workspace[]) => {
    const workspaceName = await AsyncStorage.getItem(ACTIVEWORKSPACE);

    if (workspaceName) {
      const workspace = workspaces.filter(
        (workspace) => workspace.name === workspaceName
      );

      setActiveWorkspace(workspace[0]);
    } else {
      setActiveWorkspace(workspaces[0]);
    }
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
        activeWorkspace,
        setActiveWorkspace,
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
