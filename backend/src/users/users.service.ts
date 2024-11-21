import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getByEmail(email: string): Promise<User> {
    return this.usersRepository.findByEmail(email);
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.getAllUsers();
  }
}
