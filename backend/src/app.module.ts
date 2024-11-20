import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TrainerModule } from './trainer/trainer.module';
import { BookingModule } from './booking/booking.module';
import { CommentsModule } from './comments/comments.module';
import * as dotenv from 'dotenv';
import { LoggerMiddleware } from './middlewares/logger.middleware';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    TrainerModule,
    BookingModule,
    CommentsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}