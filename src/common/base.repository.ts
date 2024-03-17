import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<T extends { id: string }> {
  constructor(private readonly repository: Repository<T>) {}

  create(payload: DeepPartial<T>): T {
    return this.repository.create(payload);
  }

  async save(payload: DeepPartial<T>): Promise<T> {
    return await this.repository.save(payload);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  // TODO get rid of any
  async findOneById(id: any): Promise<T> {
    return await this.repository.findOneBy({ id });
  }

  async updateById(id: string, payload: QueryDeepPartialEntity<T>): Promise<number> {
    const result = await this.repository.update(id, payload);
    return result.affected;
  }

  async deleteById(id: string): Promise<number> {
    const result = await this.repository.delete(id);
    return result.affected;
  }

  async preload(entityLike: DeepPartial<T>): Promise<T> {
    return await this.repository.preload(entityLike);
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    return await this.repository.findOne(options);
  }
}
