import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { BaseRepository } from 'src/common/base.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super(userRepository);
  }
}
