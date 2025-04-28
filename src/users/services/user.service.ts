import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityFilteredListResults, getEntityFilteredList } from '@paginator/paginator.service';
import { ApiKey } from '@src/auth/helpers/api-key.utils';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserQueryFilterDto } from '../dto/user-query-filter.dto';
import { User } from '../entities/user.entity';
import { UserNameAlreadyExistsException, UserNotFoundException } from '../helpers/user.exception';
import { UpdateUserDto } from './../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Create an user
   * @param createUserDto - CreateUserDto
   * @returns Promise<User>
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name } = createUserDto;
    const existingUser = await this.userRepository.findOneBy({ name });
    if (existingUser) {
      throw new UserNameAlreadyExistsException({ name });
    }

    const apiKeyClear = ApiKey.generate();
    const apiKey = ApiKey.hash(apiKeyClear);

    const newUser = await this.userRepository.save({ ...createUserDto, apiKey });
    newUser.apiKey = apiKeyClear;
    return newUser;
  }

  async findAll(query: UserQueryFilterDto): EntityFilteredListResults<User> {
    const [users, totalResults] = await getEntityFilteredList({
      repository: this.userRepository,
      queryFilter: query,
      withDeleted: true,
    });
    return [users, users.length, totalResults];
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id }, withDeleted: true });
  }

  async findAllWithDeleted(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect([
        'user.id',
        'user.createdAt',
        'user.updatedAt',
        'user.deletedAt',
        'user.name',
        'user.apiKey',
        'user.role',
      ])
      .withDeleted()
      .getMany();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { name } = updateUserDto;
    if (name) {
      const existingUser = await this.userRepository.findOneBy({ name });
      if (existingUser && existingUser.id !== id) {
        throw new UserNameAlreadyExistsException({ name });
      }
    }

    await this.userRepository.update(id, updateUserDto);
    return this.findOneById(id);
  }

  async generateNewApiKey(id: number) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new UserNotFoundException({ id });
    }

    const newApiKeyClear = ApiKey.generate();
    const newApiKey = ApiKey.hash(newApiKeyClear);

    user.apiKey = newApiKey;
    await this.userRepository.save(user);
    return { ...user, apiKey: newApiKeyClear };
  }

  async archiveUser(id: number) {
    await this.userRepository.softDelete(id);
  }

  async restoreUser(id: number) {
    await this.userRepository.restore(id);
  }
}
