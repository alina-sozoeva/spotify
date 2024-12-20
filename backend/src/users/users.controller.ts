import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Пользователь по id' })
  @ApiResponse({ status: 201, type: User })
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
}
