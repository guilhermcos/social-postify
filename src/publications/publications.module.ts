import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationsRepository } from './publications.repository';
import { DateValidationPipe } from './pipes/date-validation.pipe';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService, PublicationsRepository, DateValidationPipe],
})
export class PublicationsModule {}
