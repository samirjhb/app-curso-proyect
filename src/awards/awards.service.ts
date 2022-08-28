/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
import { Awards, AwardsDocument } from './model/awards.schema';

interface ModelExt<T> extends Model<T> {
  delete: Function;
  findAllCourses: Function;
}

@Injectable()
export class AwardsService {
  @InjectModel(Awards.name)
  private readonly awardsModel: ModelExt<AwardsDocument>;

  async create(createAwardDto: CreateAwardDto) {
    return await this.awardsModel.create(createAwardDto);
  }

  async findAll() {
    return await this.awardsModel.findAllCourses();
  }

  async findOne(id: string) {
    return this.awardsModel.findOne({ id });
  }

  async update(id: string, updateAwardDto: UpdateAwardDto) {
    return await this.awardsModel.findOneAndUpdate({ id }, updateAwardDto, {
      upsert: true,
      new: true,
    });
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id);
    const response = this.awardsModel.delete({ _id });
    return await response;
  }
}
