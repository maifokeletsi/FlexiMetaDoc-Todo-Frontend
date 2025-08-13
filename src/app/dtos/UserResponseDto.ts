import { TodoResponseDto } from "./TodoResponseDto";

export interface UserResponseDto {
  email: string;
  roles: string[]; // list of role names
  todos: TodoResponseDto[];
}