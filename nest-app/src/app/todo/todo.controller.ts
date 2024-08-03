import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoItemDto, UpdateTodoItemDto } from '@monotodoapp/todo-models';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  public constructor(private readonly service: TodoService) {}

  @Post()
  public create(@Body() dto: CreateTodoItemDto) {
    return this.service.create(dto);
  }

  @Get()
  public getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  public getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Patch(':id')
  public update(@Param('id') id: number, @Body() dto: UpdateTodoItemDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  public delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
