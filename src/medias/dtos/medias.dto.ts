import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMedia {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}
