import { currentUser } from './../common/decorators/user.decorator';
import { AuthService } from './../auth/auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatsService } from './cats.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatResponseDto } from './dto/cat.dto';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    private readonly authService: AuthService,
  ) {}
  @Get()
  @ApiOperation({ summary: '회원가입' })
  @UseGuards(JwtAuthGuard)
  getCurrentCat(@currentUser() req) {
    return req.user;
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
  @ApiOperation({ summary: '로그인' })
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
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
