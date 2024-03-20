import { Exclude, Expose, Transform } from 'class-transformer';
import { UserResponse } from 'src/users/users.interface';

export interface IUserTokenResponse extends UserResponse {
  accessToken: string;
  refreshToken: string;
}

@Exclude()
export class UserTokenResponse implements IUserTokenResponse {
  @Expose()
  id: string;

  @Expose()
  login: string;

  @Expose()
  version: number;

  @Expose()
  @Transform((item) => item.value.getTime())
  createdAt: number;

  @Expose()
  @Transform((item) => item.value.getTime())
  updatedAt: number;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  constructor(partial: Partial<UserTokenResponse>) {
    Object.assign(this, partial);
  }
}
