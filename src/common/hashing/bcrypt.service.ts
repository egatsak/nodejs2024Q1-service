import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
  async hash(data: string | Buffer, salt?: number): Promise<string> {
    const genSalt = await bcrypt.genSalt(salt);
    return bcrypt.hash(data, genSalt);
  }

  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
