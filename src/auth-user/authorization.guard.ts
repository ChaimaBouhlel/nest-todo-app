import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  ParseIntPipe,
} from "@nestjs/common";
import { Request } from "express";
import { TodoDbService } from "../todo/todo-db/todo-db.service";
import { User } from "../user/entities/user.entity";

@Injectable()
export class TodoGuard implements CanActivate {
  private readonly intParser: ParseIntPipe = new ParseIntPipe();

  constructor(private readonly todoService: TodoDbService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // manually validate & sanitize id
    const id = await this.intParser.transform(request.params.id, {
      type: "param",
      metatype: String,
      data: "id",
    });

    // check if user is indeed the creator of the provided todo
    const todo = await this.todoService.todoById(id);
    const user: User = request["user"];
    if (todo.user.id !== user.id)
      throw new ForbiddenException("This todo is not yours");

    request["todo"] = todo;
    return true;
  }
}
