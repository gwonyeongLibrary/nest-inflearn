import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1y' },
    }),

    forwardRef(() => CatsModule),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
