import { IsIn, IsOptional } from "class-validator";
import { errorMessageStatus, TodoStatusEnum } from "../../common/Constants&errorMessages";

export class SearchDto{
  @IsOptional()
  critere : string

  @IsOptional()
  @IsIn([TodoStatusEnum.waiting,TodoStatusEnum.actif,TodoStatusEnum.done],{
    message : errorMessageStatus
  })
  statut : string
}