import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { promises as fs } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const rawToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

      const decoded = this.jwtService.verify(rawToken, { secret: process.env.JWT_SECRET });

      request.body.userId = decoded.userId;
      request.body.userEmail = decoded.email;

      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(error.message || 'Authorization failed');
    }
  }
}
