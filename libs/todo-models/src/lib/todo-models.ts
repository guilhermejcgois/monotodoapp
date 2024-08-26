import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class TodoItem {
  @ApiResponseProperty()
  id!: number;

  @ApiResponseProperty()
  title!: string;

  @ApiResponseProperty()
  wasDone?: boolean;
}

export type TodoList = Array<TodoItem>;

export class CreateTodoItemDto {
  @ApiProperty({ example: 'Commit a new change' })
  public title!: string;
}

export class UpdateTodoItemDto {
  @ApiProperty({ example: 'Commit and push a new change' })
  public title?: string;

  @ApiProperty()
  public wasDone?: boolean;
}
