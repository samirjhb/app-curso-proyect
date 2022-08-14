import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course, CourseSchema } from './model/courses.scheme';
import { User, UserSchema } from 'src/users/model/user.schema';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService, JwtStrategy],
  exports: [CoursesService],
})
export class CoursesModule {}
