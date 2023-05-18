import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios, AxiosInstance, AxiosStatic } from "axios";
import {
  ContextData,
  ContextProviderProps,
  SignInCredentials,
  SignUpCredentials,
  Task,
  User,
  Workspace,
} from "../utils/types";
import validator from "email-validator";

export const USER = "@Auth:user";
export const TOKEN = "@Auth:token";

export const ServicesContext = createContext({} as ContextData);

async function signOut() {
  await AsyncStorage.removeItem(TOKEN);
  await AsyncStorage.removeItem(USER);
}

const api = axios.create();
const API_URL =
  "https://4c5a-2804-14c-3f89-8904-473-e98a-ecb8-8361.ngrok-free.app";
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

export const ACTIVEWORKSPACE = "@Controller:activeworkspace";

function ServicesProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string>("");

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspaceState] = useState<Workspace>();
  const [tasks, setTasks] = useState<Task[]>([]);

  async function loadStoragedData() {
    const storagedUser = await AsyncStorage.getItem(USER);
    const storagedToken = await AsyncStorage.getItem(TOKEN);
    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      setToken(JSON.stringify(TOKEN));
    }
  }

  useEffect(() => {
    loadStoragedData();
  }, []);

  const addTask = (widget: Task) => {
    setTasks([...tasks, widget]);
  };

  const setActiveWorkspace = async (workspace: Workspace | undefined) => {
    if (workspace === undefined) {
      await AsyncStorage.removeItem(ACTIVEWORKSPACE);
    } else {
      await AsyncStorage.setItem(ACTIVEWORKSPACE, workspace._id);
      setActiveWorkspaceState(workspace);
    }
  };

  const addWorkspace = async (workspace: Workspace) => {
    await handleApi();
    api.post("/workspaces", workspace).then((res) => {
      console.log(res);

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
    const workspaceId = await AsyncStorage.getItem(ACTIVEWORKSPACE);

    if (workspaceId) {
      const workspace = workspaces.filter(
        (workspace) => workspace._id === workspaceId
      );

      setActiveWorkspace(workspace[0]);
    } else {
      setActiveWorkspace(workspaces[0]);
    }
  };

  const removerTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  async function signIn({ email, password }: SignInCredentials) {
    try {
      setIsLoading(true);

      if (!validator.validate(email)) {
        return "Email inválido";
      }

      if (password.length < 8) {
        return "Insira uma senha válida";
      }

      const res = await api
        .post("/auth/login", {
          email: email,
          password,
        })
        .then((response: any) => {
          if (response.status === 203) {
            return "Email ou senha inválidos";
          } else {
            setTimeout(async () => {
              await AsyncStorage.setItem(TOKEN, response.data.token);
              await AsyncStorage.setItem(
                USER,
                JSON.stringify(response.data.user)
              );
              setToken(response.data.token);
              setUser({
                _id: response.data.user._id,
                email: response.data.user.email,
                role: response.data.user.role,
                name: response.data.user.name,
              });
            }, 1250);
            return "Usuário autenticado com sucesso!";
          }
        })
        .catch((error: any) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      return res;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function signUp({ name, email, password }: SignUpCredentials) {
    try {
      setIsLoading(true);

      const res = await api
        .post("/auth/register", {
          name,
          email,
          password,
        })
        .then((response: any) => {
          if (response.status === 203) {
            return response.data;
          } else {
            setTimeout(async () => {
              AsyncStorage.setItem(TOKEN, response.data.token);
              AsyncStorage.setItem(USER, JSON.stringify(response.data.user));
              setToken(response.data.token);
              setUser({
                _id: response.data.user._id,
                name: response.data.user.name,
                email: response.data.user.email,
                role: response.data.user.role,
              });
            }, 1000);
            return "Usuário criado com sucesso!";
          }
        })
        .catch((error: any) => {
          setError(error);
        })
        .finally(() => setIsLoading(false));
      return res;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function signOut() {
    AsyncStorage.removeItem(USER).then(() => {
      setUser(null);
    });
    AsyncStorage.removeItem(TOKEN).then(() => {
      setUser(null);
    });
    setActiveWorkspace(undefined);
    // AsyncStorage.clear().then(() => {});
  }

  return (
    <ServicesContext.Provider
      value={{
        token,
        user,
        signIn,
        signUp,
        signOut,
        isLoading,
        api,
        workspaces,
        tasks,
        getWorkspaces,
        getActiveWorkspace,
        addWorkspace,
        setActiveWorkspace,
        activeWorkspace,
        addTask,
        removerTask,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

function useServices() {
  const context = useContext(ServicesContext);

  return context;
}

export { ServicesProvider, useServices, signOut, handleApi };
