import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityFilteredListResults, getEntityFilteredList } from '@paginator/paginator.service';
import { Password } from '@src/auth/helpers/password.utils';
import { Repository } from 'typeorm';
import { CreateUserDto, FormattedCreatedUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserQueryFilterDto } from '../dto/user-query-filter.dto';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { UserEmailAlreadyExistsException } from '../helpers/user.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  /**
   * Create an user
   * @param createUserDto - CreateUserDto
   * @returns Promise<User>
   */
  async create(createUserDto: CreateUserDto): Promise<FormattedCreatedUserDto> {
    const isUserExists = await this.emailAlreadyExists(createUserDto.email);
    if (isUserExists) throw new UserEmailAlreadyExistsException({ email: createUserDto.email });

    // Get role
    const role = await this.roleRepository.findOneBy({ type: createUserDto.role });

    // Hash password
    const hashedPassword = Password.hash(createUserDto.password);

    const createdUser = await this.userRepository.save({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hashedPassword,
      role: role!,
    });

    const { password: _, ...user } = createdUser;

    return user;
  }

  async emailAlreadyExists(email: string): Promise<boolean> {
    const count = await this.userRepository.count({ where: { email }, withDeleted: true });
    return count > 0;
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

  async findOneByEmailWithPassword(email: string): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect([
        'user.id',
        'user.createdAt',
        'user.updatedAt',
        'user.deletedAt',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.password',
      ])
      .leftJoinAndSelect('user.role', 'role')
      .where('user.email = :email', { email })
      .withDeleted()
      .getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, password, role } = updateUserDto;
    if (email) {
      const existingUser = await this.userRepository.findOneBy({ email });
      if (existingUser && existingUser.id !== id) {
        throw new UserEmailAlreadyExistsException({ email });
      }
    }

    const hashedPassword = password ? Password.hash(password) : undefined;
    const dbRole = role ? ((await this.roleRepository.findOneBy({ type: role })) ?? undefined) : undefined;

    await this.userRepository.update(id, { ...updateUserDto, password: hashedPassword, role: dbRole });
    return this.findOneById(id);
  }

  async archiveUser(id: number) {
    await this.userRepository.softDelete(id);
  }

  async restoreUser(id: number) {
    await this.userRepository.restore(id);
  }
}
