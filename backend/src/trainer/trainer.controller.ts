import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Get()
  async getAllTrainers() {
    return this.trainerService.findAll();
  }

  @Get(':id')
  async getTrainerById(@Param('id') id: string) {
    return this.trainerService.findById(id);
  }

  @Post('add')
  async addTrainer(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainerService.create(createTrainerDto);
  }

  @Patch('update/:id')
  async updateTrainer(
    @Param('id') id: string,
    @Body() updateTrainerDto: UpdateTrainerDto,
  ) {
    return this.trainerService.update(id, updateTrainerDto);
  }

  @Patch('updateTime/:id/:timeId')
  async updateTimeSlot(
    @Param('id') id: string,
    @Param('timeId') timeId: number,
  ) {
    return this.trainerService.updateTimeSlot(id, timeId);
  }

  @Delete('delete/:id')
  async deleteTrainer(@Param('id') id: string) {
    return this.trainerService.delete(id);
  }
}
