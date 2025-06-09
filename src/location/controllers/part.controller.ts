import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActivityLogger } from '@src/activity-logger/helpers/activity-logger.decorator';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { GetUser } from '@src/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { LoggedUser } from '@src/auth/types/logged-user.type';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { FilterOp, PaginatedList } from '@src/paginator/paginator.type';
import { RoleType } from '@src/users/types/role.types';
import { CreatePartDto } from '../dto/part/create-part.dto';
import { PartQueryFilterDto } from '../dto/part/part-query-filter.dto';
import { UpdatePartDto } from '../dto/part/update-part.dto';
import { Part } from '../entities/part.entity';
import { PartService } from '../services/part.service';

@ApiTags(Resources.PART)
@SwaggerFailureResponse()
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'parts', version: ['1'] })
export class PartController {
  constructor(private readonly partService: PartService) {}

  @Post()
  @Roles(RoleType.COMPANY_MANAGER)
  @ActivityLogger({ description: 'Créer une nouvelle partie' })
  @ApiOperation({ summary: 'Create a new part' })
  @ApiResponse({ status: 201, description: 'The part has been successfully created.', type: Part })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createPartDto: CreatePartDto, @GetUser() user: LoggedUser): Promise<Part> {
    return await this.partService.create(createPartDto, user);
  }

  @Get()
  @Roles(RoleType.COMPANY_MEMBER)
  @ApiOperation({ summary: 'Get all parts' })
  @ApiResponse({ status: 200, description: 'Return all parts.', type: [Part] })
  async findAll(@Query() query: PartQueryFilterDto, @GetUser() user: LoggedUser): Promise<PaginatedList<Part>> {
    if (user.role.type !== RoleType.ADMINISTRATOR) {
      if (query.filterField) {
        query.filterField += ',companyId';
        query.filterOp += `,${FilterOp.EQUALS}`;
        query.filter += `,${user.company.id}`;
      } else {
        query.filterField = 'companyId';
        query.filterOp = FilterOp.EQUALS;
        query.filter = user.company.id.toString();
      }
    }
    const [parts, currentResults, totalResults] = await this.partService.findAll(query);
    return { ...query, totalResults, currentResults, results: parts };
  }

  @Get(':id')
  @Roles(RoleType.COMPANY_MEMBER)
  @ApiOperation({ summary: 'Get a part by id' })
  @ApiResponse({ status: 200, description: 'Return the part.', type: Part })
  @ApiResponse({ status: 404, description: 'Part not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: LoggedUser): Promise<Part> {
    return await this.partService.findOne(id, user);
  }

  @Patch(':id')
  @Roles(RoleType.COMPANY_MANAGER)
  @ActivityLogger({ description: 'Modifier une partie' })
  @ApiOperation({ summary: 'Update a part' })
  @ApiResponse({ status: 200, description: 'The part has been successfully updated.', type: Part })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Part not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePartDto: UpdatePartDto,
    @GetUser() user: LoggedUser,
  ): Promise<Part> {
    return await this.partService.update(id, updatePartDto, user);
  }

  @Delete(':id')
  @Roles(RoleType.COMPANY_MANAGER)
  @ActivityLogger({ description: 'Supprimer une partie' })
  @ApiOperation({ summary: 'Delete a part' })
  @ApiResponse({ status: 200, description: 'The part has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Part not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: LoggedUser): Promise<void> {
    await this.partService.softDelete(id, user);
  }
}
