import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @Length(1, 50)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 50)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  idCourse: string;
}
