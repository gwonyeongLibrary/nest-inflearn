import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  signUp() {
    return 'signUp';
  }

  @Post('login')
  logIn() {
    return 'logout';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
