import { AxiosInstance } from "axios";
import { ReactNode } from "react";

export type Task = {
  _id?: string;
  workspaceId: string;
  name: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  team?: string;
  status?: "To Do" | "In Progress" | "Done";
  dueDate?: string;
  assignee?: string;
  subtasks?: Task[];
};

export type Workspace = {
  _id?: string;
  name: string;
  //   creatorId: string;
};

export type User = {
  _id?: string;
  name?: string;
  email: string;
  role?: "admin" | "user";
  avatar?: string;
};

export type Error = {
  error: string;
  status: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  name: string;
  role?: string;
  email: string;
  avatar?: string;
  password: string;
};

export type ContextData = {
  user: User | undefined | null;
  signIn: (
    credentials: SignInCredentials
  ) => Promise<
    | void
    | "Usuário autenticado com sucesso!"
    | "Email ou senha inválidos"
    | "Email inválido"
    | "Insira uma senha válida"
  >;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  token: string;
  api: AxiosInstance;
  tasks: Task[] | undefined | null;
  addTask: (task: Task) => void;
  removerTask: (taskId: string) => void;
  updateTask: (id: string, taskData: any) => void;
  getWorkspaces: () => Promise<Workspace[]>;
  getTask: (id: string) => Promise<Task>;
  getTasks: (workspaceId: string) => Promise<Task[]>;
  getActiveWorkspace: (workspaces: Workspace[]) => Promise<Workspace>;
  workspaces: Workspace[] | undefined | null;
  activeWorkspace: Workspace | undefined | null;
  setActiveWorkspace: (workspace: Workspace) => Promise<void>;
  activeDate: DateObj;
  actualDate: DateObj;
  setActiveDate: React.Dispatch<React.SetStateAction<DateObj>>;
  addWorkspace: (workspace: Workspace) => Promise<Workspace>
};

export type DateObj = {
  day: string;
  month: string;
  year: string;
  weekDayAbr: string;
  weekDay: string;
};

export type ContextProviderProps = {
  children: ReactNode;
};
