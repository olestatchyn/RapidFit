import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async getAllBookings() {
    return this.bookingService.findAll();
  }

  @Get('userId')
  @UseGuards(AuthGuard)
  async getBookingsByUserId(@Body('userId') userId: string) {
    return this.bookingService.findByUserId(userId);
  }

  @Get(':trainerId')
  async getBookingsByTrainerId(@Param('trainerId') trainerId: string) {
    return this.bookingService.findByTrainerId(trainerId);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Patch('edit/:id')
  async updateBooking(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @Delete('remove/:id')
  @UseGuards(AuthGuard)
  async deleteBooking(@Param('id') id: string) {
    return this.bookingService.delete(id);
  }
}
