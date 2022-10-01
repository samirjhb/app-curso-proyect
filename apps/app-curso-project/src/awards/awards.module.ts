import { Module } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { AwardsController } from './awards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Awards, AwardsSchema } from './model/awards.schema';
import { User, UserSchema } from '../users/model/user.schema';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Awards.name,
        schema: AwardsSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AwardsController],
  providers: [AwardsService, JwtStrategy],
  exports: [AwardsService],
})
export class AwardsModule {}
