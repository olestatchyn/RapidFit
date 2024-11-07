import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trainer } from './schemas/trainer.schema';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Injectable()
export class TrainerRepository {
  constructor(@InjectModel(Trainer.name) private trainerModel: Model<Trainer>) {}

  async findAll(): Promise<Trainer[]> {
    return this.trainerModel.find().exec();
  }

  async findById(id: string): Promise<Trainer> {
    return this.trainerModel.findById(id).exec();
  }

  async create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const timeslot = [
      { id: 1, startTime: 6, endTime: 8, isBooked: false },
      { id: 2, startTime: 8, endTime: 10, isBooked: false },
      { id: 3, startTime: 16, endTime: 18, isBooked: false },
      { id: 4, startTime: 18, endTime: 20, isBooked: false },
    ];
    const trainer = new this.trainerModel({ ...createTrainerDto, timeslot });
    return trainer.save();
  }

  async update(id: string, updateTrainerDto: UpdateTrainerDto): Promise<Trainer> {
    return this.trainerModel.findByIdAndUpdate(id, updateTrainerDto, { new: true }).exec();
  }

  async updateTimeSlot(id: string, timeId: number): Promise<Trainer> {
    const trainer = await this.trainerModel.findById(id).exec();
    if (trainer) {
      trainer.timeslot = trainer.timeslot.map((slot) => {
        if (slot.id === timeId) {
          slot.isBooked = true;
        }
        return slot;
      });
      return trainer.save();
    }
    return null;
  }

  async delete(id: string): Promise<Trainer> {
    return this.trainerModel.findByIdAndDelete(id).exec();
  }
}
