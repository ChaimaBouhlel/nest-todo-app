import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  Length,
  MinLength,
} from "class-validator";
import {
  errorMessageDescription,
  errorMessageDescriptionRequired,
  errorMessageName,
  errorMessageStatus,
  TodoStatusEnum,
} from "../../common/Constants&errorMessages";

export class UpdateDto {
  @IsOptional()
  @Length(3, 10, { message: errorMessageName })
  name: string;
  @IsNotEmpty({ message: errorMessageDescriptionRequired })
  @MinLength(10, { message: errorMessageDescription })
  @IsOptional()
  description: string;
  @IsIn([TodoStatusEnum.waiting, TodoStatusEnum.actif, TodoStatusEnum.done], {
    message: errorMessageStatus,
  })
  @IsOptional()
  status: string;
}
