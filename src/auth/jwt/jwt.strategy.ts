import { CatsRepository } from './../../cats/cats.repository';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );
    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
