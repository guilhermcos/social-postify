import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(createPostDto: CreatePostDto) {
    return await this.postsRepository.createPost(createPostDto);
  }

  async findAll() {
    return await this.postsRepository.findAll();
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne(id);
    if (!post) throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const updatedPost = await this.postsRepository.update(id, updatePostDto);
    if (!updatedPost) throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    return updatedPost;
  }

  async remove(id: number) {
    const removedPost = await this.postsRepository.remove(id);
    if (!removedPost) throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    return removedPost;
  }
}
