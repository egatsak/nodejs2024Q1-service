import { Request } from 'express';
import { Injectable, ExecutionContext, CanActivate, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { REQUEST_USER_KEY } from 'src/common/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Please provide valid JWT access token');
    }
    try {
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      })) as { userId: string; login: string };

      request[REQUEST_USER_KEY] = payload.userId;
    } catch (e) {
      throw new ForbiddenException(`Invalid or expired access token`);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
