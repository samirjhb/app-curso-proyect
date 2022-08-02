import { Controller, Post, Body, HttpCode, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { SlugPipe } from './pipes/slug.pipe';
//import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiBearerAuth()
  @Post()
  @HttpCode(201)
  create(@Body() create: CreateCourseDto) {
    return this.coursesService.create(create);
  }

  @Get(':title')
  getDetail(@Param('title', new SlugPipe()) title: string) {
    console.log('__Title__', title);
    return this.coursesService.findOne(1);
  }

  // @Get(':id')
  // getDetail2(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({
  //       errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
  //     }),
  //   )
  //   id: number,
  // ) {
  //   return this.coursesService.findOne(id);
  // }
}
