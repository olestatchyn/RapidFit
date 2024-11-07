import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Trainer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  gender: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  @Prop([String])
  specialization: string[];

  @Prop([{ id: Number, startTime: Number, endTime: Number, isBooked: Boolean }])
  timeslot: { id: number; startTime: number; endTime: number; isBooked: boolean }[];
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
