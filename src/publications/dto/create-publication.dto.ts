import { IsDateString, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreatePublicationDto {
  @IsNotEmpty()
  @IsNumberString()
  mediaId: string;

  @IsNotEmpty()
  @IsNumberString()
  postId: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}
