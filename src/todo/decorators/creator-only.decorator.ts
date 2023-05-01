import { UseGuards } from "@nestjs/common";
import { TodoGuard } from "../../auth-user/authorization.guard";

export const CreatorOnly = () => UseGuards(TodoGuard);
