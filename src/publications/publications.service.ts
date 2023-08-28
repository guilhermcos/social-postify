import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';
import * as dayjs from 'dayjs';

@Injectable()
export class PublicationsService {
  constructor(private readonly publicationsRepository: PublicationsRepository) {}

  async create(createPublicationDto: CreatePublicationDto) {
    return await this.publicationsRepository.create(createPublicationDto);
  }

  async findAll(options: { published: boolean; after: string }) {
    return await this.publicationsRepository.findAll(options);
  }

  async findOne(id: number) {
    const publication = await this.publicationsRepository.findOne(id);
    if (!publication) throw new HttpException('Publication Not Found', HttpStatus.NOT_FOUND);
    return publication;
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const isPublished = await this.isPublicationPublished(id);
    if (isPublished) throw new HttpException('Publication already published', HttpStatus.FORBIDDEN);
    const updatedPublication = await this.publicationsRepository.update(id, updatePublicationDto);
    if (!updatedPublication) throw new HttpException('Publication Not Found', HttpStatus.NOT_FOUND);
    return 'OK';
  }

  async remove(id: number) {
    const removedPublication = await this.publicationsRepository.remove(id);
    if (!removedPublication) throw new HttpException('Publication Not Found', HttpStatus.NOT_FOUND);
    return removedPublication;
  }

  async isPublicationPublished(id: number) {
    const publication = await this.publicationsRepository.findOne(id);
    if (!publication) throw new HttpException('Publication Not Found', HttpStatus.NOT_FOUND);
    if (dayjs(publication.date).isBefore(dayjs())) {
      return true;
    }
    return false;
  }
}
