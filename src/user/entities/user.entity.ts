import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { Cv } from "../../cv/entities/cv.entity";
import { TodoEntity } from "../../todo/entity/todo.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  username: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @Column()
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv[];

  @OneToMany(() => TodoEntity, (todo) => todo.user)
  todos: TodoEntity[];
}
