import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivityLogger } from '@src/activity-logger/helpers/activity-logger.decorator';
import { Resources } from '@src/activity-logger/types/resource.types';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { PaginatedList } from '@src/paginator/paginator.type';
import { CreateUserDto, FormattedCreatedUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserQueryFilterDto } from '../dto/user-query-filter.dto';
import { User } from '../entities/user.entity';
import {
  SwaggerUserCreate,
  SwaggerUserFindAll,
  SwaggerUserFindOne,
  SwaggerUserPatch,
  SwaggerUserUpdateState,
} from '../helpers/user-set-decorators.helper';
import { UserNotFoundException } from '../helpers/user.exception';
import { UserService } from '../services/user.service';

@ApiTags(Resources.USER)
@SwaggerFailureResponse()
// @UseGuards(RolesGuard)
@Controller({ path: 'users', version: ['1'] })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @Roles(RoleType.ADMINISTRATOR)
  @SwaggerUserCreate()
  @ActivityLogger({ description: 'Créer un nouvel utilisateur' })
  async create(@Body() createUserDto: CreateUserDto): Promise<FormattedCreatedUserDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  // @Roles(RoleType.CUSTOMER)
  @SwaggerUserFindAll()
  async findAll(@Query() query: UserQueryFilterDto): Promise<PaginatedList<User>> {
    const [users, currentResults, totalResults] = await this.userService.findAll(query);
    return { ...query, totalResults, currentResults, results: users };
  }

  @Get(':id')
  // @Roles(RoleType.CUSTOMER)
  @SwaggerUserFindOne()
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new UserNotFoundException({ id });
    }

    return user;
  }

  @Patch(':id')
  // @Roles(RoleType.ADMINISTRATOR)
  @SwaggerUserPatch()
  @ActivityLogger({ description: "Mettre à jour les informations d'un utilisateur" })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const userExists = await this.userService.findOneById(id);
    if (!userExists) {
      throw new UserNotFoundException({ id });
    }

    return await this.userService.update(id, updateUserDto);
  }

  @Patch(':id/update-state')
  // @Roles(RoleType.ADMINISTRATOR)
  @SwaggerUserUpdateState()
  @ActivityLogger({ description: "Modifier l'état actif d'un utilisateur" })
  async updateState(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new UserNotFoundException({ id });
    }

    if (user.deletedAt) {
      await this.userService.restoreUser(id);
      return { message: 'User restored', id };
    } else {
      await this.userService.archiveUser(id);
      return { message: 'User archived', id };
    }
  }
}
