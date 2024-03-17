import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => new User(user));
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found!`);
    }
    return new User(user);
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    await this.userRepository.save(user);
    return new User(user);
  }

  async updateUserPassword(id: string, dto: UpdatePasswordDto): Promise<User> {
    const user = await this.userRepository.preload({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found!`);
    }
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException(`Incorrect password.`);
    }
    const updatedUser = await this.userRepository.save({ ...user, password: dto.newPassword });

    return new User(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.deleteById(id);
    if (result === 0) {
      throw new NotFoundException(`User with id ${id} not found!`);
    }
  }
}
