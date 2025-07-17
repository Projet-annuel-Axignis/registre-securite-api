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
import { RoleType } from '@src/users/types/role.types';
import { AttachFileDto } from '../dto/attach-file.dto';
import { CreateReportDto } from '../dto/create-report.dto';
import { ReportQueryFilterDto } from '../dto/report-query-filter.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { Report } from '../entities/report.entity';
import {
  SwaggerReportAttachFile,
  SwaggerReportCreate,
  SwaggerReportFindAll,
  SwaggerReportFindOne,
  SwaggerReportGetFiles,
  SwaggerReportRemoveFile,
  SwaggerReportUpdate,
  SwaggerReportUpdateState,
} from '../helpers/report-set-decorators.helper';
import { ReportService } from '../services/report.service';
import {
  ReportFileWithDetailsResponse,
  ReportListWithEquipmentTypesResponse,
  ReportWithEquipmentTypesResponse,
} from '../types/report-swagger-response.types';

@ApiTags(Resources.REPORT)
@SwaggerFailureResponse()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller({ path: 'reports', version: ['1'] })
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerReportCreate()
  @ActivityLogger({ description: 'Créer un nouveau rapport' })
  async create(@Body() createReportDto: CreateReportDto): Promise<Report> {
    return await this.reportService.create(createReportDto);
  }

  @Get()
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerReportFindAll()
  async findAll(@Query() query: ReportQueryFilterDto): Promise<ReportListWithEquipmentTypesResponse> {
    const [reports, currentResults, totalResults] = await this.reportService.findAll(query);
    return { ...query, totalResults, currentResults, results: reports };
  }

  @Get(':id')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerReportFindOne()
  async findOne(@Param('id') id: string): Promise<ReportWithEquipmentTypesResponse> {
    return await this.reportService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerReportUpdate()
  @ActivityLogger({ description: 'Modifier un rapport' })
  async update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto): Promise<Report> {
    return await this.reportService.update(+id, updateReportDto);
  }

  @Delete(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerReportUpdateState()
  @ActivityLogger({ description: 'Archiver un rapport' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.reportService.delete(+id);
  }

  @Patch(':id/restore')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerReportUpdateState()
  @ActivityLogger({ description: 'Restaurer un rapport' })
  async restore(@Param('id') id: string): Promise<Report> {
    return await this.reportService.restore(+id);
  }

  @Post(':id/files')
  @Roles(RoleType.COMPANY_MEMBER)
  @ApiConsumes('multipart/form-data')
  @SwaggerReportAttachFile()
  @ActivityLogger({ description: 'Attacher un fichier à un rapport' })
  @UseInterceptors(FileInterceptor('file'))
  async attachFile(
    @Param('id') id: string,
    @Body() attachFileDto: AttachFileDto,
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
  ): Promise<ReportFileWithDetailsResponse> {
    return await this.reportService.attachFileToReport(+id, file, user.id, attachFileDto);
  }

  @Get(':id/files')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerReportGetFiles()
  async getReportFiles(@Param('id') id: string): Promise<ReportFileWithDetailsResponse[]> {
    return await this.reportService.getReportFiles(+id);
  }

  @Delete(':id/files/:fileId')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerReportRemoveFile()
  @ActivityLogger({ description: "Supprimer un fichier d'un rapport" })
  async removeFile(@Param('id') id: string, @Param('fileId') fileId: string): Promise<void> {
    await this.reportService.removeFileFromReport(+id, +fileId);
  }
}
