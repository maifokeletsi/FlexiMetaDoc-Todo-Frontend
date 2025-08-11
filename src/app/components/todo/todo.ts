import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../service/todos';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgClass,
  ],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo = '';
  error = '';

  constructor(private todoService: TodoService) {}

  async ngOnInit() {
    await this.loadTodos();
    console.log('Todos loaded:', this.todos);
  }

  async loadTodos() {
    try {
      this.todos = await this.todoService.getTodos();
    } catch {
      this.error = 'Failed to load todos';
    }
  }

  async addTodo() {
    const title = this.newTodo.trim();
    if (!title) return;

    const newTodo: Todo = {
      userId: 1,
      id: 0,
      title,
      completed: false
    };

    try {
      const createdTodo = await this.todoService.createTodo(newTodo);
      this.todos.push(createdTodo);
      this.newTodo = '';
    } catch {
      this.error = 'Failed to add todo';
    }
  }

  async removeTodo(todo: Todo) {
    try {
      await this.todoService.deleteTodo(todo.id);
      this.todos = this.todos.filter(t => t.id !== todo.id);
    } catch {
      this.error = 'Failed to delete todo';
    }
  }

  async toggleCompleted(todo: Todo) {
    const updatedTodo: Todo = { ...todo, completed: !todo.completed };

    try {
      await this.todoService.updateTodo(todo.id, updatedTodo);
      todo.completed = updatedTodo.completed;
    } catch {
      this.error = 'Failed to update todo';
    }
  }

  getCompletedCount(): number {
    return this.todos.filter(t => t.completed).length;
  }

  getRemainingCount(): number {
    return this.todos.filter(t => !t.completed).length;
  }
}
