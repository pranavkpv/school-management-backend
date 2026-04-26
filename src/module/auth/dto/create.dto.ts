import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';
import { MESSAGES } from 'src/common/constants/messages.constants';
import { ROLE } from 'src/common/constants/role.enum';

export class CreateDto {
   @IsEmail({}, { message: MESSAGES.AUTH.EMAIL_INVALID })
   email!: string;

   @IsString({ message: MESSAGES.AUTH.PASSWORD_STRING })
   @IsNotEmpty({ message: MESSAGES.AUTH.PASSWORD_REQUIRED })
   @MinLength(6, { message: MESSAGES.AUTH.PASSWORD_MIN_LENGTH })
   password!: string;

   @IsEnum(ROLE, { message: MESSAGES.GENERAL.INVALID_ROLE })
   role!: ROLE;
}