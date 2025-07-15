import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ActivityLogger } from '@src/activity-logger/helpers/activity-logger.decorator';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { GetUser } from '@src/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { LoggedUser } from '@src/auth/types/logged-user.type';
import { MulterFile } from '@src/bet/types/product/multer-file.types';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { PaginatedList } from '@src/paginator/paginator.type';
import { RoleType } from '@src/users/types/role.types';
import { CreateObservationDto } from '../dto/create-observation.dto';
import { ObservationQueryFilterDto } from '../dto/observation-query-filter.dto';
import { UpdateObservationDto } from '../dto/update-observation.dto';
import { ObservationFile } from '../entities/observation-file.entity';
import { Observation } from '../entities/observation.entity';
import {
  SwaggerObservationAttachFile,
  SwaggerObservationCreate,
  SwaggerObservationFindAll,
  SwaggerObservationFindOne,
  SwaggerObservationFinish,
  SwaggerObservationGetFiles,
  SwaggerObservationRemoveFile,
  SwaggerObservationStart,
  SwaggerObservationUpdate,
  SwaggerObservationUpdateState,
} from '../helpers/observation-set-decorators.helper';
import { ObservationService } from '../services/observation.service';

@ApiTags(Resources.OBSERVATION)
@SwaggerFailureResponse()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller({ path: 'observations', version: ['1'] })
export class ObservationController {
  constructor(private readonly observationService: ObservationService) {}

  @Post()
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerObservationCreate()
  @ActivityLogger({ description: 'Créer une nouvelle observation' })
  async create(@Body() createObservationDto: CreateObservationDto): Promise<Observation> {
    return await this.observationService.create(createObservationDto);
  }

  @Get()
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerObservationFindAll()
  async findAll(@Query() query: ObservationQueryFilterDto): Promise<PaginatedList<Observation>> {
    const [observations, currentResults, totalResults] = await this.observationService.findAll(query);
    return { ...query, totalResults, currentResults, results: observations };
  }

  @Get(':id')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerObservationFindOne()
  async findOne(@Param('id') id: string): Promise<Observation> {
    return await this.observationService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerObservationUpdate()
  @ActivityLogger({ description: 'Modifier une observation' })
  async update(@Param('id') id: string, @Body() updateObservationDto: UpdateObservationDto): Promise<Observation> {
    return await this.observationService.update(+id, updateObservationDto);
  }

  @Delete(':id')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerObservationUpdateState()
  @ActivityLogger({ description: 'Archiver une observation' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.observationService.delete(+id);
  }

  @Patch(':id/restore')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerObservationUpdateState()
  @ActivityLogger({ description: 'Restaurer une observation' })
  async restore(@Param('id') id: string): Promise<Observation> {
    return await this.observationService.restore(+id);
  }

  @Patch(':id/start')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerObservationStart()
  @ActivityLogger({ description: 'Démarrer une observation' })
  async startObservation(@Param('id') id: string): Promise<Observation> {
    return await this.observationService.startObservation(+id);
  }

  @Patch(':id/finish')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerObservationFinish()
  @ActivityLogger({ description: 'Terminer une observation' })
  async finishObservation(@Param('id') id: string): Promise<Observation> {
    return await this.observationService.finishObservation(+id);
  }

  @Post(':id/files')
  @Roles(RoleType.COMPANY_MEMBER)
  @ApiConsumes('multipart/form-data')
  @SwaggerObservationAttachFile()
  @ActivityLogger({ description: 'Attacher un fichier à une observation' })
  @UseInterceptors(FileInterceptor('file'))
  async attachFile(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
          new FileTypeValidator({ fileType: '.(pdf|doc|docx|jpg|jpeg|png)' }),
        ],
      }),
    )
    file: MulterFile,
    @GetUser() user: LoggedUser,
  ): Promise<ObservationFile> {
    return await this.observationService.attachFileToObservation(+id, file, user.id);
  }

  @Get(':id/files')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerObservationGetFiles()
  async getObservationFiles(@Param('id') id: string) {
    return await this.observationService.getObservationFiles(+id);
  }

  @Delete(':id/files/:fileId')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerObservationRemoveFile()
  @ActivityLogger({ description: "Supprimer un fichier d'une observation" })
  async removeFile(@Param('id') id: string, @Param('fileId') fileId: string): Promise<void> {
    await this.observationService.removeFileFromObservation(+id, +fileId);
  }
}
