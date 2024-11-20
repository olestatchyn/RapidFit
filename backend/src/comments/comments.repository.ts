import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().sort({ createdAt: -1 }).limit(10).exec();
  }

  async findById(id: string): Promise<Comment> {
    const comment = await this.commentModel.findById(id).exec();
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }
    return comment;
  }

  async create(
    createCommentDto: CreateCommentDto,
    user: { userId: string; email: string; name: string }
  ): Promise<Comment> {
    const { userId, email, name } = user;
    const newComment = new this.commentModel({
      ...createCommentDto,
      userId,
      email,
      name,
    });
    return newComment.save();
  }

  async deleteById(id: string): Promise<void> {
    const comment = await this.findById(id);
    await this.commentModel.deleteOne({ _id: comment._id }).exec();
  }
}
