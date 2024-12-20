import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'email@gmail.com', description: 'Почта' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'password', description: 'Пароль' })
  @IsString()
  password: string;
}
