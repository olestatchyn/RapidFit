import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async getAllComments(): Promise<Comment[]> {
    return this.commentRepository.findAll();
  }

  async getCommentById(id: string): Promise<Comment> {
    return this.commentRepository.findById(id);
  }

  async createComment(
    createCommentDto: CreateCommentDto,
    user: { userId: string; email: string; name: string }
  ): Promise<Comment> {
    console.log(createCommentDto, user);
    return this.commentRepository.create(createCommentDto, user);
  }

  async deleteComment(id: string): Promise<void> {
    await this.commentRepository.deleteById(id);
  }
}
