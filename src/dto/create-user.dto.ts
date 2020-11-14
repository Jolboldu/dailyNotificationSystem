import {IsNotEmpty, IsEmail, IsEmpty, IsNumber, IsString, ValidateNested} from 'class-validator';

export class CreateUserDto 
{
  id: number;

  first_name: string;

  last_name: string;

  username: string;

  language_code: string;

  is_bot: boolean

}