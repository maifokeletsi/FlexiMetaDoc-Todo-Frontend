import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../service/todos';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct default import
import { Router } from '@angular/router';

interface JwtPayload {
  [key: string]: any;
  exp?: number;
  iss?: string;
  aud?: string;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})
export class TodoComponent {
  private router = inject(Router);
  private location = inject(Location);

  todos: Todo[] = [];
  newTodo: Todo = { userId: '', title: '', completed: false };
  error: string | null = null;
  success: string | null = null;
  currentUserId = '';
  isEditing = false;
  editTodoId: number | null = null;

  private readonly claimName = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
  private readonly claimRole = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

  constructor(private todoService: TodoService) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token);

          this.currentUserId = decoded[this.claimName] || '';
          this.newTodo.userId = this.currentUserId;

          const role = decoded[this.claimRole];
          console.log('User role:', role);

          if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            console.warn('Token expired!');
          }
        } catch (err) {
          console.error('Invalid token:', err);
        }
      }
    }

    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos = data.filter(todo => todo.userId === this.currentUserId);
      },
      error: () => this.error = 'Failed to load todos.'
    });
  }

  saveTodo(): void {
    if (!this.newTodo.title.trim()) return;

    if (this.isEditing && this.editTodoId !== null) {
      this.todoService.updateTodo(this.editTodoId, this.newTodo).subscribe({
        next: (updated) => {
          const index = this.todos.findIndex(t => t.id === updated.id);
          if (index !== -1) this.todos[index] = updated;
          this.success = 'Todo updated successfully!';
          this.error = null;
          this.resetForm();
        },
        error: () => this.error = 'Failed to update todo.'
      });
    } else {
      this.newTodo.userId = this.currentUserId;
      this.todoService.createTodo(this.newTodo).subscribe({
        next: (todo) => {
          this.todos.push(todo);
          this.success = 'Todo added successfully!';
          this.error = null;
          this.resetForm();
        },
        error: () => this.error = 'Failed to add todo.'
      });
    }
  }

  editTodo(todo: Todo): void {
    this.newTodo = { ...todo };
    this.isEditing = true;
    this.editTodoId = todo.id ?? null;
  }

  deleteTodo(id: number | undefined): void {
    if (id === undefined) return;
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.success = 'Todo deleted successfully!';
        this.error = null;
      },
      error: () => this.error = 'Failed to delete todo.'
    });
  }

  toggleCompleted(todo: Todo): void {
    if (!todo.id) return;
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(todo.id, updatedTodo).subscribe({
      next: (updated) => {
        const index = this.todos.findIndex(t => t.id === updated.id);
        if (index !== -1) this.todos[index] = updated;
        this.success = updated.completed ? 'Todo marked as completed!' : 'Todo marked as incomplete!';
        this.error = null;
      },
      error: () => this.error = 'Failed to update completion status.'
    });
  }

  private resetForm(): void {
    this.newTodo = { userId: this.currentUserId, title: '', completed: false };
    this.isEditing = false;
    this.editTodoId = null;
  }

  getCompletedCount(): number {
    return this.todos.filter(t => t.completed).length;
  }

  getRemainingCount(): number {
    return this.todos.filter(t => !t.completed).length;
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  goBack() {
    this.location.back();
  }
}
