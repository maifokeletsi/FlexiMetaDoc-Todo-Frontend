import { RouterOutlet } from "@angular/router";
import { TodoComponent } from "./components/todo/todo";
import { Component, signal } from "@angular/core";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-app');
}
  