import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'gwon@naver.com',
    description: 'email',
    required: true,
  })
  email: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '',
    description: 'password',
    required: true,
  })
  name: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'gwon',
    description: 'nickname',
    required: true,
  })
  password: string;

  @Prop({
    default: `https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg`,
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
