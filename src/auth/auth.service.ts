import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UsersService } from 'src/users/users.service';
import { RefreshDto } from './dto/refresh.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IUserTokenResponse, UserTokenResponse } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserDto) {
    const user = await this.usersService.createUser(dto);
    const tokens = await this.createTokensPair(user.id, user.login);
    const userToResponse: IUserTokenResponse = new UserTokenResponse({
      ...user,
      ...tokens,
    });

    return userToResponse;
  }

  async signIn(dto: CreateUserDto) {
    const user = await this.usersService.getByLoginAndValidate(dto);
    const tokens = await this.createTokensPair(user.id, user.login);
    const userToResponse = new UserTokenResponse({
      ...user,
      ...tokens,
    });

    return userToResponse;
  }

  async generateNewRefreshToken(dto: RefreshDto) {
    try {
      const body = (await this.jwtService.verifyAsync(dto.refreshToken, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      })) as {
        userId: string;
      };

      if (!body) {
        throw new ForbiddenException('Token invalid or expired');
      }

      const user = await this.usersService.getById(body.userId);

      return await this.createTokensPair(user.id, user.login);
    } catch (e) {
      throw new ForbiddenException('Token invalid or expired');
    }
  }

  async createTokensPair(userId: string, login: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(
        {
          userId,
          expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
          secret: this.configService.get('JWT_SECRET_KEY'),
        },
        { login },
      ),
      this.signToken(
        {
          userId,
          expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
          secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        },
        { login },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  private async signToken<T>(
    { userId, expiresIn, secret }: { userId: string; expiresIn: number; secret: string },
    payload?: T,
  ) {
    return await this.jwtService.signAsync(
      {
        userId,
        ...payload,
      },
      {
        secret,
        expiresIn,
      },
    );
  }
}
