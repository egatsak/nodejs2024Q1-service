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

import { ValidBody } from 'src/common/decorators/valid-body.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthScheme, TokensScheme } from './auth.scheme';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
