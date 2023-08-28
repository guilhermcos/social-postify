import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-publication.dto';
import { IsDateString, IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdatePublicationDto {
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
