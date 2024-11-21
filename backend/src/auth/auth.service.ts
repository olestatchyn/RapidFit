import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const user = await this.usersRepository.findByEmail(createUserDto.email);
    if (user)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.SAULT_ROUNDS),
    );
    const userDtoWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
    };
    await this.usersRepository.createUser(userDtoWithHashedPassword);
    return { message: 'Signed up successfully' };
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ message: string; token?: string }> {
    const user = await this.usersRepository.findByEmail(loginUserDto.email);
    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );
      return { message: 'Login successful', token };
    }
    throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
  }
}
