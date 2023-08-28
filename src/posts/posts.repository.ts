import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: createPostDto,
    });
  }

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async findOne(id: number) {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const { text, title, image = null } = updatePostDto;
    try {
      return await this.prisma.post.update({
        where: {
          id,
        },
        data: {
          text,
          title,
          image,
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
      return await this.prisma.post.delete({
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
