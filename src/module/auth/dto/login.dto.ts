import {
   IsEmail,
   IsNotEmpty,
   IsString,
   MinLength
} from 'class-validator';
import { MESSAGES } from 'src/common/constants/messages.constants';



export class LoginDto {

   @IsEmail({}, { message: MESSAGES.AUTH.EMAIL_INVALID })
   email!: string;

   @IsString({ message: MESSAGES.AUTH.PASSWORD_STRING })
   @IsNotEmpty({ message: MESSAGES.AUTH.PASSWORD_REQUIRED })
   @MinLength(6, { message: MESSAGES.AUTH.PASSWORD_MIN_LENGTH })
   password!: string;

}