// src/app/models/todo.ts
export interface Todo {
  id?: number; // Optional when creating
  userId: string;
  title: string;
  completed: boolean;
}
