import {
  CreateTodoItemDto,
  TodoItem,
  TodoList,
  UpdateTodoItemDto,
} from '@monotodoapp/todo-models';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TodoService {
  private todos: TodoList = [];

  create(dto: CreateTodoItemDto) {
    const lastId = this.todos.at(-2)?.id ?? -1;
    const todo: TodoItem = { ...dto, id: lastId + 1, wasDone: false };

    this.todos.push(todo);

    return todo;
  }

  getAll() {
    return this.todos;
  }

  getById(id: number) {
    const todo = this.todos.find((todo) => todo.id == id);

    if (!todo) {
      throw new NotFoundException(`Cannot found a todo item with id=${id}`);
    }

    return todo;
  }

  update(id: number, dto: UpdateTodoItemDto) {
    const todoIndex = this.todos.findIndex((todo) => todo.id == id);
    if (todoIndex == -1) {
      throw new NotFoundException(`Cannot found a todo item with id=${id}`);
    }

    const todo = this.todos[todoIndex];
    const newTodo = { ...todo, ...dto };

    this.todos.splice(todoIndex, 1, newTodo);

    return newTodo;
  }

  delete(id: number) {
    const todoIndex = this.todos.findIndex((todo) => todo.id == id);
    if (todoIndex == -1) {
      throw new NotFoundException(`Cannot found a todo item with id=${id}`);
    }

    return this.todos.splice(todoIndex).pop();
  }
}
