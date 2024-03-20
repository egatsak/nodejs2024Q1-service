import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UserResponse } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {}

  async getAll(): Promise<UserResponse[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new User(user).toResponse());
  }

  async getById(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found!`);
    }
    return new User(user).toResponse();
  }

  async createUser(dto: CreateUserDto): Promise<UserResponse> {
    const hashedPassword = await this.hashPassword(dto.password);

    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    return new User(user).toResponse();
  }

  async updateUserPassword(id: string, dto: UpdatePasswordDto): Promise<UserResponse> {
    const user = await this.userRepository.preload({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found!`);
    }

    if (!(await this.validatePassword(dto.oldPassword, user.password))) {
      throw new ForbiddenException(`Incorrect password!`);
    }

    const newHashedPassword = await this.hashPassword(dto.newPassword);
    const updatedUser = await this.userRepository.save({ ...user, password: newHashedPassword });

    return new User(updatedUser).toResponse();
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.deleteById(id);
    if (result === 0) {
      throw new NotFoundException(`User with id ${id} not found!`);
    }
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const equal = await bcrypt.compare(plainPassword, hashedPassword);
    return equal;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = Number(this.configService.get('SALT') ?? 10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  }

  async getUserByLogin(login: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async getByLoginAndValidate(dto: CreateUserDto) {
    const user = await this.getUserByLogin(dto.login);

    if (!(await this.validatePassword(dto.password, user.password))) {
      throw new ForbiddenException(`Incorrect password!`);
    }

    return user as unknown as UserResponse;
  }
}
