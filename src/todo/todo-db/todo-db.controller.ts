import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { TodoDbService } from "./todo-db.service";
import { AddTodoDto } from "../Dto/addTodoDto";
import { UpdateDto } from "../Dto/updateDto";
import { SearchDto } from "../Dto/searchDto";
import { CreatorOnly } from "../decorators/creator-only.decorator";
import { AuthUser } from "../decorators/auth-user.decorator";
import { User } from "../../user/entities/user.entity";

@Controller({
  path: "todo",
  version: "2", // <--- This is the version
})
export class TodoDbController {
  constructor(private todoService: TodoDbService) {}

  @Post()
  addTodo(@Body() data: AddTodoDto, @AuthUser() user: User): void {
    this.todoService.addTodo(data, user);
    console.log("todo added in v2");
  }

  @CreatorOnly()
  @Put(":id")
  updateTodo(@Body() data: UpdateDto, @Param("id", ParseIntPipe) id: number) {
    this.todoService.updateTodo(id, data);
  }

  @CreatorOnly()
  @Delete("soft-delete/:id")
  softDelete(@Param("id", ParseIntPipe) id: number): void {
    this.todoService.softDeleteTodo(id);
  }

  @CreatorOnly()
  @Delete(":id")
  deleteTodo(@Param("id", ParseIntPipe) id: number): void {
    this.todoService.deleteTodo(id);
  }

  @Patch(":id")
  restoreTodo(@Param("id", ParseIntPipe) id: number): void {
    this.todoService.restaurerTodo(id);
  }

  @Get("count")
  countByStatut() {
    return this.todoService.countByStatus();
  }

  @Get("all")
  getByCritere(@Query() searchCritere: SearchDto) {
    return this.todoService.getTodos();
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.todoService.todoById(id);
  }
}
