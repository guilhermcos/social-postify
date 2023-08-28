import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { DateValidationPipe } from './pipes/date-validation.pipe';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  async create(@Body() createPublicationDto: CreatePublicationDto) {
    await this.publicationsService.create(createPublicationDto);
    return 'OK';
  }

  @Get()
  async findAll(
    @Query('published', new ParseBoolPipe({ optional: true })) published: boolean,
    @Query('after', DateValidationPipe) after: string,
  ) {
    return await this.publicationsService.findAll({ published, after });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.publicationsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePublicationDto: UpdatePublicationDto,
  ) {
    return await this.publicationsService.update(id, updatePublicationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.publicationsService.remove(+id);
    return 'OK';
  }
}
