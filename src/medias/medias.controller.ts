import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMedia } from './dtos/medias.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  async createMedia(@Body() body: CreateMedia) {
    await this.mediasService.createMedia(body.title, body.username);
    return 'OK';
  }

  @Get()
  async getMedias() {
    return await this.mediasService.getMedias();
  }

  @Get(':id')
  async getMediaById(@Param('id', ParseIntPipe) id: number) {
    return await this.mediasService.getMediaById(id);
  }

  @Put(':id')
  async updateMedia(@Param('id', ParseIntPipe) id: number, @Body() body: CreateMedia) {
    await this.mediasService.updateMedia(id, body.title, body.username);
    return 'OK';
  }

  @Delete(':id')
  async deleteMedia(@Param('id', ParseIntPipe) id: number) {
    await this.mediasService.deleteMedia(id);
    return 'OK';
  }
}
