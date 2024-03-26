import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { ValidBody } from 'src/common/decorators/valid-body.decorator';
import { Public } from 'src/common/decorators/public.decorator';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RefreshDto } from './dto/refresh.dto';

import { AuthScheme, TokensScheme } from './auth.scheme';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'Login (remove password from response), generate tokens pair',
  })
  @ApiOkResponse({
    description: 'Login successful, JWT Access & Refresh tokens generated',
    type: AuthScheme,
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  async signin(@Body() createUserDto: CreateUserDto) {
    return this.authService.signIn(createUserDto);
  }

  @Public()
  @Post('signup')
  @ApiOperation({
    summary: 'Create user (remove password from response), generate tokens pair',
  })
  @ApiCreatedResponse({
    description: 'User have been successfully created, JWT Access & Refresh tokens generated',
    type: AuthScheme,
  })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @ApiOperation({
    summary: 'Generate tokens pair using refresh token',
  })
  @ApiCreatedResponse({
    description: 'JWT Access & Refresh tokens generated',
    type: TokensScheme,
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(
    new ValidationPipe({
      errorHttpStatusCode: 401,
    }),
  )
  async refreshToken(@ValidBody() refreshDto: RefreshDto) {
    return this.authService.generateNewRefreshToken(refreshDto);
  }
}
