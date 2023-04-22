export type Cart = {
  products?: Product[];
  fee_percentage?: number;
  fee_delivery?: number;
  total_value?: number;
};

export type Product = {
  id: number;
  produto: string;
  preco: number;
  descricao: string;
  img: string;
  marca: string;
  quantidade: number;
  estoque: number;
  favoritado?: boolean;
};

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
  id: string;
  name: string;
  description: string;
  avatar: string;
  members: User[];
};

export type User = {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  role?: "admin" | "user";
};
