import { CatsRepository } from './../cats/cats.repository';
import { Injectable } from '@nestjs/common';
import { CommentCreateDto } from './DTOs/comment.create.dto';
import { Comments } from './comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    const comments = await this.commentsModel.find();
    return comments;
  }

  async createComment(id: string, commentsModel: CommentCreateDto) {
    const targetCat = await this.catsRepository.findCatByIdWithoutPassword(id);
    const { author, contents } = commentsModel;
    const validatedAuthor =
      await this.catsRepository.findCatByIdWithoutPassword(author);
    const newComment = new this.commentsModel({
      author: validatedAuthor._id,
      contents,
      info: targetCat._id,
    });
    return await newComment.save();
  }
}
