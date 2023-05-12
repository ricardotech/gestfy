import { AxiosInstance } from "axios";
import { ReactNode } from "react";

export type Task = {
  description: string;
  type: "Project" | "Task";
  id: string;
  priority: "High" | "Medium" | "Low";
  team?: string;
  status?: "To Do" | "In Progress" | "Done";
  dueDate?: string;
  assignee?: string;
  workspace?: string;
  project?: string;
  subtasks?: Task[];
};

export type Workspace = {
  // id: string;
  name: string;
  // description: string;
  // avatar: string;
  // members: User[];
};

export type User = {
  id?: string;
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
  role: string;
  email: string;
  avatar: string;
  password: string;
};

export type AuthContextData = {
  user: User | undefined | null;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  token: string;
  api: AxiosInstance;
};

export type AuthProviderProps = {
  children: ReactNode;
};
