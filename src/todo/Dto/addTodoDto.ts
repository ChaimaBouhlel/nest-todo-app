import { IsNotEmpty, Length, MinLength } from 'class-validator';
import {
  errorMessageDescription,
  errorMessageDescriptionRequired,
  errorMessageName,
} from '../../common/Constants&errorMessages';

export class AddTodoDto {
  @Length(3, 10, { message: errorMessageName })
  name: string;

  @IsNotEmpty({ message: errorMessageDescriptionRequired })
  @MinLength(10, { message: errorMessageDescription })
  description: string;
}
