import { Module } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { AwardsController } from './awards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Awards, AwardsSchema } from './model/awards.schema';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { User, UserSchema } from 'src/users/model/user.schema';

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
