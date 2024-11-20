import { Controller, Get, Post, Delete, Body, Param, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllComments(): Promise<Comment[]> {
    return this.commentsService.getAllComments();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getCommentById(@Param('id') id: string): Promise<Comment> {
    try {
      return await this.commentsService.getCommentById(id);
    } catch (error) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Req() req: any,
    @Body() createCommentDto: CreateCommentDto
  ): Promise<Comment> {
    const { id: userId, email, name } = req.user;
    return this.commentsService.createComment(createCommentDto, { userId, email, name });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Param('id') id: string): Promise<void> {
    try {
      await this.commentsService.deleteComment(id);
    } catch (error) {
      throw new NotFoundException(`Unable to delete comment. ${error.message}`);
    }
  }
}
