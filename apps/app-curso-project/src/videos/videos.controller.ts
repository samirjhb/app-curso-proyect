/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerInterceptor } from './../utils/logger.interceptor';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  HttpCode,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../utils/media.handle';
import { CoursesService } from '../courses/courses.service';
import { Rol } from '../decorators/rol.decorator';


@Controller('videos')
@UseInterceptors(LoggerInterceptor)
@ApiTags('videos')
@UsePipes(new ValidationPipe())
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
    private readonly coursesService: CoursesService,
  ) {}

  @Post()
  @HttpCode(201)
  @Rol(['admin'])
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  //Upload
  @Post('upload/:id')
  @HttpCode(201)
  @Rol(['admin'])
  @UseInterceptors(FileInterceptor('file', { storage }))
  upload(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.videosService.addVideo(id, file.filename);
  }

  @Get('')
  @HttpCode(200)
  @Rol(['manager', 'admin'])
  findAll(@Query('id') id: string) {
    return this.videosService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @Rol(['manager', 'admin'])
  findOne(@Param('id') id: string) {
    console.log('Que tengo aqui', id);
    return this.videosService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @Rol(['admin'])
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Rol(['manager', 'admin'])
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
