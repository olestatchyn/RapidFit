import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import {
  CreateBookingDto,
  CreateBookingDtoFull,
} from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllBookings() {
    return this.bookingService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('userId')
  async getBookingsByUserId(@Req() req: any) {
    const { _id } = req.user;
    return this.bookingService.findByUserId(_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':trainerId')
  async getBookingsByTrainerId(@Param('trainerId') trainerId: string) {
    return this.bookingService.findByTrainerId(trainerId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBooking(
    @Req() req: any,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    const { id: userId, email } = req.user;

    const bookingData: CreateBookingDtoFull = {
      ...createBookingDto,
      userId,
      userEmail: email,
    };

    return this.bookingService.create(bookingData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('edit/:id')
  async updateBooking(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  async deleteBooking(@Param('id') id: string) {
    return this.bookingService.delete(id);
  }
}
