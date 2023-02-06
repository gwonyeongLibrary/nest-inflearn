import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatsService } from './cats.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatResponseDto } from './dto/cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  @ApiOperation({ summary: '회원가입' })
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: 'success!',
    type: CatResponseDto,
  })
  async signUp(@Body() body: CatRequestDto, @Res() res: Response) {
    console.log(body);
    const data = await this.catsService.signUp(body);
    res.status(201).send(data);
  }

  @Post('login')
  @ApiOperation({ summary: '회원가입' })
  logIn() {
    return 'logout';
  }

  @Post('logout')
  @ApiOperation({ summary: '회원가입' })
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  @ApiOperation({ summary: '회원가입' })
  uploadCatImg() {
    return 'uploadImg';
  }
}
