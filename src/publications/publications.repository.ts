import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPublicationDto: CreatePublicationDto) {
    const { date, mediaId, postId } = createPublicationDto;
    try {
      await this.prisma.publication.create({
        data: {
          date: date,
          mediaId: +mediaId,
          postId: +postId,
        },
      });
    } catch (err) {
      if (err.code === 'P2003') {
        throw new HttpException('Invalid mediaId or postId', HttpStatus.NOT_FOUND);
      }
      throw err;
    }
  }

  async findAll(options: { published: boolean; after: string }) {
    const { published = undefined, after = undefined } = options;

    function ltePublishedQuery(published: boolean) {
      if (published === true) return new Date();
      if (published === false) return undefined;
      return undefined;
    }

    function gtePublishedQuery(published: boolean) {
      if (published === true) return undefined;
      if (published === false) return new Date();
      return undefined;
    }

    return await this.prisma.publication.findMany({
      where: {
        date: {
          gt: after ? new Date(after) : undefined,
          lte: ltePublishedQuery(published),
          gte: gtePublishedQuery(published),
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.publication.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const { date, mediaId, postId } = updatePublicationDto;
    try {
      return await this.prisma.publication.update({
        where: {
          id,
        },
        data: {
          date,
          mediaId: +mediaId,
          postId: +postId,
        },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        return null;
      }
      throw err;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.publication.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        return null;
      }
      throw err;
    }
  }
}
