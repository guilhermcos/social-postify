import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMedia(title: string, username: string) {
    await this.prisma.media.create({
      data: {
        title,
        username,
      },
    });
  }

  async getMedias() {
    return await this.prisma.media.findMany();
  }

  async getMediaById(id: number) {
    return await this.prisma.media.findUnique({
      where: {
        id,
      },
    });
  }

  async updateMedia(id: number, title: string, username: string) {
    await this.prisma.media.update({
      where: {
        id,
      },
      data: {
        title,
        username,
      },
    });
  }

  async deleteMedia(id: number) {
    try {
      return await this.prisma.media.delete({
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

  async findMediaByData({ title, username }: { title?: string; username?: string }) {
    return await this.prisma.media.findFirst({
      where: {
        username,
        title,
      },
    });
  }
}
