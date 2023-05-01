import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCvDto } from "./dto/create-cv.dto";
import { UpdateCvDto } from "./dto/update-cv.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Cv } from "./entities/cv.entity";
import { Repository } from "typeorm";

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ) {}
  async create(createCvDto: CreateCvDto) {
    const newCv = this.cvRepository.create(createCvDto);
    try {
      return await this.cvRepository.save(newCv);
    } catch (e) {
      throw new ConflictException(
        "exception detected while adding a new cv to the list ",
      );
    }
  }
  async addCv(cv: Cv) {
    return await this.cvRepository.save(cv);
  }

  async findAll() {
    return await this.cvRepository.find();
  }

  async findOne(id: number) {
    const promise = this.cvRepository.findBy({ id: id });
    if (!promise) {
      throw new NotFoundException("cv not found");
    }
    return await promise;
  }

  async update(id: number, updateCvDto: UpdateCvDto) {
    return await this.cvRepository.update(id, updateCvDto);
  }

  async remove(id: number) {
    return this.cvRepository.delete(id);
  }
}
