import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusArgs } from './dto/args/status.args';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'Piedra del Alma',
      done: false,
    },
    {
      id: 2,
      description: 'Piedra del Espacio',
      done: true,
    },
    {
      id: 3,
      description: 'Piedra del Poder',
      done: false,
    },
    {
      id: 4,
      description: 'Piedra del Tiempo',
      done: false,
    },
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get completedTodos() {
    const completed = this.todos.filter((todo) => todo.done === false);
    return completed.length;
  }

  get pendingTodos() {
    const pending = this.todos.filter((todo) => todo.done === true);
    return pending.length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;
    if (status != undefined)
      return this.todos.filter((todo) => todo.done === status);

    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);

    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;

    this.todos.push(todo);

    return todo;
  }

  update({ id, description, done }: UpdateTodoInput) {
    const todoToUpdate = this.findOne(id);

    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;

    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return todoToUpdate;
      }

      return todo;
    });
    return todoToUpdate;
  }

  delete(id: number): Boolean {
    const todo = this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return true;
  }
}
