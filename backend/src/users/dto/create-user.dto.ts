import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsString } from 'class-validator';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export class CreateUserDto {
  @ApiProperty({ example: 'ryan.gosling@gmail.com', description: 'Почта' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'Пароль' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'Ryan', description: 'Имя пользователя' })
  @IsString()
  username: string;

  @ApiProperty({ example: '1980-11-12', description: 'Дата рождения' })
  @IsDateString({ strict: true })
  birthDate: string;

  @ApiProperty({ example: 'male', description: 'Пол пользователя' })
  @IsEnum(Gender)
  gender: Gender;

  //   @ApiProperty({ example: 'name', description: 'Пол пользователя' })
  //   @IsBoolean()
  //   isEmailConfirmed: boolean;
}
