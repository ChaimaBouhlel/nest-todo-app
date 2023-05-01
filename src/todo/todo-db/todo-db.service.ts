import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TodoEntity } from "../entity/todo.entity";
import { Like, Repository } from "typeorm";
import { AddTodoDto } from "../Dto/addTodoDto";
import { UpdateDto } from "../Dto/updateDto";
import { TodoStatusEnum } from "../../common/Constants&errorMessages";
import { SearchDto } from "../Dto/searchDto";
import { User } from "../../user/entities/user.entity";

@Injectable()
export class TodoDbService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async addTodo(data: AddTodoDto, user: User) {
    const newTodo = this.todoRepository.create({ ...data, user });
    try {
      return await this.todoRepository.save(newTodo);
    } catch (e) {
      throw new ConflictException(
        "exception detected while adding a new todo to the list ",
      );
    }
  }

  async updateTodo(id: number, data: UpdateDto) {
    return await this.todoRepository.update(id, data);
  }

  async deleteTodo(id: number) {
    return await this.todoRepository.delete(id);
  }

  async softDeleteTodo(id: number) {
    return await this.todoRepository.softDelete(id);
  }

  async restaurerTodo(id: number) {
    return await this.todoRepository.restore(id);
  }

  async countByStatus() {
    const waitingCount = await this.todoRepository.count({
      where: { statut: TodoStatusEnum.waiting },
    });
    const actifCount = await this.todoRepository.count({
      where: { statut: TodoStatusEnum.actif },
    });
    const doneCount = await this.todoRepository.count({
      where: { statut: TodoStatusEnum.done },
    });
    return {
      "En Cours": actifCount,
      "En attente": waitingCount,
      Finalise: doneCount,
    };
  }

  async getTodos(searchCriteria?: SearchDto) {
    const findByOptions = [];
    if (searchCriteria) {
      if (searchCriteria.critere) {
        findByOptions.push({ name: Like(`%${searchCriteria.critere}%`) });

        findByOptions.push({
          description: Like(`%${searchCriteria.critere}%`),
        });
      }
      if (searchCriteria.statut) {
        findByOptions.push({ statut: searchCriteria.statut });
      }
    }
    if (findByOptions.length) {
      return await this.todoRepository.findBy(findByOptions);
    }
    return await this.todoRepository.find();
  }

  async todoById(id: number) {
    const promise = await this.todoRepository.findOneBy({ id: id });
    if (!promise) {
      throw new NotFoundException();
    }
    return promise;
  }
}
