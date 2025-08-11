
import axios from 'axios';
import { Todo } from '../models/Todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  //private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  private apiUrl = 'https://localhost:7115/api/Todo';

  // Get all todos
  async getTodos(): Promise<Todo[]> {
    const response = await axios.get<Todo[]>(this.apiUrl);
    return response.data;
  }

  // Get todo by id
  async getTodoById(id: number): Promise<Todo> {
    const response = await axios.get<Todo>(`${this.apiUrl}/${id}`);
    return response.data;
  }

  // Create new todo
  async createTodo(todo: Todo): Promise<Todo> {
    const response = await axios.post<Todo>(this.apiUrl, todo);
    return response.data;
  }

  // Update todo by id
  async updateTodo(id: number, todo: Todo): Promise<void> {
    await axios.put(`${this.apiUrl}/${id}`, todo);
  }

  // Delete todo by id
  async deleteTodo(id: number): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }
}

