import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    return this.usersService.getByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}
