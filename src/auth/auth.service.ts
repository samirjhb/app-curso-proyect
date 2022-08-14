import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/model/user.schema';
import { UserDocument } from '../users/model/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody;
    const userParse = { ...user, password: await generateHash(password) };
    return this.userModel.create(userParse);
  }

  public async login(userLoginBody: LoginAuthDto) {
    const { password } = userLoginBody;

    const userExist = await this.userModel.findOne({
      email: userLoginBody.email,
    });
    if (!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const isCheck = await compareHash(password, userExist.password);
    if (!isCheck)
      throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    const userFlat = userExist.toObject();
    delete userFlat.password;

    //Agregando el Token
    const payload = {
      id: userFlat._id,
      name: userFlat.name
    };
    const token = this.jwtService.sign(payload);
    const data = {
      token: token, 
      user: userFlat,
    };

    return data;
  }
}
