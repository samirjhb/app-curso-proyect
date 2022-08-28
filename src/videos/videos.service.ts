/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video, VideoDocument } from './model/videos.schema';

interface ModelExt<T> extends Model<T> {
  delete: Function;
  findAllCourses: Function;
}

@Injectable()
export class VideosService {
  @InjectModel(Video.name)
  private readonly videosModel: ModelExt<VideoDocument>;

  async create(createVideoDto: CreateVideoDto) {
    return this.videosModel.create(createVideoDto);
  }

  async findAll() {
    return await this.videosModel.findAllCourses();
  }

  async findOne(id: string) {
    return await this.videosModel.findOne({ id });
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    return await this.videosModel.findOneAndUpdate({ id }, updateVideoDto, {
      upsert: true,
      new: true,
    });
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id);
    const response = this.videosModel.delete({ _id });
    return await response;
  }
}
