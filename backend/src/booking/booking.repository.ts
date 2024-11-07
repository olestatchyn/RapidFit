import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingRepository {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async findByUserId(userId: string): Promise<Booking[]> {
    const books = await this.bookingModel.find({ userId }).exec();
    return books;
  }

  async findByTrainerId(trainerId: string): Promise<Booking[]> {
    return this.bookingModel.find({ trainerId }).exec();
  }

  async create(data: CreateBookingDto): Promise<Booking> {
    const booking = new this.bookingModel(data);
    return booking.save();
  }

  async update(id: string, data: UpdateBookingDto): Promise<Booking> {
    return this.bookingModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Booking> {
    return this.bookingModel.findByIdAndDelete(id).exec();
  }
}
