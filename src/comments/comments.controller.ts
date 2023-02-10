import { CommentCreateDto } from './DTOs/comment.create.dto';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '고양이 프로필의 댓글 가져오기',
  })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({
    summary: '댓글 남기기',
  })
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() comment: CommentCreateDto,
  ) {
    return this.commentsService.createComment(id, comment);
  }
}
