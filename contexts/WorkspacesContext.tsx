import React, { createContext, useContext, useState, ReactNode } from "react";
import { Task, Workspace } from "../utils/types";

type WorkspacesContextData = {
  tasks: Task[] | undefined | null;
  adicionarTask: (task: Task) => void;
  removerTask: (taskId: string) => void;
};

type WorkspacesProviderProps = {
  children: ReactNode;
};

export const WidgetsContext = createContext({} as WorkspacesContextData);

function WorkspacesProvider({ children }: WorkspacesProviderProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const adicionarTask = (widget: Task) => {
    setTasks([...tasks, widget]);
  };

  const removerTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <WidgetsContext.Provider
      value={{
        tasks,
        adicionarTask,
        removerTask,
      }}
    >
      {children}
    </WidgetsContext.Provider>
  );
}

function useTasks() {
  const context = useContext(WidgetsContext);

  return context;
}

export { WorkspacesProvider, useTasks };
