import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/model/user.schema';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './model/courses.scheme';

interface ModelExt<T> extends Model<T> {
  delete: (data: { _id: Types.ObjectId }) => void;
  paginate: (qurey: any, pagination: any) => void;
}
@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: ModelExt<CourseDocument>,
    @InjectModel(User.name)
    private readonly userModel: ModelExt<UserDocument>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    this.userModel.find();
    return this.courseModel.create(createCourseDto);
  }

  async findAll(pagination) {
    return this.courseModel.paginate({}, pagination);
  }

  async findOne(id: string) {
    return this.courseModel.findOne({ id });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.findOneAndUpdate({ id }, updateCourseDto, {
      upsert: true,
      new: true,
    });
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id);
    const response = this.courseModel.delete({ _id });
    return response;
  }
}
