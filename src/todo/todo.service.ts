import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoModel } from './TodoModel';
import { CommonModule, TOKENS } from '../common/common.module';
import { UpdateDto } from './Dto/updateDto';

@Injectable()
export class TodoService {
  @Inject(TOKENS.uuid) uuid: () => string;
  private todos = [];
  getTodos() {
    return this.todos;
  }
  addTodo(data) {
    const todo = new TodoModel(this.uuid(), data.name, data.description);
    this.todos.push(todo);
  }
  getTodo(id: string) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) return todo;
    else throw new NotFoundException('Todo not found');
  }
  deleteTodo(id: string) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      this.todos.indexOf(todo);
      this.todos.splice(this.todos.indexOf(todo), 1);
      console.log('deleted');
    } else throw new NotFoundException('Todo not found');
  }
  updateTodo(data: UpdateDto, id: string) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.name = data.name;
      todo.description = data.description;
      todo.status = data.status;
      console.log('updated');
    } else throw new NotFoundException('Todo not found');
  }
}
