import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto, CreateBookingDtoFull } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async findAll() {
    return this.bookingRepository.findAll();
  }

  async findByUserId(userId: string) {
    return this.bookingRepository.findByUserId(userId);
  }

  async findByTrainerId(trainerId: string) {
    return this.bookingRepository.findByTrainerId(trainerId);
  }

  async create(data: CreateBookingDtoFull) {
    const existingBookings = await this.bookingRepository.findByTrainerId(data.trainerId);

    if (existingBookings.some(
      booking => booking.bookingDate === data.bookingDate && booking.bookingSlot === data.bookingSlot
    )) {
      throw new HttpException('This slot is not available', HttpStatus.CONFLICT);
    }

    const booking = await this.bookingRepository.create(data);

    await this.sendConfirmationEmail(data);

    return booking;
  }

  async update(id: string, data: UpdateBookingDto) {
    return this.bookingRepository.update(id, data);
  }

  async delete(id: string) {
    return this.bookingRepository.delete(id);
  }

  private async sendConfirmationEmail(data: CreateBookingDtoFull) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: data.userEmail,
      subject: 'Booking Confirmation from Rapid Fit',
      text: `Your booking is confirmed on ${data.bookingDate} at ${data.bookingSlot}.`,
    };

    return transporter.sendMail(mailOptions);
  }
}
