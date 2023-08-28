import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class DateValidationPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata) {
    if (value === undefined) {
      return undefined;
    }

    if (!dayjs(value).isValid()) {
      throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
