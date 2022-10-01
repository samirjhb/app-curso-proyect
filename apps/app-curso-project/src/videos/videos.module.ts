import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video } from './entities/video.entity';
import { VideoSchema } from './model/videos.schema';
import { User, UserSchema } from '../users/model/user.schema';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { CoursesModule } from '../courses/courses.module';


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
