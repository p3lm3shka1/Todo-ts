export type Todo = {
  _id: string;
  text: string;
  completed: boolean;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Filter = "all" | "active" | "completed";
