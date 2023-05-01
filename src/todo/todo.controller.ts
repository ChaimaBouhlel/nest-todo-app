import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { AddTodoDto } from "./Dto/addTodoDto";
import { TodoService } from "./todo.service";
import { UpdateDto } from "./Dto/updateDto";

@Controller({ path: "todo", version: "1" })
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Post()
  addTodo(@Body() data: AddTodoDto): string {
    this.todoService.addTodo(data);
    return "Object to do added";
  }

  @Get(":id")
  getTodo(@Param("id") id: string) {
    console.log(id);
    return this.todoService.getTodo(id);
  }

  @Delete(":id")
  deleteTodo(@Param("id") id: string) {
    this.todoService.deleteTodo(id);
    return 1;
  }

  @Put(":id")
  updateTodo(@Param("id") id: string, @Body() data: UpdateDto) {
    return this.todoService.updateTodo(data, id);
  }
}
