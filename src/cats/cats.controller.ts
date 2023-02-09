import { currentUser } from './../common/decorators/user.decorator';
import { AuthService } from './../auth/auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatsService } from './cats.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatResponseDto } from './dto/cat.dto';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { SuccessInterceptor } from 'src/common/transfrom.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
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

  @Post('upload')
  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return 'uploadImg';
  }
}
