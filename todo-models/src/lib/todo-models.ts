export type TodoItem = {
  id: string;
  title: string;
  wasDone: boolean;
};

export type TodoList = Array<TodoItem>;

export interface CreateTodoItemDto {
  title: string;
}

export interface UpdateTodoItemDto {
  title?: string;
  wasDone?: boolean;
}
