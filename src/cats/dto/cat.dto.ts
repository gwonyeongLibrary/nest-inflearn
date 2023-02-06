import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class CatResponseDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '12345678',
    description: 'id',
  })
  id: string;
}
