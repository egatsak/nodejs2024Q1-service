import { Exclude, Transform } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { UserResponse } from '../users.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @VersionColumn()
  version: number;

  @Transform((item) => item.value.getTime())
  @CreateDateColumn()
  createdAt: Date;

  @Transform((item) => item.value.getTime())
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  toResponse() {
    return this as unknown as UserResponse;
  }
}
