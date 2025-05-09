import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActivityLogger } from '@src/activity-logger/helpers/activity-logger.decorator';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { GetUser } from '@src/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { LoggedUser } from '@src/auth/types/logged-user.type';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { PaginatedList } from '@src/paginator/paginator.type';
import { CreateUserDto, FormattedCreatedUserDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { UserQueryFilterDto } from '../dto/user/user-query-filter.dto';
import { User } from '../entities/user.entity';
import { UserErrorCode, UserHttpException, UserNotFoundException } from '../helpers/exceptions/user.exception';
import {
  SwaggerUserCreate,
  SwaggerUserFindAll,
  SwaggerUserFindOne,
  SwaggerUserPatch,
  SwaggerUserUpdateState,
} from '../helpers/user-set-decorators.helper';
import { UserService } from '../services/user.service';
import { RoleType } from '../types/role.types';

@ApiTags(Resources.USER)
@SwaggerFailureResponse()
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'users', version: ['1'] })
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Crée un nouvel utilisateur.
   *
   * @param {CreateUserDto} createUserDto - Les données nécessaires pour créer un utilisateur.
   * @param {LoggedUser} user - L'utilisateur actuellement connecté.
   * @returns {Promise<FormattedCreatedUserDto>} Les informations de l'utilisateur créé.
   *
   * @throws {UnauthorizedException} Si l'utilisateur connecté n'a pas les droits nécessaires.
   */
  @Post()
  @Roles(RoleType.COMPANY_ADMINISTRATOR)
  @SwaggerUserCreate()
  @ActivityLogger({ description: 'Créer un nouvel utilisateur' })
  async create(@Body() createUserDto: CreateUserDto, @GetUser() user: LoggedUser): Promise<FormattedCreatedUserDto> {
    if (user.role.type !== RoleType.ADMINISTRATOR) {
      createUserDto.customerId = user.company.id;
    }

    return await this.userService.create(createUserDto);
  }

  /**
   * Récupère une liste paginée d'utilisateurs.
   *
   * @param {UserQueryFilterDto} query - Les filtres et paramètres de pagination pour la recherche.
   * @returns {Promise<PaginatedList<User>>} Une liste paginée des utilisateurs correspondant aux critères.
   */
  @Get()
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerUserFindAll()
  async findAll(@Query() query: UserQueryFilterDto): Promise<PaginatedList<User>> {
    const [users, currentResults, totalResults] = await this.userService.findAll(query);
    return { ...query, totalResults, currentResults, results: users };
  }

  /**
   * Récupère les détails d'un utilisateur spécifique par son ID.
   *
   * @param {number} id - L'identifiant unique de l'utilisateur.
   * @returns {Promise<User>} Les informations de l'utilisateur.
   *
   * @throws {UserNotFoundException} Si aucun utilisateur n'est trouvé avec l'ID fourni.
   */
  @Get(':id')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerUserFindOne()
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new UserNotFoundException({ id });
    }

    return user;
  }

  /**
   * Met à jour les informations d'un utilisateur spécifique.
   *
   * @param {number} id - L'identifiant unique de l'utilisateur à mettre à jour.
   * @param {UpdateUserDto} updateUserDto - Les nouvelles données pour l'utilisateur.
   * @param {LoggedUser} user - L'utilisateur actuellement connecté.
   * @returns {Promise<User>} Les informations mises à jour de l'utilisateur.
   *
   * @throws {UserNotFoundException} Si aucun utilisateur n'est trouvé avec l'ID fourni.
   * @throws {UnauthorizedException} Si l'utilisateur connecté n'a pas les droits nécessaires.
   */
  @Patch(':id')
  @Roles(RoleType.COMPANY_ADMINISTRATOR)
  @SwaggerUserPatch()
  @ActivityLogger({ description: "Mettre à jour les informations d'un utilisateur" })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: LoggedUser,
  ) {
    const userExists = await this.userService.findOneById(id);
    if (!userExists) {
      throw new UserNotFoundException({ id });
    }

    if (user.role.type !== RoleType.ADMINISTRATOR) {
      updateUserDto.customerId = user.company.id;
    }

    return await this.userService.update(id, updateUserDto);
  }

  /**
   * Modifie l'état actif d'un utilisateur (activer ou désactiver).
   *
   * @param {number} id - L'identifiant unique de l'utilisateur dont l'état doit être modifié.
   * @param {LoggedUser} loggedUser - L'utilisateur actuellement connecté.
   * @returns {Promise<User>} Les informations de l'utilisateur avec l'état mis à jour.
   *
   * @throws {UserNotFoundException} Si aucun utilisateur n'est trouvé avec l'ID fourni.
   * @throws {UnauthorizedException} Si l'utilisateur connecté n'a pas les droits nécessaires.
   */
  @Patch(':id/update-state')
  @Roles(RoleType.COMPANY_ADMINISTRATOR)
  @SwaggerUserUpdateState()
  @ActivityLogger({ description: "Modifier l'état actif d'un utilisateur" })
  async updateState(@Param('id', ParseIntPipe) id: number, @GetUser() loggedUser: LoggedUser) {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new UserNotFoundException({ id });
    }

    if (loggedUser.id === user.id)
      throw new UserHttpException(UserErrorCode.CANNOT_UPDATE_OWN_ACCOUNT_STATE, HttpStatus.BAD_REQUEST);

    if (user.deletedAt) {
      await this.userService.restoreUser(id);
      return { message: 'User restored', id };
    } else {
      await this.userService.archiveUser(id);
      return { message: 'User archived', id };
    }
  }
}
