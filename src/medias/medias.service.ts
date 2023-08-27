import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: MediasRepository) {}

  async createMedia(title: string, username: string) {
    await this.validateCreateMedia(title, username);
    await this.mediasRepository.createMedia(title, username);
  }

  async getMedias() {
    return await this.mediasRepository.getMedias();
  }

  async getMediaById(id: number) {
    const media = await this.mediasRepository.getMediaById(id);
    if (!media) throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    return media;
  }

  async updateMedia(id: number, title: string, username: string) {
    const media = await this.mediasRepository.getMediaById(id);
    if (!media) throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    await this.validateCreateMedia(title, username);
    await this.mediasRepository.updateMedia(id, title, username);
  }

  async deleteMedia(id: number) {
    const excludedMedia = await this.mediasRepository.deleteMedia(id);
    if (!excludedMedia) throw new HttpException('Media Not Found', HttpStatus.NOT_FOUND);
    return excludedMedia;
  }

  private async validateCreateMedia(title: string, username: string) {
    const media = await this.mediasRepository.findMediaByData({
      title,
      username,
    });
    if (media) throw new HttpException('Media Already registered', 409);
  }
}
