import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActivityLogger } from '@src/activity-logger/helpers/activity-logger.decorator';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { GetUser } from '@src/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { LoggedUser } from '@src/auth/types/logged-user.type';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { RoleType } from '@src/users/types/role.types';
import { CreateBuildingDto } from '../dto/building/create-building.dto';
import { Building } from '../entities/building.entity';
import { BuildingService } from '../services/building.service';

@ApiTags(Resources.BUILDING)
@SwaggerFailureResponse()
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'buildings', version: ['1'] })
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  @Roles(RoleType.COMPANY_MANAGER)
  @ActivityLogger({ description: 'Créer un nouveau bâtiment' })
  async create(@Body() createBuildingDto: CreateBuildingDto, @GetUser() user: LoggedUser): Promise<Building> {
    return await this.buildingService.create(createBuildingDto, user);
  }
}
