import { Injectable } from '@nestjs/common';
import { TrainerRepository } from './trainer.repository';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Injectable()
export class TrainerService {
  constructor(private readonly trainerRepository: TrainerRepository) {}

  async findAll() {
    return this.trainerRepository.findAll();
  }

  async findById(id: string) {
    return this.trainerRepository.findById(id);
  }

  async create(createTrainerDto: CreateTrainerDto) {
    return this.trainerRepository.create(createTrainerDto);
  }

  async update(id: string, updateTrainerDto: UpdateTrainerDto) {
    return this.trainerRepository.update(id, updateTrainerDto);
  }

  async updateTimeSlot(id: string, timeId: number) {
    return this.trainerRepository.updateTimeSlot(id, timeId);
  }

  async delete(id: string) {
    return this.trainerRepository.delete(id);
  }
}
