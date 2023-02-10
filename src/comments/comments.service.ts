import { Injectable } from '@nestjs/common';
import { CommentCreateDto } from './DTOs/comment.create.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: Comment) {}

  async getAllComments() {
    return 'd';
  }

  async createComment(id: string, comments: CommentCreateDto) {}
}
