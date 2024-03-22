import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<T extends { id: string }> {
  constructor(private readonly repository: Repository<T>) {}

  create(payload: DeepPartial<T>): T {
    return this.repository.create(payload);
  }

  async save(payload: DeepPartial<T>): Promise<T> {
    return await this.repository.save(payload);
  }

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async findOneById(id: string): Promise<T | null> {
    return await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async findOneBy(options: FindOptionsWhere<T>): Promise<T | null> {
    return await this.repository.findOneBy(options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(options);
  }

  async updateById(id: string, payload: QueryDeepPartialEntity<T>): Promise<number> {
    const result = await this.repository.update(id, payload);
    return result.affected;
  }

  async preload(entityLike: DeepPartial<T>): Promise<T | undefined> {
    return await this.repository.preload(entityLike);
  }

  async exists(options: FindManyOptions<T>) {
    return await this.repository.exists(options);
  }

  async deleteById(id: string): Promise<number> {
    const result = await this.repository.delete(id);
    return result.affected;
  }

  async delete(options: FindOptionsWhere<T>) {
    const result = await this.repository.delete(options);
    return result.affected;
  }
}
