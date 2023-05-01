import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PremierModule } from "./premier/premier.module";
import { TodoModule } from "./todo/todo.module";
import { CommonModule } from "./common/common.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./todo/entity/todo.entity";
import { AuthUserMiddleware } from "./auth-user/auth-user.middleware";
import { UserModule } from "./user/user.module";
import { CvModule } from "./cv/cv.module";
import { SkillModule } from "./skill/skill.module";
import { Skill } from "./skill/entities/skill.entity";
import { Cv } from "./cv/entities/cv.entity";
import { User } from "./user/entities/user.entity";

@Module({
  imports: [
    PremierModule,
    TodoModule,
    CommonModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "test",
      entities: [TodoEntity, Skill, Cv, User],
      synchronize: true,
    }),
    UserModule,
    CvModule,
    SkillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthUserMiddleware)
      .forRoutes({ path: "v2/todo/*", method: RequestMethod.ALL });
  }
}
