import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { CoursesModule } from 'src/courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Video } from './entities/video.entity';
import { VideoSchema } from './model/videos.schema';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { User, UserSchema } from 'src/users/model/user.schema';

@Module({
  imports: [
    CoursesModule,
    MongooseModule.forFeature([
      {
        name: Video.name,
        schema: VideoSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [VideosController],
  providers: [VideosService, JwtStrategy],
  exports: [VideosService],
})
export class VideosModule {}
