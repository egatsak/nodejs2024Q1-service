import { ApiProperty } from '@nestjs/swagger';

export class UserScheme {
  @ApiProperty({
    example: '16db9399-17ff-47e5-afc4-b40aa1d9e066',
    description: 'Unique user ID',
  })
  id: string;

  @ApiProperty({ example: 'John', description: 'Login of the user' })
  login: string;

  @ApiProperty({
    example: 1,
    description: 'Version increments every time user is updated',
  })
  version: number;

  @ApiProperty({
    example: '1234567890',
    description: 'Date of user creation, in ms',
  })
  createdAt: number;

  @ApiProperty({
    example: '1234567891',
    description: 'Date of user update, in ms',
  })
  updatedAt: number;
}
