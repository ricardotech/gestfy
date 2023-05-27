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
  DateObj,
  SignInCredentials,
  SignUpCredentials,
  Task,
  User,
  Workspace,
} from "../utils/types";
import validator from "email-validator";
import moment from "moment";

export const USER = "@Auth:user";
export const TOKEN = "@Auth:token";

export const ServicesContext = createContext({} as ContextData);

async function signOut() {
  await AsyncStorage.removeItem(TOKEN);
  await AsyncStorage.removeItem(USER);
}

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

export const ACTIVEWORKSPACE = "@Controller:activeworkspace";

function ServicesProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string>("");

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspaceState] = useState<Workspace>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const actualDate = {
    day: moment().format("DD"),
    month: moment().format("MM"),
    year: moment().format("YYYY"),
    weekDayAbr: moment().format("ddd"),
    weekDay: moment().format("dddd"),
  };
  const [activeDate, setActiveDate] = useState<DateObj>({
    day: moment().format("DD"),
    month: moment().format("MM"),
    year: moment().format("YYYY"),
    weekDayAbr: moment().format("ddd"),
    weekDay: moment().format("dddd"),
    calendarFormat: `${moment().format("YYYY")}-${moment().format(
      "MM"
    )}-${moment().format("DD")}`,
  });

  async function loadStoragedData() {
    const storagedUser = await AsyncStorage.getItem(USER);
    const storagedToken = await AsyncStorage.getItem(TOKEN);
    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      setToken(JSON.stringify(TOKEN));
    }
  }

  const addTask = async (task: Task) => {
    await handleApi();
    api.post("/tasks", task).then((res) => {
      setTasks([...tasks, task]);
    });
  };

  const getTask = async (id: string) => {
    await handleApi();
    const task = api.get(`/tasks/${id}`).then((res) => {
      return res.data;
    });
    return task;
  };

  const updateTask = async (id: string, taskData: any) => {
    await handleApi();

    try {
      const updatedTask = await api.put(`/tasks/${id}`, taskData);
      const updatedTasks = tasks.map((task) => {
        if (task._id === id) {
          return updatedTask.data;
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const setActiveWorkspace = async (workspace: Workspace | undefined) => {
    if (workspace === undefined) {
      await AsyncStorage.removeItem(ACTIVEWORKSPACE);
    } else {
      getTasks(String(workspace._id));
      await AsyncStorage.setItem(ACTIVEWORKSPACE, String(workspace._id));
      setActiveWorkspaceState(workspace);
    }
  };

  const addWorkspace = async (workspace: Workspace) => {
    await handleApi();
    const res = api.post("/workspaces", workspace).then((res) => {
      setWorkspaces([...workspaces, workspace]);
      return res.data;
    });
    return res;
  };

  const getTasks = async (workspaceId: string): Promise<Task[]> => {
    await handleApi();
    const res = await api.get(`/tasks/workspace/${workspaceId}`);
    setTasks(res.data);

    return res.data;
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
      return workspace[0];
    } else {
      setActiveWorkspace(workspaces[0]);
      return workspaces[0];
    }
  };

  const getActiveWorkspaceMembers = async (workspaceId: string) => {
    await handleApi();
    const members: User[] = await api
      .get(`/workspaces/${workspaceId}/members`)
      .then((res) => {
        return res.data;
      });
    return members;
  };

  const addMemberToWorkspace = async (
    workspaceId: string,
    memberToAddEmail: string
  ) => {
    await handleApi();
    const res = api
      .post(`/workspaces/membership/${workspaceId}`, {
        memberEmail: memberToAddEmail,
      })
      .then((res) => {
        return res.data;
      });
    return res;
  };

  const getPendingInvitationsWorkspace = async () => {
    await handleApi();
    const res = api.get(`/workspaces/membership/pending`).then((res) => {
      return res.data;
    });
    return res;
  };

  const acceptInvitationWorkspace = async (workspaceId: string) => {
    const res = await api
      .post(`/workspaces/membership/${workspaceId}/accept`)
      .then((res) => {
        return res.data;
      });
    return res;
  };

  const declineInvitationWorkspace = async (workspaceId: string) => {
    const res = await api
      .post(`/workspaces/membership/${workspaceId}/decline`)
      .then((res) => {
        return res.data;
      });
    return res;
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  useEffect(() => {
    loadStoragedData();
  }, []);

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
        api,
        user,
        token,
        signIn,
        signUp,
        signOut,
        isLoading,
        workspaces,
        tasks,
        addTask,
        getTask,
        getTasks,
        deleteTask,
        updateTask,
        addWorkspace,
        getWorkspaces,
        getActiveWorkspace,
        setActiveWorkspace,
        activeWorkspace,
        getPendingInvitationsWorkspace,
        getActiveWorkspaceMembers,
        addMemberToWorkspace,
        acceptInvitationWorkspace,
        declineInvitationWorkspace,
        actualDate,
        activeDate,
        setActiveDate,
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
