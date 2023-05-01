import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Skill } from "../../skill/entities/skill.entity";
import { User } from "../../user/entities/user.entity";

@Entity("cv")
export class Cv {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column()
  firstname: string;

  @IsNumber()
  @Column()
  age: number;

  @IsNotEmpty()
  @Column()
  cin: string;

  @IsNotEmpty()
  @Column()
  job: string;

  @IsNotEmpty()
  @Column()
  path: string;

  @ManyToMany(() => Skill, (skill) => skill.cvs, { eager: true })
  @JoinTable()
  skills: Skill[];

  @ManyToOne(() => User, (user) => user.cvs)
  @JoinTable()
  user: User;
}
