import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  ParseUUIDPipe,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';
import { UserScheme } from './users.scheme';
import { UserResponse } from './users.interface';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Create user (remove password from response)' })
  @ApiCreatedResponse({
    description: 'User have been successfully created',
    type: UserScheme,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users (remove password from response)' })
  @ApiOkResponse({
    description: 'Users have been successfully listed',
    type: [UserScheme],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAll(): Promise<UserResponse[]> {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get user by ID (remove password from response)' })
  @ApiOkResponse({
    description: 'User has been successfully listed',
    type: UserScheme,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserResponse> {
    return this.userService.getById(id);
  }

  @ApiOperation({
    summary: 'Update user password (remove password from response)',
  })
  @ApiOkResponse({
    description: 'User password have been successfully updated',
    type: UserScheme,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden (incorrect password)',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  changePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) updatePassword: UpdatePasswordDto,
  ): Promise<UserResponse> {
    return this.userService.updateUserPassword(id, updatePassword);
  }

  @ApiOperation({
    summary: 'Delete user by ID (empty response)',
  })
  @ApiNoContentResponse({
    description: 'User have been successfully deleted',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
