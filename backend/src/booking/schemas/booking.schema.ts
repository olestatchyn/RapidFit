import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Booking extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  trainerId: string;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  bookingDate: string;

  @Prop({ required: true })
  bookingSlot: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
