import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { Trainer, TrainerSchema } from './schemas/trainer.schema';
import { TrainerRepository } from './trainer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trainer.name, schema: TrainerSchema }]),
  ],
  controllers: [TrainerController],
  providers: [TrainerService, TrainerRepository],
})
export class TrainerModule {}
