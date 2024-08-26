import axios, { HttpStatusCode } from 'axios';
import {
  CreateTodoItemDto,
  TodoItem,
  UpdateTodoItemDto,
} from '@monotodoapp/todo-models';

const title = 'todo item';
let id: TodoItem['id'];

describe('POST /todo', () => {
  it('should get a empty list of todos', async () => {
    const res = await axios.get(`/todo`);

    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.data.length).toBe(0);
  });

  it('should create a todo', async () => {
    const dto: CreateTodoItemDto = { title };
    const res = await axios.post(`/todo`, dto);
    id = res.data.id;

    expect(res.status).toBe(HttpStatusCode.Created);
    expect(res.data).toHaveProperty('id');
    expect(res.data).toEqual(
      expect.objectContaining({ title, wasDone: false })
    );
  });

  it('should get a list of one todo', async () => {
    const res = await axios.get(`/todo`);

    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.data.length).toBe(1);
  });
});

describe('PATCH /todo', () => {
  it('should get a existent todo by id', async () => {
    const res = await axios.get(`/todo/${id}`);

    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.data).toEqual(
      expect.objectContaining({ id, title, wasDone: false })
    );
  });

  it('should update a todo as done', async () => {
    const wasDone = true;
    const dto: UpdateTodoItemDto = { wasDone };
    const res = await axios.patch(`/todo/${id}`, dto);

    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.data).toEqual(expect.objectContaining({ id, wasDone }));
  });

  it('should get a list of one todo', async () => {
    const res = await axios.get(`/todo`);

    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.data.length).toBe(1);
  });
});

describe('DELETE /todo', () => {
  it('should get a existent todo by id', async () => {
    const res = await axios.get(`/todo/${id}`);

    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.data).toEqual(
      expect.objectContaining({ id, title, wasDone: true })
    );
  });

  it('should delete a todo', async () => {
    const res = await axios.delete(`/todo/${id}`);

    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.data).toEqual(expect.objectContaining({ id }));
  });

  it('should get a empty list of todos', async () => {
    const res = await axios.get(`/todo`);

    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.data.length).toBe(0);
  });
});
