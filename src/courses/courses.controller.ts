import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  Param,
  UseGuards,
  Req,
  SetMetadata,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Rol } from 'src/decorators/rol.decorator';
import { BrowserAgentGuard } from 'src/guards/browser-agent.guard';
import { JwtGuardGuard } from 'src/guards/jwt-guard.guard';
import { RolesGuardGuard } from 'src/guards/roles-guard.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { SlugPipe } from './pipes/slug.pipe';
//import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('courses')
// @UseGuards(BrowserAgentGuard)
@UseGuards(JwtGuardGuard, RolesGuardGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiBearerAuth()
  @Post()
  @HttpCode(201)
  @Rol(['admin'])
  create(@Req() req: Request, @Body() create: CreateCourseDto) {
    return this.coursesService.create(create);
  }

  @Get('')
  @HttpCode(200)
  @Rol(['manager', 'admin'])
  getListCourses() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @Rol(['manager', 'admin'])
  getOneCourse(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  } 

  @Patch(':id')
  @HttpCode(200)
  @Rol(['admin'])
  updateCourse(@Param('id') id: string, @Body() body:UpdateCourseDto) {
    return this.coursesService.update(id, body);
  } 

  @Delete(':id')
  @HttpCode(200)
  @Rol(['manager', 'admin'])
  deleteCourse(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }

  // @Get(':title')
  // @Rol([ 'manager', 'admin'])
  // getDetail(@Param('title', new SlugPipe()) title: string) {
  //   console.log('__Title__', title);
  //   return this.coursesService.findOne(1);
  // }

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
