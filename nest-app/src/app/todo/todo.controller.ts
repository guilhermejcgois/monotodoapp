import {
  CreateTodoItemDto,
  TodoItem,
  TodoList,
  UpdateTodoItemDto,
} from '@monotodoapp/todo-models';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';

@Controller('todo')
@ApiTags('todo')
export class TodoController {
  public constructor(private readonly service: TodoService) {}

  @Post()
  @ApiOkResponse({
    example: {
      title: 'Commit a new change',
      id: 0,
      wasDone: false,
    },
  })
  public create(@Body() dto: CreateTodoItemDto): TodoItem {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({
    example: [
      {
        title: 'Commit a new change',
        id: 0,
        wasDone: false,
      },
    ],
    isArray: true,
  })
  public getAll(): TodoList {
    return this.service.getAll();
  }

  @Get(':id')
  @ApiOkResponse({
    example: {
      title: 'Commit a new change',
      id: 0,
      wasDone: false,
    },
  })
  @ApiNotFoundResponse({
    description: 'If no todo item with given ID was found.',
    example: {
      message: 'Cannot found a todo item with id=1',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  public getById(@Param('id') id: number): TodoItem {
    return this.service.getById(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    example: {
      title: 'Commit and push a new change',
      id: 0,
      wasDone: true,
    },
  })
  @ApiNotFoundResponse({
    description: 'If no todo item with given ID was found.',
  })
  public update(
    @Param('id') id: number,
    @Body() dto: UpdateTodoItemDto
  ): TodoItem {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete and retrieve deleted todo item last state.',
    example: {
      title: 'Commit and push a new change',
      id: 0,
      wasDone: true,
    },
  })
  @ApiNotFoundResponse({
    description: 'If no todo item with given ID was found.',
  })
  public delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
